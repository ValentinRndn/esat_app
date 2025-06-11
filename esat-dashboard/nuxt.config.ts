import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  dev: false,
  
  // Configuration du serveur de développement
  devServer: {
    host: '0.0.0.0' // permet les connexions externes
  },
  
  // Configuration plus stricte pour les scripts
  app: {
    head: {
      meta: [
        { 'http-equiv': 'Content-Security-Policy', content: "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; frame-src 'self';" }
      ],
      script: [] // Assurez-vous qu'aucun script externe n'est ajouté ici
    }
  },



  // Configuration SSR
  ssr: true,

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    geminiApiKey: process.env.NUXT_GEMINI_API_KEY || process.env.GEMINI_API_KEY,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    }
  },

  nitro: {
    plugins: ['~/server/plugins/stripe.ts']
  },

  vite: {
    server: {
      hmr: false,
      allowedHosts: ['.ngrok-free.app'], // autorise tous les sous-domaines ngrok
    },
    build: {
      minify: 'terser',
      sourcemap: false,
      // Empêcher l'optimisation des dépendances qui pourrait causer des problèmes
      rollupOptions: {
        external: ['react', 'react-dom'] // Exclure React explicitement
      }
    }
  },

  // Optimisations de build supplémentaires
  build: {
    transpile: [], // Ajoutez ici des packages qui doivent être transpilés

  },

  compatibilityDate: '2025-05-15',
})