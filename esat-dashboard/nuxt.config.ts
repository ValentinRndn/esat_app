// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Runtime config allows passing variables from .env to the app
  // Variables defined here are only available server-side
  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    // Variables in 'public' are exposed to the client-side
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api', // Provide a default
    }
  },
})
