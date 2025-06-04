<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <!-- Sidebar Navigation -->
    <aside :class="`transition-all duration-300 h-screen bg-white border-r border-gray-200 shadow-sm ${sidebarExpanded ? 'w-64' : 'w-20'}`">
      <div class="flex flex-col h-full">
        <!-- Logo and header -->
        <div class="p-5 border-b border-gray-100">
          <div class="flex items-center">
            <!-- Logo ANAIS stylisé -->
            <NuxtLink to="/dashboard" class="relative w-9 h-9 mr-3 flex-shrink-0">
              <div class="absolute inset-0 bg-pink-600 rounded-md"></div>
              <div class="absolute w-5 h-6 top-0.5 left-2 border-t-2 border-l-2 border-r-2 border-white rounded-t-full transform rotate-[20deg]"></div>
            </NuxtLink>
            
            <h1 :class="`font-semibold text-gray-800 transition-opacity duration-200 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`">
              ESAT<span class="font-normal text-gray-600 ml-1">Dashboard</span>
            </h1>
          </div>
        </div>
        
        <!-- Navigation menu -->
        <nav class="flex-grow py-5 overflow-y-auto">
          <ul class="space-y-1 px-3">
            <li>
              <NuxtLink to="/dashboard" class="flex items-center p-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200 group" :class="[
                $route.path === '/dashboard' ? 'bg-pink-50 text-pink-600  pl-[10px]' : 'text-gray-600 border-l-4 border-transparent pl-[10px]'
              ]">
                <svg class="w-6 h-6 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span :class="`ml-3 font-medium transition-opacity duration-200 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`">
                  Accueil
                </span>
              </NuxtLink>
            </li>
            
            <li>
              <NuxtLink to="/esats" class="flex items-center p-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200 group" :class="[
                $route.path.startsWith('/esats') ? 'bg-pink-50 text-pink-600  pl-[10px]' : 'text-gray-600 border-l-4 border-transparent pl-[10px]'
              ]">
                <svg class="w-6 h-6 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span :class="`ml-3 font-medium transition-opacity duration-200 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`">
                  ESATs
                </span>
              </NuxtLink>
            </li>
            
            <li>
              <NuxtLink to="/users" class="flex items-center p-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200 group" :class="[
                $route.path.startsWith('/users') ? 'bg-pink-50 text-pink-600  pl-[10px]' : 'text-gray-600 border-l-4 border-transparent pl-[10px]'
              ]">
                <svg class="w-6 h-6 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span :class="`ml-3 font-medium transition-opacity duration-200 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`">
                  Utilisateurs
                </span>
              </NuxtLink>
            </li>
            
            <li>
              <NuxtLink to="/workers" class="flex items-center p-3 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors duration-200 group" :class="[
                $route.path.startsWith('/workers') ? 'bg-pink-50 text-pink-600  pl-[10px]' : 'text-gray-600 border-l-4 border-transparent pl-[10px]'
              ]">
                <svg class="w-6 h-6 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span :class="`ml-3 font-medium transition-opacity duration-200 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`">
                  Travailleurs
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        
        <!-- User profile footer -->
        <div class="border-t border-gray-100 p-4">
          <div class="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
            <div class="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            
            <div :class="`ml-3 transition-opacity duration-200 overflow-hidden ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0'}`">
              <p class="text-sm font-medium text-gray-800">Admin</p>
              <p class="text-xs text-gray-500">Administrateur</p>
            </div>
            
            <div :class="`transition-opacity duration-200 ml-auto ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`">
              <svg class="w-5 h-5 text-gray-500 hover:text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 h-screen overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm h-16 flex items-center justify-between px-6">
        <button @click="toggleSidebar" class="text-gray-500 hover:text-pink-600 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
          <svg v-if="sidebarExpanded" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <div class="flex items-center space-x-4">
          <!-- Search box -->
          <div class="relative hidden md:block">
            <input type="text" placeholder="Rechercher..." class="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent bg-gray-50 transition-all duration-200">
            <div class="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          
          <!-- Notification icon -->
          <div class="relative">
            <button class="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-pink-600 focus:outline-none transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <span class="absolute top-1 right-1 h-4 w-4 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
          </div>
        </div>
      </header>
      
      <!-- Main content -->
      <main class="flex-1 overflow-y-auto bg-gray-100 p-6">
        <slot />
      </main>
      
      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 py-3 px-6 text-center text-xs text-gray-500">
        <p>&copy; {{ new Date().getFullYear() }} Fondation ANAIS - ESAT Dashboard</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarExpanded: true, // Démarrer avec la barre latérale étendue sur desktop
      screenWidth: 0
    };
  },
  
  mounted() {
    // Initialiser la largeur d'écran
    this.screenWidth = window.innerWidth;
    this.checkScreenSize();
    
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', this.handleResize);
  },
  
  beforeUnmount() {
    // Nettoyer l'écouteur d'événement
    window.removeEventListener('resize', this.handleResize);
  },
  
  methods: {
    toggleSidebar() {
      this.sidebarExpanded = !this.sidebarExpanded;
    },
    
    handleResize() {
      this.screenWidth = window.innerWidth;
      this.checkScreenSize();
    },
    
    checkScreenSize() {
      // Réduire automatiquement sur les écrans mobiles
      if (this.screenWidth < 768 && this.sidebarExpanded) {
        this.sidebarExpanded = false;
      }
    }
  }
};
</script>