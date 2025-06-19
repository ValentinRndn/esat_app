interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  esat_id: number | null;
  esat_name?: string;
}

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  
  return {
    user: $auth.user as Readonly<Ref<AuthUser | null>>,
    isLoggedIn: $auth.isLoggedIn as Readonly<Ref<boolean>>,
    fetchUser: $auth.fetchUser as () => Promise<AuthUser | null>,
    logout: $auth.logout as () => Promise<void>
  };
};

// Composable pour vérifier les permissions
export const usePermissions = () => {
  const { user } = useAuth();

  const isSuperAdmin = computed(() => user.value?.role === 'super_admin');
  const isAdminEsat = computed(() => user.value?.role === 'admin_esat');
  const isUserEsat = computed(() => user.value?.role === 'user_esat');
  const isEsatUser = computed(() => isAdminEsat.value || isUserEsat.value);

  // Seuls les super admins peuvent accéder au dashboard
  const canAccessDashboard = computed(() => isSuperAdmin.value);
  
  const canAccessEsats = computed(() => isSuperAdmin.value);
  
  // Les utilisateurs d'un ESAT peuvent voir leur propre ESAT
  const canAccessMyEsat = computed(() => {
    if (!user.value?.esat_id) return false;
    return isEsatUser.value; // admin_esat ou user_esat avec un ESAT assigné
  });
  
  // Les admins ESAT peuvent gérer les utilisateurs de leur ESAT
  const canAccessUsers = computed(() => {
    if (isSuperAdmin.value) return true;
    if (isAdminEsat.value && user.value?.esat_id) return true;
    return false;
  });
  
  const canAccessWorkers = computed(() => !!user.value); // Tous les utilisateurs connectés
  
  const canManageWorkers = computed(() => {
    if (isSuperAdmin.value) return true;
    if (isEsatUser.value && user.value?.esat_id) return true;
    return false;
  });

  const canManageUsers = computed(() => {
    if (isSuperAdmin.value) return true;
    if (isAdminEsat.value && user.value?.esat_id) return true;
    return false;
  });

  const getUserEsatId = computed(() => user.value?.esat_id);

  return {
    isSuperAdmin: readonly(isSuperAdmin),
    isAdminEsat: readonly(isAdminEsat),
    isUserEsat: readonly(isUserEsat),
    isEsatUser: readonly(isEsatUser),
    canAccessDashboard: readonly(canAccessDashboard),
    canAccessEsats: readonly(canAccessEsats),
    canAccessMyEsat: readonly(canAccessMyEsat),
    canAccessUsers: readonly(canAccessUsers),
    canAccessWorkers: readonly(canAccessWorkers),
    canManageWorkers: readonly(canManageWorkers),
    canManageUsers: readonly(canManageUsers),
    getUserEsatId: readonly(getUserEsatId)
  };
}; 
