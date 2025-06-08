<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
    <div class="text-center">
      <div class="w-12 h-12 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-gray-300">Redirection vers votre ESAT...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(async () => {
  try {
    const { user } = useAuth();
    const { canAccessMyEsat } = usePermissions();

    // Attendre que l'utilisateur soit chargé
    const { fetchUser } = useAuth();
    await fetchUser();

    // Vérifier les permissions et rediriger
    if (!canAccessMyEsat.value) {
      // Si l'utilisateur n'a pas d'ESAT assigné ou n'a pas les permissions
      await navigateTo('/workers');
      return;
    }

    if (user.value?.esat_id) {
      await navigateTo(`/esats/${user.value.esat_id}`);
    } else {
      await navigateTo('/workers');
    }
  } catch (error) {
    console.error('Erreur lors de la redirection:', error);
    await navigateTo('/workers');
  }
});
</script> 