<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="w-12 h-12 border-4 border-gray-200 border-t-pink-600 rounded-full animate-spin mb-4"></div>
    <p class="text-gray-500">Redirection en cours...</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

onMounted(() => {
  // Rediriger vers la version fonctionnelle en structure inversée
  router.push(`/esats/edit/${id}`);
});
</script>