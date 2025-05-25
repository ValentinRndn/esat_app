// Middleware pour déboguer les routes et s'assurer que les routes d'édition fonctionnent
export default defineNuxtRouteMiddleware((to, from) => {
  // Journaliser la route actuelle pour le débogage
  console.log('Navigation vers:', to.path)
  
  // Ne pas bloquer la navigation, juste surveiller
  return
}) 