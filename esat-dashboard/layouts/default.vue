<template>
  <div class="min-h-screen main-gradient-bg relative overflow-hidden">
    <!-- Grid Background avec effet de fade -->
    <div class="absolute inset-0 z-0">
      <div class="grid-pattern"></div>
      <div class="grid-fade-overlay"></div>
      
      <!-- Light Halos -->
      <div class="light-halo light-halo-1"></div>
      <div class="light-halo light-halo-2"></div>
    </div>

    <!-- Bouton hamburger mobile -->
    <button 
      v-if="!isSidebarOpen"
      @click="toggleSidebar"
      class="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-gray-800/90 backdrop-blur-lg rounded-xl border border-white/20 flex items-center justify-center text-white hover:bg-gray-700/90 transition-all duration-300 shadow-xl"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Overlay mobile -->
    <div 
      v-if="isSidebarOpen" 
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
      :class="isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    ></div>

    <!-- Sidebar Navigation -->
    <aside 
      class="sidebar-container bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col transition-transform duration-300 ease-out"
      :class="isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'"
    >
      <!-- Header avec logo -->
      <div class="p-6 border-b border-white/20 flex-shrink-0 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl shadow-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">
              <span class="text-pink-400">BAYTH</span>
            </h1>
            <p class="text-gray-400 text-xs">Dashboard ESAT</p>
          </div>
        </div>
        
        <!-- Bouton fermer mobile -->
        <button 
          @click="closeSidebar"
          class="lg:hidden w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <nav class="p-4 flex-1">
        <ul class="space-y-2">
          <!-- Navigation conditionnelle basée sur les permissions -->
          <li v-if="canAccessDashboard">
            <NuxtLink 
              to="/dashboard" 
              @click="closeSidebarOnMobile"
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-pink-500/20 border-pink-500/30 text-pink-300 shadow-lg"
            >
              <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
                </svg>
              </div>
              <span class="font-medium">Dashboard</span>
            </NuxtLink>
          </li>

          <li v-if="canAccessMyEsat">
            <NuxtLink 
              to="/my-esat" 
              @click="closeSidebarOnMobile"
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              :class="isMyEsatActive ? 'bg-blue-500/20 border-blue-500/30 text-blue-300 shadow-lg' : ''"
            >
              <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <span class="font-medium">Mon ESAT</span>
            </NuxtLink>
          </li>
          
          <li v-if="canAccessUsers">
            <NuxtLink 
              to="/users" 
              @click="closeSidebarOnMobile"
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-purple-500/20 border-purple-500/30 text-purple-300 shadow-lg"
            >
              <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v0M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <span class="font-medium">Utilisateurs</span>
            </NuxtLink>
          </li>
          
          <li v-if="canAccessWorkers">
            <NuxtLink 
              to="/workers" 
              @click="closeSidebarOnMobile"
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-orange-500/20 border-orange-500/30 text-orange-300 shadow-lg"
            >
              <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <span class="font-medium">Travailleurs</span>
            </NuxtLink>
          </li>
          
          <li v-if="canAccessEsats">
            <NuxtLink 
              to="/esats" 
              @click="closeSidebarOnMobile"
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-pink-500/20 border-pink-500/30 text-pink-300 shadow-lg"
            >
              <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <span class="font-medium">ESATs</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
        
      <!-- Profil utilisateur en bas -->
      <div class="p-4 border-t border-white/20 bg-white/5 backdrop-blur-lg flex-shrink-0">
        <div class="flex items-center justify-between text-white/80">
          <div class="flex items-center flex-1 min-w-0">
            <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl shadow-lg flex items-center justify-center mr-3">
              <span class="text-sm font-bold text-white">{{ userInitials }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{{ userDisplayName }}</p>
              <p class="text-xs text-gray-400 truncate">{{ userRoleDisplay }}</p>
            </div>
          </div>
          
          <!-- Bouton de déconnexion -->
          <button 
            @click="handleLogout"
            class="ml-3 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-white/20"
            title="Se déconnecter"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-content transition-all duration-300 ease-out" :class="isSidebarOpen ? 'main-content-with-sidebar' : 'main-content-full'">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Initialisation des refs
const user = ref(null);
const canAccessDashboard = ref(false);
const canAccessUsers = ref(false);
const canAccessWorkers = ref(false);
const canAccessEsats = ref(false);
const canAccessMyEsat = ref(false);

// État de la sidebar mobile
const isSidebarOpen = ref(false);

// Fonctions pour contrôler la sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const closeSidebarOnMobile = () => {
  // Fermer la sidebar seulement sur mobile
  if (window.innerWidth < 1024) {
    closeSidebar();
  }
};

// Gérer le redimensionnement de la fenêtre
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = true; // Toujours ouverte sur desktop
  } else {
    isSidebarOpen.value = false; // Fermée par défaut sur mobile
  }
};

// Computed pour l'affichage utilisateur
const userDisplayName = computed(() => {
  if (!user.value) return '';
  return `${user.value.first_name} ${user.value.last_name}`;
});

const userInitials = computed(() => {
  if (!user.value) return '';
  return `${user.value.first_name.charAt(0)}${user.value.last_name.charAt(0)}`.toUpperCase();
});

const userRoleDisplay = computed(() => {
  if (!user.value) return '';
  const roleMap = {
    'super_admin': 'Super Administrateur',
    'admin_esat': 'Administrateur ESAT', 
    'user_esat': 'Utilisateur ESAT'
  };
  return roleMap[user.value.role] || user.value.role;
});

// Computed pour vérifier si l'onglet "Mon ESAT" doit être actif
const isMyEsatActive = computed(() => {
  if (!user.value?.esat_id) return false;
  
  const route = useRoute();
  const currentPath = route.path;
  
  // Actif si on est sur /my-esat ou sur la page de détails de son propre ESAT
  if (currentPath === '/my-esat') return true;
  
  const esatIdMatch = currentPath.match(/^\/esats\/(\d+)/);
  if (esatIdMatch) {
    const currentEsatId = parseInt(esatIdMatch[1], 10);
    return currentEsatId === user.value.esat_id;
  }
  
  return false;
});

// Fonction de déconnexion
const handleLogout = async () => {
  try {
    const { logout } = useAuth();
    await logout();
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    // Forcer la redirection vers login même en cas d'erreur
    await navigateTo('/login');
  }
};

// Initialisation côté client seulement
onMounted(async () => {
  if (!process.client) return;
  
  try {
    // Gérer la taille d'écran initiale
    handleResize();
    
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', handleResize);
    
    // Récupérer les composables d'authentification
    const { user: authUser, fetchUser } = useAuth();
    const { 
      canAccessDashboard: dashboard, 
      canAccessUsers: users, 
      canAccessWorkers: workers,
      canAccessEsats: esats,
      canAccessMyEsat: myEsat
    } = usePermissions();
    
    // Récupérer l'utilisateur connecté
    await fetchUser();
    await nextTick();
    
    // Assigner les valeurs
    user.value = authUser.value;
    canAccessDashboard.value = dashboard.value;
    canAccessUsers.value = users.value;
    canAccessWorkers.value = workers.value;
    canAccessEsats.value = esats.value;
    canAccessMyEsat.value = myEsat.value;
    
  } catch (error) {
    console.error("Erreur auth:", error);
  }
});

// Nettoyer les événements
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style>
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

/* Grid Pattern Background */
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    
  background-size: 80px 80px;
  background-position: 0 0, 0 0;
}

/* Grid fade overlay */
.grid-fade-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 40%,
    rgba(17, 24, 39, 0.3) 60%,
    rgba(17, 24, 39, 0.7) 80%,
    rgba(17, 24, 39, 0.9) 100%
  );
  pointer-events: none;
}

/* Light Halos */
.light-halo {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.light-halo-1 {
  top: -8%;
  right: -8%;
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.15) 0%,
    rgba(236, 72, 153, 0.08) 30%,
    transparent 60%
  );
  filter: blur(40px);
}

.light-halo-2 {
  top: 60%;
  left: -8%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.12) 0%,
    rgba(236, 72, 153, 0.06) 30%,
    transparent 60%
  );
  filter: blur(30px);
}

/* Sidebar Container */
.sidebar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 256px; /* w-64 = 16rem = 256px */
  height: 100vh;
  z-index: 50;
}

/* Sidebar States */
.sidebar-open {
  transform: translateX(0);
}

.sidebar-closed {
  transform: translateX(-100%);
}

/* Desktop - Sidebar toujours visible */
@media (min-width: 1024px) {
  .sidebar-container {
    transform: translateX(0) !important;
  }
}

/* Main Content */
.main-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
}

/* Desktop - Contenu avec marge pour la sidebar */
@media (min-width: 1024px) {
  .main-content-with-sidebar {
    margin-left: 256px; /* w-64 = 16rem = 256px */
  }
  
  .main-content-full {
    margin-left: 256px; /* Sur desktop, toujours avec marge */
  }
}

/* Mobile - Contenu pleine largeur */
@media (max-width: 1023px) {
  .main-content-with-sidebar {
    margin-left: 0;
  }
  
  .main-content-full {
    margin-left: 0;
  }
}

/* Animations supplémentaires */
.sidebar-container {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation du bouton hamburger */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.sidebar-closed ~ .main-content button:first-child {
  animation: fadeInScale 0.3s ease-out;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Empêcher le scroll du body quand la sidebar mobile est ouverte */
@media (max-width: 1023px) {
  body:has(.sidebar-open) {
    overflow: hidden;
  }
}
</style>

