<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-2">Tableau de Bord ESAT</h1>
      <p class="text-sm text-gray-500 flex items-center">
        <span class="text-blue-600 font-medium">Dashboard</span>
      </p>
    </div>
    
    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Carte ESAT -->
      <div class="bg-white rounded-lg shadow overflow-hidden transform transition-all duration-200 hover:shadow-lg">
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500">ESATs</p>
              <p class="text-3xl font-bold text-pink-600 mt-2">{{ esatCount }}</p>
            </div>
            <div class="p-3 bg-pink-100 rounded-full">
              <svg class="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
          </div>
          <div class="text-sm text-gray-500 mt-4 mb-6">Structures d'accompagnement par le travail</div>
          <NuxtLink to="/esats" class="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200 w-full justify-center">
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Gérer les ESATs
          </NuxtLink>
        </div>
      </div>
      
      <!-- Carte Utilisateurs -->
      <div class="bg-white rounded-lg shadow overflow-hidden transform transition-all duration-200 hover:shadow-lg">
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500">Utilisateurs</p>
              <p class="text-3xl font-bold text-blue-600 mt-2">{{ userCount }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
          <div class="text-sm text-gray-500 mt-4 mb-6">Accès et gestion de la plateforme</div>
          <NuxtLink to="/users" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 w-full justify-center">
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Gérer les Utilisateurs
          </NuxtLink>
        </div>
      </div>
      
      <!-- Carte Travailleurs -->
      <div class="bg-white rounded-lg shadow overflow-hidden transform transition-all duration-200 hover:shadow-lg">
        <div class="p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-500">Travailleurs</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ workerCount }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
          <div class="text-sm text-gray-500 mt-4 mb-6">Personnes en situation de handicap</div>
          <NuxtLink to="/workers" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 w-full justify-center">
            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Gérer les Travailleurs
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Actions Rapides -->
    <div class="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <h2 class="text-lg font-medium text-gray-700">Actions Rapides</h2>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink to="/esats/create" class="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200 justify-center">
            <svg class="h-5 w-5 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Ajouter un ESAT
          </NuxtLink>
          <NuxtLink to="/users/create" class="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 justify-center">
            <svg class="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Ajouter un Utilisateur
          </NuxtLink>
          <NuxtLink to="/workers/create" class="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 justify-center">
            <svg class="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Ajouter un Travailleur
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Activité Récente -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 class="text-lg font-medium text-gray-700">Activité Récente</h2>
        </div>
      </div>
      <div class="p-6">
        <p v-if="recentActivity.length === 0" class="text-gray-500 italic text-center py-6">
          Aucune activité récente à afficher.
        </p>
        <div v-else class="divide-y divide-gray-200">
          <div v-for="(activity, index) in recentActivity" :key="index" class="py-4 flex items-start">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ activity.description }}
              </p>
              <p class="text-sm text-gray-500 mt-1 flex items-center">
                <svg class="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ formatDate(activity.timestamp) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Placeholder data - will be replaced with actual API calls
const esatCount = ref(0);
const userCount = ref(0);
const workerCount = ref(0);
const recentActivity = ref([]);

// Format date helper function
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Fetch data on component mount
onMounted(async () => {
  try {
    // Fetch counts from API
    const [esatsResponse, usersResponse, workersResponse] = await Promise.all([
      fetch('/api/esats'),
      fetch('/api/users'),
      fetch('/api/workers')
    ]);
    
    if (esatsResponse.ok) {
      const esatsData = await esatsResponse.json();
      // Vérifier si les données sont dans une propriété data ou directement dans le tableau
      if (Array.isArray(esatsData)) {
        esatCount.value = esatsData.length;
      } else if (esatsData.data && Array.isArray(esatsData.data)) {
        esatCount.value = esatsData.data.length;
      } else if (typeof esatsData.count === 'number') {
        esatCount.value = esatsData.count;
      } else {
        console.error('Format de données ESAT inattendu:', esatsData);
      }
    }
    
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      // Vérifier si les données sont dans une propriété data ou directement dans le tableau
      if (Array.isArray(usersData)) {
        userCount.value = usersData.length;
      } else if (usersData.data && Array.isArray(usersData.data)) {
        userCount.value = usersData.data.length;
      } else if (typeof usersData.count === 'number') {
        userCount.value = usersData.count;
      } else {
        console.error('Format de données Users inattendu:', usersData);
      }
    }
    
    if (workersResponse.ok) {
      const workersData = await workersResponse.json();
      // Vérifier si les données sont dans une propriété data ou directement dans le tableau
      if (Array.isArray(workersData)) {
        workerCount.value = workersData.length;
      } else if (workersData.data && Array.isArray(workersData.data)) {
        workerCount.value = workersData.data.length;
      } else if (typeof workersData.count === 'number') {
        workerCount.value = workersData.count;
      } else {
        console.error('Format de données Workers inattendu:', workersData);
      }
    }
    
    // Placeholder for recent activity - would come from a dedicated API endpoint in a real app
    recentActivity.value = [
      { timestamp: new Date(Date.now() - 3600000), description: 'Utilisateur "admin" a ajouté un nouvel ESAT' },
      { timestamp: new Date(Date.now() - 7200000), description: 'Travailleur "Jean Dupont" a été mis à jour' },
      { timestamp: new Date(Date.now() - 86400000), description: 'Nouvel utilisateur "support" a été créé' }
    ];
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
});
</script>