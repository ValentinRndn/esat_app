// Middleware pour rediriger les anciennes URLs d'édition vers les nouvelles
export default defineNuxtRouteMiddleware((to, from) => {
  // Matcher pour les pages d'édition comme /workers/123/edit
  const editPageRegex = /^\/([^\/]+)\/([^\/]+)\/edit$/;
  
  if (editPageRegex.test(to.path)) {
    // Extraire l'entité et l'ID
    const matches = to.path.match(editPageRegex);
    if (matches && matches.length === 3) {
      const entity = matches[1]; // workers, esats, users, etc.
      const id = matches[2];
      
      // Construire la nouvelle URL
      const newPath = `/${entity}/edit/${id}`;
      
      console.log(`Redirection de ${to.path} vers ${newPath}`);
      
      // Rediriger vers la nouvelle structure
      return navigateTo(newPath, { redirectCode: 301 });
    }
  }
}); 