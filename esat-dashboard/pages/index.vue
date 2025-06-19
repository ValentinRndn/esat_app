<template>
  <div class="min-h-screen main-gradient-bg relative overflow-hidden">
    
    <!-- Header -->
    <header class="relative z-50 px-6 py-6">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <h1 class="text-2xl font-bold text-white">BAYTH</h1>
        
        <!-- Header Button -->
        <NuxtLink 
          to="/login" 
          class="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all duration-200 font-medium"
        >
          Accéder au dashboard
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 px-6 pt-16 pb-20">
      <div class="max-w-4xl mx-auto text-center">
        <div class="light-halo light-halo-1"></div>
        <div class="light-halo light-halo-2"></div>
        <!-- Badge -->
        <div class="inline-flex items-center mb-8">
          <span class="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-medium mr-3">
            ✨ Nouveau
          </span>
          <span class="text-gray-300">Gestion simplifiée des ESAT</span>
        </div>

        <!-- Main Title -->
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Le projet individuel<br>
          <span class="text-pink-400">augmenté.</span>
        </h1>

        <!-- Description -->
        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Nous aidons les ESAT à gérer efficacement leurs travailleurs et leurs activités avec une solution moderne et intuitive.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <NuxtLink 
            to="/dashboard"
            class="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all duration-200 font-medium text-lg"
          >
            Découvrir BAYTH
          </NuxtLink>
          
          <button 
            @click="scrollToDemo" 
            class="inline-flex items-center px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-500 text-white rounded-full transition-all duration-200 font-medium text-lg"
          >
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Voir la démo
          </button>
        </div>

        <!-- Dashboard Screenshot -->
        <div class="relative max-w-6xl mx-auto">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/assets/images/dashboard.png" 
              alt="Dashboard BAYTH - Interface de gestion ESAT"
              class="w-full h-auto"
            />
            
            <!-- Overlay Cards - Simuler les stats du dashboard -->
            <div class="absolute top-8 left-8">
              <div class="bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-400 text-sm">Travailleurs actifs</p>
                    <p class="text-white text-2xl font-bold">1,234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute -top-4 -left-4 w-8 h-8 bg-pink-500/20 rounded-full blur-sm"></div>
          <div class="absolute -bottom-4 -right-4 w-12 h-12 bg-pink-500/10 rounded-full blur-sm"></div>
        </div>
      </div>
    </main>

    <!-- Background Effects -->
    <div class="absolute inset-0 z-0">
      <!-- Subtle Grid -->
      <div class="absolute inset-0 pink-grid-bg"></div>
      
      <!-- Light Effects -->
      <div class="absolute top-1/4 right-1/4 w-96 h-96 pink-light-effect-1 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 pink-light-effect-2 rounded-full blur-3xl"></div>
    </div>
  </div>
</template>

<script setup>
// Désactiver le layout pour éviter les erreurs d'auth
definePageMeta({
  layout: false
});

// Scroll to demo function
const scrollToDemo = () => {
  // Scroll vers le screenshot
  const dashboardSection = document.querySelector('img[alt*="Dashboard"]');
  if (dashboardSection) {
    dashboardSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

 


