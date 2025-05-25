<template>
  <div class="w-full">
    <!-- Message de redirection -->
    <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6">
      <div class="flex items-center">
        <svg class="h-5 w-5 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <span class="text-amber-700">Redirection vers la nouvelle structure d'URL...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

// Rediriger vers la nouvelle structure d'URL
onMounted(() => {
  console.log("Redirection de /workers/[id]/edit vers /workers/edit/[id]");
  router.push(`/workers/edit/${id}`);
});
</script>