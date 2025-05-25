<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Détails de l'Utilisateur</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/users" class="text-gray-500">Utilisateurs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-blue-600 font-medium">Détails</span>
        </p>
      </div>
      <div class="flex space-x-2">
        <NuxtLink :to="`/users/edit/${user.id}`" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Modifier
        </NuxtLink>
        <NuxtLink to="/users" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Retour à la liste
        </NuxtLink>
      </div>
    </div>
    
    <!-- État de chargement -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500">Chargement des données...</p>
    </div>
    
    <!-- Message d'erreur -->
    <div v-else-if="error" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-red-700">{{ error }}</span>
      </div>
    </div>
    
    <!-- Message utilisateur non trouvé -->
    <div v-else-if="!user" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-red-700">Utilisateur non trouvé.</span>
      </div>
    </div>
    
    <!-- Contenu principal -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <!-- En-tête de la card -->
      <div class="flex items-center p-4 border-b border-gray-200">
        <svg class="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">{{ user.first_name }} {{ user.last_name }}</h2>
        <span v-if="user.is_active" class="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          Actif
        </span>
        <span v-else class="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
          Inactif
        </span>
      </div>
      
      <!-- Contenu des informations -->
      <div class="p-5">
        <h3 class="text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Informations générales</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">ID</p>
            <p class="text-gray-900 font-medium">
              <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">#{{ user.id }}</span>
            </p>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">Prénom</p>
            <p class="text-gray-900">{{ user.first_name }}</p>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">Nom</p>
            <p class="text-gray-900">{{ user.last_name }}</p>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">Email</p>
            <p class="text-gray-900">
              <a v-if="user.email" :href="`mailto:${user.email}`" class="text-blue-600 hover:text-blue-800 hover:underline">
                {{ user.email }}
              </a>
              <span v-else class="text-gray-500">Non spécifié</span>
            </p>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">Rôle</p>
            <p class="text-gray-900">
              <span class="px-2 py-1 text-xs font-medium bg-blue-100 rounded-md text-blue-800">
                {{ formatRole(user.role) }}
              </span>
            </p>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">ESAT</p>
            <p class="text-gray-900">
              <span v-if="loadingEsat" class="flex items-center text-gray-500">
                <svg class="animate-spin h-4 w-4 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </span>
              <NuxtLink 
                v-else-if="user.esat_id" 
                :to="`/esats/${user.esat_id}`" 
                class="text-pink-600 hover:text-pink-800 hover:underline flex items-center"
              >
                <svg class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {{ esatName || 'Voir l\'ESAT (ID: ' + user.esat_id + ')' }}
              </NuxtLink>
              <span v-else class="text-gray-500">Non assigné</span>
            </p>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">Créé le</p>
            <p class="text-gray-900">{{ formatDate(user.created_at) }}</p>
          </div>
          
          <div>
            <p class="text-sm font-medium text-gray-500 mb-1">Dernière mise à jour</p>
            <p class="text-gray-900">{{ formatDate(user.updated_at) }}</p>
          </div>
        </div>
        
        <!-- Actions avancées -->
        <div class="mt-8 pt-5 border-t border-gray-200">
          <h3 class="text-md font-medium text-gray-700 mb-4">Actions avancées</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              class="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Réinitialiser le mot de passe
            </button>
            <button 
              class="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
              Changer les permissions
            </button>
            <button 
              v-if="!user.is_active"
              class="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Activer le compte
            </button>
            <button 
              v-else
              class="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Désactiver le compte
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

// User data
const user = ref(null);
const loading = ref(true);
const error = ref(null);
const esatName = ref(null);
const loadingEsat = ref(false);

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format role helper
const formatRole = (role) => {
  const roleMap = {
    'super_admin': 'Super Administrateur',
    'admin_esat': 'Administrateur ESAT',
    'user_esat': 'Utilisateur ESAT'
  };
  
  return roleMap[role] || role || 'Non défini';
};

// Fetch User data
onMounted(async () => {
  try {
    console.log('Fetching user data for ID:', id.value);
    loading.value = true;
    
    const response = await fetch(`/api/users/${id.value}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('User data received:', data);
    
    // Handle different response formats
    if (data.data) {
      // If the API wraps the data in a 'data' property
      user.value = data.data;
    } else {
      // Direct user object
      user.value = data;
    }
    
    // If the user has an ESAT, fetch its name
    if (user.value?.esat_id) {
      fetchEsatDetails(user.value.esat_id);
    }
    
  } catch (err) {
    error.value = `Erreur lors du chargement de l'utilisateur: ${err.message}`;
    console.error('Error fetching user:', err);
  } finally {
    loading.value = false;
  }
});

// Watch for changes in the user's ESAT ID
watch(() => user.value?.esat_id, (newEsatId) => {
  if (newEsatId) {
    fetchEsatDetails(newEsatId);
  } else {
    esatName.value = null;
  }
});

// Fetch ESAT details to display the name
const fetchEsatDetails = async (esatId) => {
  if (!esatId) return;
  
  try {
    loadingEsat.value = true;
    const response = await fetch(`/api/esats/${esatId}`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (data.data) {
      esatName.value = data.data.name;
    } else {
      esatName.value = data.name;
    }
  } catch (err) {
    console.error('Error fetching ESAT details:', err);
    esatName.value = null;
  } finally {
    loadingEsat.value = false;
  }
};
</script>