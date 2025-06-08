<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Grid Background avec effet de fade -->
    <div class="absolute inset-0 z-0">
      <div class="grid-pattern"></div>
      <div class="grid-fade-overlay"></div>
      
      <!-- Light Halos -->
      <div class="light-halo light-halo-1"></div>
      <div class="light-halo light-halo-2"></div>
    </div>

    <!-- Sidebar Navigation -->
    <aside class="sidebar-fixed bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl flex flex-col">
      <!-- Header avec logo -->
      <div class="p-6 border-b border-white/20 flex-shrink-0">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">
              <span class="text-green-400">BAYTH</span>
            </h1>
            <p class="text-gray-400 text-xs">Dashboard ESAT</p>
          </div>
        </div>
      </div>
      
      <nav class="p-4 flex-1">
        <ul class="space-y-2">
          <!-- Navigation conditionnelle basée sur les permissions -->
          <li v-if="canAccessDashboard">
            <NuxtLink 
              to="/dashboard" 
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-green-500/20 border-green-500/30 text-green-300 shadow-lg"
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
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-purple-500/20 border-purple-500/30 text-purple-300 shadow-lg"
            >
              <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <span class="font-medium">Utilisateurs</span>
            </NuxtLink>
          </li>
          
          <li v-if="canAccessWorkers">
            <NuxtLink 
              to="/workers" 
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-orange-500/20 border-orange-500/30 text-orange-300 shadow-lg"
            >
              <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <span class="font-medium">Travailleurs</span>
            </NuxtLink>
          </li>
          
          <li v-if="canAccessEsats">
            <NuxtLink 
              to="/esats" 
              class="group flex items-center p-4 rounded-xl text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg border border-transparent hover:border-white/20"
              active-class="bg-green-500/20 border-green-500/30 text-green-300 shadow-lg"
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
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg flex items-center justify-center mr-3">
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
    <div class="main-content-with-sidebar relative z-10">
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
    linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
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
    rgba(34, 197, 94, 0.15) 0%,
    rgba(34, 197, 94, 0.08) 30%,
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
    rgba(34, 197, 94, 0.12) 0%,
    rgba(34, 197, 94, 0.06) 30%,
    transparent 60%
  );
  filter: blur(30px);
}

/* Sidebar avec hauteur fixe 100vh */
.sidebar-fixed-height {
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
}

/* Sidebar en position fixed */
.sidebar-fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 256px; /* w-64 = 16rem = 256px */
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
  z-index: 50;
}

/* Contenu principal avec marge pour la sidebar */
.main-content-with-sidebar {
  margin-left: 256px; /* w-64 = 16rem = 256px */
  min-height: 100vh;
}
</style>