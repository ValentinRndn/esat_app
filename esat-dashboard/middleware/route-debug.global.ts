// Middleware pour déboguer les routes et s'assurer que les routes d'édition fonctionnent
export default defineNuxtRouteMiddleware((to, from) => {
  // Middleware désactivé temporairement pour déboguer la boucle infinie
  return;
  
  // Code original commenté :
  // console.log('Navigation vers:', to.path)
  // return
}) 
