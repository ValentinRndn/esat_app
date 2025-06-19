// Configuration Nuxt ultra-minimaliste pour éviter l'erreur React DevTools
export default defineNuxtConfig({
  // Désactivation complète des DevTools
  devtools: { enabled: false },
  
  // Aucun module pour éviter les conflits
  modules: [],
  
  // CSS inline uniquement
  css: [],

  // Configuration minimale
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  // Pas de plugins Nitro pour simplifier
  nitro: {
    plugins: []
  },

  // Désactiver toute inspection/debug
  debug: false,
  
  // Mode SSR pour éviter les problèmes client
  ssr: true,

  compatibilityDate: '2025-05-15',
}) 
