interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  esat_id: number | null;
  esat_name?: string;
}

export default defineNuxtPlugin(() => {
  const user = useState<AuthUser | null>('auth.user', () => null);
  const isLoggedIn = computed(() => !!user.value);

  // Fonction pour récupérer l'utilisateur connecté
  const fetchUser = async () => {
    try {
      const userData = await $fetch<AuthUser>('/api/auth/me');
      user.value = userData;
      return userData;
    } catch (error) {
      user.value = null;
      return null;
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
      user.value = null;
      await navigateTo('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force la déconnexion même en cas d'erreur
      user.value = null;
      await navigateTo('/login');
    }
  };

  // IMPORTANT : Pas de vérification automatique au démarrage
  // La vérification se fera manuellement via les middlewares ou composants

  // Fournir les composables globalement
  return {
    provide: {
      auth: {
        user: readonly(user),
        isLoggedIn: readonly(isLoggedIn),
        fetchUser,
        logout
      }
    }
  };
}); 
