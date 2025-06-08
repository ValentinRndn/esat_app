<template>
  <div class="min-h-screen bg-blue-500 flex items-center justify-center">
    <div class="text-white text-center">
      <h1 class="text-4xl font-bold">Page de Test</h1>
      <p class="mt-4">Si vous voyez ceci, la page fonctionne !</p>
      <NuxtLink to="/" class="mt-4 inline-block px-4 py-2 bg-white text-blue-500 rounded">Retour à l'accueil</NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  auth: false
});
</script> 