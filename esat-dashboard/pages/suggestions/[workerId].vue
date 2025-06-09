<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Header -->
    <div class="border-b border-white/10 bg-white/5 backdrop-blur-lg">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink 
              :to="`/workers/${workerId}`"
              class="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl font-bold text-white">Suggestions Professionnelles</h1>
              <p class="text-gray-400 mt-1" v-if="worker">
                {{ worker.first_name }} {{ worker.last_name }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <button 
              @click="generateNewSuggestions" 
              :disabled="loadingNewSuggestions"
              class="inline-flex items-center px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <svg v-if="!loadingNewSuggestions" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <svg v-else class="animate-spin w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loadingNewSuggestions ? 'Génération...' : 'Nouvelles suggestions' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <!-- Colonne principale : Suggestions -->
        <div class="xl:col-span-2 space-y-6">
          <!-- Dernière suggestion -->
          <div v-if="latestSuggestion" class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-white">Dernière suggestion</h2>
              <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                {{ formatDate(latestSuggestion.created_at) }}
              </span>
            </div>
            <div class="prose prose-invert max-w-none">
              <div class="text-gray-300 whitespace-pre-line leading-relaxed" v-html="formatAiResponse(latestSuggestion.response)">
              </div>
            </div>
            
            <!-- Actions pour la dernière suggestion -->
            <div class="mt-6 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <button 
                  @click="showCompaniesMap = !showCompaniesMap"
                  class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ showCompaniesMap ? 'Masquer la carte' : 'Voir les entreprises locales' }}
                </button>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="updateSuggestionStatus(latestSuggestion.id, 'reviewed')"
                  class="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200"
                >
                  Marquer comme révisé
                </button>
              </div>
            </div>
          </div>

          <!-- Historique des suggestions -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <h2 class="text-xl font-semibold text-white mb-6">Historique des suggestions</h2>
            
            <div v-if="loadingSuggestions" class="flex items-center justify-center py-8">
              <div class="w-8 h-8 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin mr-3"></div>
              <p class="text-gray-300">Chargement...</p>
            </div>
            
            <div v-else-if="suggestions.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Aucune suggestion</h3>
              <p class="text-gray-400">Cliquez sur "Nouvelles suggestions" pour commencer</p>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="suggestion in suggestions.slice(1)" 
                :key="suggestion.id"
                class="bg-white/5 rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-all duration-200"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <span class="px-2 py-1 rounded-full text-xs" :class="getStatusClass(suggestion.status)">
                      {{ formatStatus(suggestion.status) }}
                    </span>
                    <span class="text-xs text-gray-400">{{ formatDate(suggestion.created_at) }}</span>
                  </div>
                </div>
                
                <div class="text-sm text-gray-300 mb-3">
                  {{ suggestion.response.substring(0, 200) }}{{ suggestion.response.length > 200 ? '...' : '' }}
                </div>
                
                <button 
                  @click="showSuggestionDetail(suggestion)"
                  class="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-200"
                >
                  Voir en détail
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne droite : Carte des entreprises -->
        <div class="space-y-6">
          <!-- Informations du travailleur -->
          <div v-if="worker" class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <h3 class="text-lg font-semibold text-white mb-4">Profil du travailleur</h3>
            <div class="space-y-3">
              <div>
                <p class="text-sm text-gray-400">Secteurs d'activité</p>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span 
                    v-for="sector in getActivitySectors(worker.activity_sectors)" 
                    :key="sector"
                    class="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full"
                  >
                    {{ sector.trim() }}
                  </span>
                </div>
              </div>
              <div v-if="worker.geographic_mobility">
                <p class="text-sm text-gray-400">Mobilité géographique</p>
                <span class="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                  {{ formatGeographicMobility(worker.geographic_mobility) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Carte des entreprises -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-white">Entreprises locales</h3>
              <button 
                @click="searchNearbyCompanies"
                :disabled="loadingCompanies"
                class="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm transition-all duration-200 disabled:opacity-50"
              >
                <svg v-if="!loadingCompanies" class="w-4 h-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ loadingCompanies ? 'Recherche...' : 'Rechercher entreprises' }}
              </button>
            </div>
            
            <!-- Zone de la carte -->
            <div 
              ref="mapContainer" 
              class="w-full h-96 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div v-if="!mapInitialized" class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <div class="w-8 h-8 border-4 border-white/20 border-t-green-400 rounded-full animate-spin mx-auto mb-3"></div>
                  <p class="text-gray-400 text-sm">Initialisation de la carte...</p>
                </div>
              </div>
            </div>
            
            <!-- Liste des entreprises -->
            <div v-if="nearbyCompanies.length > 0" class="mt-4 space-y-2 max-h-64 overflow-y-auto">
              <div 
                v-for="company in nearbyCompanies" 
                :key="company.id"
                class="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                @click="focusOnCompany(company)"
              >
                <h4 class="font-medium text-white text-sm">{{ company.name }}</h4>
                <p class="text-xs text-gray-400 mt-1">{{ company.sector }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ company.address }}</p>
                <div class="mt-2 flex items-center justify-between">
                  <span class="text-xs text-green-400">{{ company.distance }} km</span>
                  <span class="text-xs text-blue-400">{{ company.employees || 'N/A' }} employés</span>
                </div>
              </div>
            </div>

            <!-- Message si aucune entreprise -->
            <div v-if="nearbyCompanies.length === 0 && !loadingCompanies" class="mt-4 text-center py-8">
              <div class="w-12 h-12 mx-auto text-gray-400 mb-3">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 class="text-sm font-medium text-white mb-1">Aucune entreprise trouvée</h4>
              <p class="text-xs text-gray-400">Cliquez sur "Rechercher entreprises" pour découvrir les opportunités locales</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour détail suggestion -->
    <div v-if="selectedSuggestion" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-gray-900 rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-white/10">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-white">Détail de la suggestion</h3>
            <button 
              @click="selectedSuggestion = null"
              class="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="prose prose-invert max-w-none">
            <div class="text-gray-300 whitespace-pre-line leading-relaxed" v-html="formatAiResponse(selectedSuggestion.response)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const workerId = computed(() => route.params.workerId);

// Reactive state
const worker = ref(null);
const suggestions = ref([]);
const loadingSuggestions = ref(true);
const loadingNewSuggestions = ref(false);
const loadingCompanies = ref(false);
const selectedSuggestion = ref(null);
const nearbyCompanies = ref([]);
const mapContainer = ref(null);
const mapInitialized = ref(false);
const map = ref(null);

// Computed
const latestSuggestion = computed(() => suggestions.value[0] || null);

// Méthodes utilitaires
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatStatus = (status) => {
  const statusMap = {
    'pending': 'En attente',
    'completed': 'Terminé',
    'reviewed': 'Révisé',
    'applied': 'Appliqué',
    'rejected': 'Rejeté'
  };
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    'pending': 'bg-orange-500/20 text-orange-400',
    'completed': 'bg-blue-500/20 text-blue-400',
    'reviewed': 'bg-green-500/20 text-green-400',
    'applied': 'bg-purple-500/20 text-purple-400',
    'rejected': 'bg-red-500/20 text-red-400'
  };
  return statusClasses[status] || 'bg-gray-500/20 text-gray-400';
};

const formatAiResponse = (response) => {
  if (!response) return '';
  
  return response
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
};

const getActivitySectors = (sectorsString) => {
  if (!sectorsString) return [];
  
  try {
    const parsed = JSON.parse(sectorsString);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, 5);
    }
  } catch (e) {
    return sectorsString.split(',').filter(s => s.trim()).slice(0, 5);
  }
  
  return [];
};

const formatGeographicMobility = (mobility) => {
  const mobilityMap = {
    'commune': 'Commune',
    'department': 'Département',
    'region': 'Région',
    'national': 'National',
    'other': 'Autre'
  };
  return mobilityMap[mobility] || mobility;
};

// Méthodes principales
const loadWorkerData = async () => {
  try {
    const response = await fetch(`/api/workers/${workerId.value}`);
    if (response.ok) {
      const data = await response.json();
      worker.value = data.data || data;
    }
  } catch (error) {
    console.error('Erreur lors du chargement du travailleur:', error);
  }
};

const loadSuggestions = async () => {
  loadingSuggestions.value = true;
  try {
    const response = await fetch(`/api/workers/${workerId.value}/ai-suggestions`);
    if (response.ok) {
      const data = await response.json();
      suggestions.value = data || [];
    }
  } catch (error) {
    console.error('Erreur lors du chargement des suggestions:', error);
  } finally {
    loadingSuggestions.value = false;
  }
};

const generateNewSuggestions = async () => {
  loadingNewSuggestions.value = true;
  try {
    const response = await fetch(`/api/workers/${workerId.value}/suggest-jobs`);
    if (response.ok) {
      const result = await response.json();
      if (result.status === 'success') {
        // Recharger les suggestions
        await loadSuggestions();
        await nextTick();
        await searchNearbyCompanies(); // Rechercher automatiquement les entreprises
      }
    }
  } catch (error) {
    console.error('Erreur lors de la génération des suggestions:', error);
  } finally {
    loadingNewSuggestions.value = false;
  }
};

const updateSuggestionStatus = async (suggestionId, status) => {
  try {
    const response = await fetch(`/api/ai-suggestions/${suggestionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    
    if (response.ok) {
      await loadSuggestions();
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
  }
};

const showSuggestionDetail = (suggestion) => {
  selectedSuggestion.value = suggestion;
};

// Méthodes pour la carte et les entreprises
const initializeMap = async () => {
  if (!mapContainer.value || mapInitialized.value) return;
  
  try {
    // Importer Leaflet dynamiquement
    const L = await import('leaflet');
    
    // Créer la carte
    map.value = L.default.map(mapContainer.value).setView([46.603354, 1.888334], 6); // Centre de la France
    
    // Ajouter la couche OpenStreetMap
    L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.value);
    
    mapInitialized.value = true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la carte:', error);
  }
};

const searchNearbyCompanies = async () => {
  if (!worker.value || !latestSuggestion.value) return;
  
  loadingCompanies.value = true;
  try {
    // Extraire les secteurs d'activité de la suggestion
    const sectors = extractSectorsFromSuggestion(latestSuggestion.value.response);
    
    const response = await fetch('/api/companies/search-nearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        worker_location: worker.value.esat_id, // Utiliser l'ESAT comme référence
        sectors,
        radius: getSearchRadius(worker.value.geographic_mobility),
        limit: 50
      })
    });
    
    if (response.ok) {
      const companies = await response.json();
      nearbyCompanies.value = companies;
      await displayCompaniesOnMap(companies);
    }
  } catch (error) {
    console.error('Erreur lors de la recherche d\'entreprises:', error);
  } finally {
    loadingCompanies.value = false;
  }
};

const extractSectorsFromSuggestion = (suggestionText) => {
  // Logique pour extraire les secteurs d'activité du texte de suggestion
  const commonSectors = [
    'restauration', 'hotellerie', 'commerce', 'services', 'industrie', 
    'batiment', 'transport', 'logistics', 'nettoyage', 'espaces verts',
    'maintenance', 'bureautique', 'accueil'
  ];
  
  const foundSectors = [];
  const lowerText = suggestionText.toLowerCase();
  
  commonSectors.forEach(sector => {
    if (lowerText.includes(sector)) {
      foundSectors.push(sector);
    }
  });
  
  return foundSectors;
};

const getSearchRadius = (mobility) => {
  const radiusMap = {
    'commune': 10,
    'department': 50,
    'region': 200,
    'national': 500,
    'other': 25
  };
  return radiusMap[mobility] || 25;
};

const displayCompaniesOnMap = async (companies) => {
  if (!map.value || companies.length === 0) return;
  
  try {
    const L = await import('leaflet');
    
    // Nettoyer la carte existante
    map.value.eachLayer((layer) => {
      if (layer instanceof L.default.Marker) {
        map.value.removeLayer(layer);
      }
    });
    
    // Ajouter les marqueurs des entreprises
    const markers = companies.map(company => {
      const marker = L.default.marker([company.latitude, company.longitude])
        .addTo(map.value)
        .bindPopup(`
          <div class="p-2">
            <h4 class="font-bold">${company.name}</h4>
            <p class="text-sm text-gray-600">${company.sector}</p>
            <p class="text-xs text-gray-500">${company.address}</p>
            <p class="text-xs text-blue-600 mt-1">${company.distance} km • ${company.employees || 'N/A'} employés</p>
          </div>
        `);
      
      return marker;
    });
    
    // Ajuster la vue pour inclure tous les marqueurs
    if (markers.length > 0) {
      const group = L.default.featureGroup(markers);
      map.value.fitBounds(group.getBounds().pad(0.1));
    }
  } catch (error) {
    console.error('Erreur lors de l\'affichage des entreprises sur la carte:', error);
  }
};

const focusOnCompany = async (company) => {
  if (!map.value) return;
  
  map.value.setView([company.latitude, company.longitude], 15);
  
  // Ouvrir le popup de l'entreprise
  const L = await import('leaflet');
  map.value.eachLayer((layer) => {
    if (layer instanceof L.default.Marker) {
      const latLng = layer.getLatLng();
      if (Math.abs(latLng.lat - company.latitude) < 0.001 && 
          Math.abs(latLng.lng - company.longitude) < 0.001) {
        layer.openPopup();
      }
    }
  });
};

// Lifecycle
onMounted(async () => {
  await Promise.all([
    loadWorkerData(),
    loadSuggestions()
  ]);
  
  // Initialiser la carte après le chargement des données
  await nextTick();
  await initializeMap();
  
  // Si des suggestions existent déjà, rechercher automatiquement les entreprises
  if (suggestions.value.length > 0) {
    await searchNearbyCompanies();
  }
});

// Watcher pour initialiser la carte quand le conteneur est prêt
watch(mapContainer, async (newValue) => {
  if (newValue && !mapInitialized.value) {
    await nextTick();
    await initializeMap();
  }
});
</script>

<style>
@import 'leaflet/dist/leaflet.css';

/* Corrections pour Leaflet avec Tailwind */
.leaflet-container {
  background: #1f2937;
}

.leaflet-popup-content-wrapper {
  background: white;
  border-radius: 8px;
}

.leaflet-popup-tip {
  background: white;
}
</style> 