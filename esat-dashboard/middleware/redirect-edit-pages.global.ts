// Middleware global pour rediriger les routes d'édition vers les bonnes pages
export default defineNuxtRouteMiddleware((to, from) => {
  // Middleware désactivé temporairement pour déboguer la boucle infinie
  return;
  
  // Code original commenté :
  // if (to.path.startsWith('/edit-worker/')) {
  //   const workerId = to.path.split('/edit-worker/')[1];
  //   if (workerId) {
  //     return navigateTo(`/workers/detail/${workerId}/edit`);
  //   }
  // }
  // 
  // if (to.path.startsWith('/detail-worker/')) {
  //   const workerId = to.path.split('/detail-worker/')[1];
  //   if (workerId) {
  //     return navigateTo(`/workers/detail/${workerId}`);
  //   }
  // }
}); 
