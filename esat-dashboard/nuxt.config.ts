// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    geminiApiKey: process.env.NUXT_GEMINI_API_KEY,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    }
  },

  compatibilityDate: '2025-05-15',
})