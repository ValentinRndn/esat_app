interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  esat_id: number | null;
  esat_name?: string;
}

export default defineNuxtRouteMiddleware(async (to) => {
  // Ignorer la page d'accueil et la page de login
  if (to.path === '/' || to.path === '/login') {
    return;
  }

  // Récupérer l'état de l'utilisateur
  const user = useState<AuthUser | null>('auth.user');

  // Si l'utilisateur n'est pas dans le state, tenter de le récupérer
  if (!user.value) {
    const { $auth } = useNuxtApp();
    await $auth.fetchUser();
  }

  // Si l'utilisateur n'est toujours pas connecté, rediriger vers la page de connexion
  if (!user.value) {
    return navigateTo('/login');
  }

  // Vérifications basées sur le rôle et la route
  const userRole = user.value.role;
  const path = to.path;

  // Pages réservées aux super admins seulement
  const superAdminOnlyPaths = ['/dashboard'];
  const isSuperAdminOnlyPath = superAdminOnlyPaths.some(restrictedPath => 
    path === restrictedPath || path.startsWith(`${restrictedPath}/`)
  );

  if (isSuperAdminOnlyPath && userRole !== 'super_admin') {
    // Rediriger les non-super-admins vers les travailleurs
    return navigateTo('/workers');
  }

  // Gestion spéciale pour /esats - super admins peuvent tout voir, utilisateurs ESAT seulement leur ESAT
  if (path.startsWith('/esats')) {
    if (userRole === 'super_admin') {
      // Super admin peut accéder à tous les ESATs
      return;
    } else if (userRole === 'admin_esat' || userRole === 'user_esat') {
      // Vérifier si l'utilisateur essaie d'accéder à son propre ESAT
      const esatIdMatch = path.match(/^\/esats\/(\d+)/);
      if (esatIdMatch) {
        const requestedEsatId = parseInt(esatIdMatch[1], 10);
        if (user.value.esat_id === requestedEsatId) {
          // L'utilisateur peut accéder à son propre ESAT
          return;
        }
      }
      // Sinon, rediriger vers /workers
      return navigateTo('/workers');
    } else {
      // Autres rôles ne peuvent pas accéder aux ESATs
      return navigateTo('/workers');
    }
  }

  // Permission pour /my-esat
  if (path === '/my-esat') {
    if ((userRole === 'admin_esat' || userRole === 'user_esat') && user.value.esat_id) {
      // Les utilisateurs ESAT avec un ESAT assigné peuvent accéder
      return;
    } else {
      return navigateTo('/workers');
    }
  }

  // Pages accessibles aux admins ESAT et super admins (nécessitent un ESAT assigné pour les admins ESAT)
  const esatAdminPaths = ['/users', '/workers'];
  const isEsatAdminPath = esatAdminPaths.some(esatPath => 
    path === esatPath || path.startsWith(`${esatPath}/`)
  );

  if (isEsatAdminPath) {
    // Vérifier les permissions selon le rôle
    if (userRole === 'user_esat') {
      // Les utilisateurs ESAT simples ne peuvent accéder qu'aux travailleurs
      const userEsatAllowedPaths = ['/workers'];
      const isUserEsatAllowed = userEsatAllowedPaths.some(allowedPath => 
        path === allowedPath || path.startsWith(`${allowedPath}/`)
      );
      
      if (!isUserEsatAllowed) {
        return navigateTo('/workers');
      }
    }
    
    // Vérifier qu'ils ont un ESAT assigné (sauf super admin)
    if ((userRole === 'admin_esat' || userRole === 'user_esat') && !user.value.esat_id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé : aucun ESAT assigné'
      });
    }
  }
}); 