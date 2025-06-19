import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  
  // Masquer les valeurs sensibles mais montrer si elles sont définies
  const debugInfo = {
    environment: process.env.NODE_ENV,
    hasGeminiApiKey: !!runtimeConfig.geminiApiKey,
    geminiApiKeyLength: runtimeConfig.geminiApiKey ? runtimeConfig.geminiApiKey.length : 0,
    geminiApiKeyPrefix: runtimeConfig.geminiApiKey ? runtimeConfig.geminiApiKey.substring(0, 5) + '...' : 'Not Set',
    
    // Variables d'environnement disponibles (sans valeurs sensibles)
    envVars: {
      NODE_ENV: process.env.NODE_ENV,
      hasNUXT_GEMINI_API_KEY: !!process.env.NUXT_GEMINI_API_KEY,
      hasGEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
      hasDB_HOST: !!process.env.DB_HOST,
      hasDB_USER: !!process.env.DB_USER,
      hasDB_PASSWORD: !!process.env.DB_PASSWORD,
      hasDB_NAME: !!process.env.DB_NAME,
    },
    
    runtimeConfigKeys: Object.keys(runtimeConfig),
  };

  return debugInfo;
}); 
