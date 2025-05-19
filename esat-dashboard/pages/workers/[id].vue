<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Détails du Travailleur</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/workers" class="text-gray-500">Travailleurs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-green-600 font-medium">Détails</span>
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <button 
          @click="suggestJobs" 
          class="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          :disabled="loadingSuggestions"
        >
          <svg v-if="!loadingSuggestions" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <svg v-else class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loadingSuggestions ? 'Suggestions en cours...' : 'Suggérer des métiers (IA)' }}
        </button>
        <NuxtLink :to="`/workers/${id}/edit`" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Modifier
        </NuxtLink>
        <NuxtLink to="/workers" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Retour à la liste
        </NuxtLink>
      </div>
    </div>
    
    <!-- État de chargement -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-4"></div>
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
    
    <!-- Message travailleur non trouvé -->
    <div v-else-if="!worker" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-red-700">Travailleur non trouvé.</span>
      </div>
    </div>
    
    <!-- Contenu principal -->
    <div v-else>
      <!-- Informations du travailleur -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <!-- En-tête de la card avec identité du travailleur -->
        <div class="flex items-center p-4 border-b border-gray-200 bg-green-50">
          <svg class="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <div>
            <h2 class="text-xl font-semibold text-gray-800">
              {{ worker.first_name }} {{ worker.last_name }}
            </h2>
            <div class="text-sm text-gray-500 mt-1">
              Régime: 
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ formatWorkRegime(worker.work_regime) }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Section Informations personnelles -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Informations personnelles
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">ID</p>
              <p class="text-gray-900">
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">#{{ worker.id }}</span>
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Prénom</p>
              <p class="text-gray-900">{{ worker.first_name }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Nom</p>
              <p class="text-gray-900">{{ worker.last_name }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Date de naissance</p>
              <p class="text-gray-900">{{ formatDate(worker.birth_date) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Informations de contact</p>
              <p class="text-gray-900">{{ worker.contact_info || 'Non spécifiées' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Code interne ESAT</p>
              <p class="text-gray-900">{{ worker.internal_code || 'Non spécifié' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Section Informations ESAT -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            Informations ESAT
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">ESAT</p>
              <p class="text-gray-900">
                <NuxtLink 
                  v-if="worker.esat_id" 
                  :to="`/esats/${worker.esat_id}`" 
                  class="text-pink-600 hover:text-pink-800 hover:underline flex items-center"
                >
                  <svg class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Voir l'ESAT (ID: {{ worker.esat_id }})
                </NuxtLink>
                <span v-else class="text-gray-500">Non assigné</span>
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Date d'entrée dans l'ESAT</p>
              <p class="text-gray-900">{{ formatDate(worker.entry_date_esat) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Régime de travail</p>
              <p class="text-gray-900">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ formatWorkRegime(worker.work_regime) }}
                </span>
              </p>
            </div>
            <div v-if="worker.work_regime === 'part-time'">
              <p class="text-sm font-medium text-gray-500 mb-1">Pourcentage temps partiel</p>
              <p class="text-gray-900">{{ worker.part_time_percentage ? `${worker.part_time_percentage}%` : 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Horaires de travail</p>
              <p class="text-gray-900">{{ worker.work_hours || 'Non spécifiés' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Section Situation personnelle -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Situation personnelle
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Situation de logement</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.living_situation || 'Non spécifiée' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Informations de mobilité</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.mobility_info || 'Non spécifiées' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Mesure de protection juridique</p>
              <p class="text-gray-900">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {{ formatProtectionMeasure(worker.protection_measure) }}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <!-- Section Santé et parcours -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Santé et parcours
          </h3>
          
          <div class="grid grid-cols-1 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Résumé d'informations santé</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.health_info_summary || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Parcours scolaire</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.educational_background || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Parcours professionnel</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.professional_background_summary || 'Non spécifié' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Section Historique -->
        <div class="p-5">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Historique
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Créé le</p>
              <p class="text-gray-900">{{ formatDateTime(worker.created_at) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Dernière mise à jour</p>
              <p class="text-gray-900">{{ formatDateTime(worker.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Suggestions IA -->
      <div v-if="aiSuggestions" class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div class="flex items-center p-4 border-b border-gray-200 bg-purple-50">
          <svg class="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <h3 class="text-lg font-medium text-purple-800">Suggestions de métiers (IA)</h3>
        </div>
        <div class="p-5">
          <div class="prose max-w-none">
            <p class="text-gray-700 whitespace-pre-line">{{ aiSuggestions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

// Worker data
const worker = ref(null);
const loading = ref(true);
const error = ref(null);

// AI Suggestions data
const aiSuggestions = ref(null);
const loadingSuggestions = ref(false);

// Format date helper (date only)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Format date and time helper
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

// Format work regime helper
const formatWorkRegime = (regime) => {
  if (!regime) return 'Non spécifié';
  const regimeMap = {
    'full-time': 'Temps plein',
    'part-time': 'Temps partiel'
  };
  return regimeMap[regime] || regime;
};

// Format protection measure helper
const formatProtectionMeasure = (measure) => {
  if (!measure) return 'Non spécifiée';
  const measureMap = {
    'tutelle': 'Tutelle',
    'curatelle_simple': 'Curatelle simple',
    'curatelle_renforcee': 'Curatelle renforcée',
    'pas_de_mesure': 'Pas de mesure',
    'autre': 'Autre'
  };
  return measureMap[measure] || measure;
};

// Fetch Worker data
onMounted(async () => {
  try {
    const response = await fetch(`/api/workers/${id.value}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Travailleur non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    // Handle if the API wraps the worker data in a 'data' property
    worker.value = data.data || data;
    
  } catch (err) {
    error.value = `Erreur lors du chargement du travailleur: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Method to suggest jobs using AI
const suggestJobs = async () => {
  loadingSuggestions.value = true;
  aiSuggestions.value = null; // Clear previous suggestions
  try {
    const response = await fetch(`/api/workers/${id.value}/suggest-jobs`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const result = await response.json();
    if (result.status === 'success') {
      aiSuggestions.value = result.suggestions;
    } else {
      throw new Error(result.message || 'Failed to get job suggestions from AI');
    }
  } catch (err) {
    aiSuggestions.value = `Erreur lors de la suggestion de métiers: ${err.message}`;
    console.error(err);
  } finally {
    loadingSuggestions.value = false;
  }
};
</script>