<!-- Landing page -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Navigation -->
    <nav class="relative z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center">
            <img class="h-10 w-auto" src="../assets/images/logo-fondation-anais.png" alt="ESAT Dashboard">
            <span class="ml-3 text-2xl font-semibold text-white">ESAT Dashboard</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/dashboard" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-all duration-200">
              Accéder au dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative z-10 pt-14 pb-20 sm:pt-20 sm:pb-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- New tag -->
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 mb-8">
            <span class="text-xs font-semibold text-green-400 mr-2">Nouveau</span>
            <span class="text-xs text-gray-300">Gestion simplifiée des ESAT</span>
          </div>
          
          <h1 class="text-4xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
            La gestion des ESAT<br/>
            <span class="text-green-400">simplifiée.</span>
          </h1>
          
          <p class="max-w-2xl mx-auto text-lg text-gray-300 mb-10">
            Nous aidons les ESAT à gérer efficacement leurs travailleurs et leurs activités
            avec une solution moderne et intuitive.
          </p>
          
          <div class="flex justify-center space-x-4">
            <NuxtLink to="/dashboard" class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10 transition-all duration-200">
              Créer un compte
            </NuxtLink>
            <button class="inline-flex items-center px-8 py-3 border-2 border-gray-600 text-base font-medium rounded-full text-gray-300 hover:border-gray-500 hover:text-white md:py-4 md:text-lg md:px-10 transition-all duration-200">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Voir la démo
            </button>
          </div>
        </div>

        <!-- App Preview -->
        <div class="relative mt-20">
          <!-- Floating Stats -->
          <div class="absolute -left-4 top-1/4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl transform -translate-y-1/2 border border-white/20">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-300">Travailleurs actifs</p>
                <p class="text-xl font-bold text-white">1,234</p>
              </div>
            </div>
          </div>

          <div class="absolute -right-4 top-3/4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl transform -translate-y-1/2 border border-white/20">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-300">ESAT partenaires</p>
                <p class="text-xl font-bold text-white">50+</p>
              </div>
            </div>
          </div>

          <!-- Main App Preview -->
          <div class="relative mx-auto max-w-4xl">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img src="../assets/images/dashboard.webp" alt="Dashboard Preview" class="w-full">
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Section -->
    <div class="relative z-10 py-24 bg-gray-900/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 mb-8">
            <span class="text-xs font-semibold text-blue-400 mr-2">Découvrez</span>
            <span class="text-xs text-gray-300">Notre solution en action</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Voyez ESAT Dashboard en action
          </h2>
          <p class="text-gray-300 max-w-2xl mx-auto">
            Une démonstration complète de notre solution de gestion pour les ESAT.
          </p>
        </div>
        
        <div class="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          <div class="aspect-w-16 aspect-h-9">
            <iframe 
              class="w-full h-full"
              src="https://www.youtube.com/embed/votre-video-id" 
              title="Démonstration ESAT Dashboard"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div class="relative z-10 py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 mb-8">
            <span class="text-xs font-semibold text-purple-400 mr-2">Tarifs</span>
            <span class="text-xs text-gray-300">Simples et transparents</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Un prix unique, tout inclus
          </h2>
          <p class="text-gray-300 max-w-2xl mx-auto">
            Accédez à toutes les fonctionnalités sans restriction.
          </p>
        </div>

        <div class="max-w-lg mx-auto">
          <div class="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20">
            <div class="p-8">
              <h3 class="text-2xl font-semibold text-white text-center">Abonnement mensuel</h3>
              
              <div class="mt-6 flex justify-center items-baseline">
                <span class="text-5xl font-extrabold text-white">49</span>
                <span class="text-xl font-semibold text-gray-300">€</span>
                <span class="ml-2 text-gray-400">/mois</span>
              </div>

              <ul class="mt-8 space-y-4">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">Nombre illimité de travailleurs</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">Toutes les fonctionnalités incluses</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">Support prioritaire</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-300">Mises à jour régulières</span>
                </li>
              </ul>

              <div class="mt-8">
                <NuxtLink to="/dashboard" class="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-500 hover:bg-green-600 transition-all duration-200">
                  Commencer maintenant
                </NuxtLink>
              </div>
            </div>
          </div>

          <p class="mt-6 text-sm text-gray-400 text-center">
            Pas d'engagement, annulez à tout moment.
          </p>
        </div>
      </div>
    </div>

    <!-- Background Elements -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/30 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl"></div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})
</script>

<style>
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>