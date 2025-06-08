<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
    <!-- Logo en haut à gauche -->
    <div class="absolute top-6 left-6 z-20 flex items-center space-x-3">
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

    <!-- Boutons de connexion en haut à droite -->
    <div class="absolute top-6 right-6 z-20 flex items-center space-x-4">
      <NuxtLink 
        to="/login" 
        class="px-4 py-2 text-gray-300 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium text-sm"
      >
        Se connecter
      </NuxtLink>
      <NuxtLink 
        to="/login" 
        class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl font-medium text-sm"
      >
        Dashboard
      </NuxtLink>
    </div>

    <!-- Contenu central -->
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-white/20 border-t-green-400 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-white text-lg mb-8">Version /home - Test de route différente</p>
      
      <NuxtLink 
        to="/login" 
        class="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
      >
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Accéder au Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  auth: false
});
</script> 