<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Page d'édition alternative du travailleur</h1>
    <p>ID du travailleur: {{ id }}</p>
    <div class="mt-4">
      <NuxtLink :to="`/workers/${id}`" class="text-blue-500 hover:underline">
        Retour à la page de détail
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);
</script> 