// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

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

  compatibilityDate: '2025-05-15',
})