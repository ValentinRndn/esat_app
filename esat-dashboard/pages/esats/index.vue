<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    
    <!-- Grid Background with fade effect -->
    <div class="absolute inset-0 z-0">
      <div class="grid-pattern"></div>
      <div class="grid-fade-overlay"></div>
      
      <!-- Light Halos -->
      <div class="light-halo light-halo-1"></div>
      <div class="light-halo light-halo-2"></div>
    </div>

    <!-- Navigation Header -->
    <nav class="relative z-50 border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center">
            <NuxtLink to="/dashboard" class="text-2xl font-semibold text-white hover:text-green-400 transition-colors duration-200">BAYTH</NuxtLink>
            <span class="ml-4 text-sm text-gray-400">/ ESATs</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/esats/create" class="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ajouter un ESAT
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="relative z-10 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Section -->
        <div class="mb-12">
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-blue-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-blue-400">ESATs</span>
            <span class="text-sm text-gray-300">Gestion des établissements</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Gestion des 
            <span class="text-blue-400">ESATs</span>
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl">
            Consultez et gérez la liste complète des établissements et services d'aide par le travail.
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold text-white">{{ esats.length }}</div>
                <div class="text-sm text-gray-300">Total ESATs</div>
              </div>
              <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold text-white">{{ esats.filter(e => e.email).length }}</div>
                <div class="text-sm text-gray-300">Avec email</div>
              </div>
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold text-white">{{ esats.filter(e => e.phone).length }}</div>
                <div class="text-sm text-gray-300">Avec téléphone</div>
              </div>
              <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold text-white">{{ getUniqueCount(esats, 'city') }}</div>
                <div class="text-sm text-gray-300">Villes</div>
              </div>
              <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div class="w-12 h-12 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-300">Chargement des données...</p>
        </div>
        
        <!-- Message d'erreur -->
        <div v-else-if="error" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">{{ error }}</span>
          </div>
        </div>
        
        <!-- État vide -->
        <div v-else-if="esats.length === 0" class="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div class="w-20 h-20 text-gray-400 mb-6">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-4">Aucun ESAT trouvé</h3>
          <p class="text-gray-400 mb-8 max-w-sm text-center">Commencez par ajouter votre premier établissement au système</p>
          <NuxtLink to="/esats/create" class="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-200">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter un ESAT
          </NuxtLink>
        </div>
        
        <!-- Liste des ESATs -->
        <div v-else class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <!-- Header de la liste -->
          <div class="p-6 border-b border-white/10">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h2 class="text-xl font-semibold text-white">Liste des ESATs</h2>
              </div>
              <div class="relative">
                <input
                  type="text"
                  placeholder="Rechercher un ESAT..."
                  class="w-full md:w-64 pl-4 pr-12 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <svg class="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Table des ESATs -->
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div class="flex items-center cursor-pointer group">
                      ID
                      <svg class="ml-1 w-4 h-4 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Établissement
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th class="px-6 py-4 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/10">
                <tr v-for="esat in esats" :key="esat.id" class="hover:bg-white/5 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-gray-300">#{{ esat.id }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                        <span class="text-sm font-medium text-blue-400">{{ getInitials(esat.name) }}</span>
                      </div>
                      <div>
                        <div class="font-medium text-white">{{ esat.name }}</div>
                        <div class="text-sm text-gray-400">Établissement ESAT</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ esat.city || 'Non spécifiée' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="space-y-1">
                      <div v-if="esat.email" class="flex items-center">
                        <svg class="w-4 h-4 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a :href="`mailto:${esat.email}`" class="text-blue-400 hover:text-blue-300 hover:underline text-sm transition-colors duration-200">
                          {{ esat.email }}
                        </a>
                      </div>
                      <div v-if="esat.phone" class="flex items-center">
                        <svg class="w-4 h-4 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a :href="`tel:${esat.phone}`" class="text-blue-400 hover:text-blue-300 hover:underline text-sm transition-colors duration-200">
                          {{ esat.phone }}
                        </a>
                      </div>
                      <div v-if="!esat.email && !esat.phone" class="text-gray-500 text-sm">
                        Aucun contact
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="flex items-center justify-center space-x-2">
                      <NuxtLink :to="`/esats/${esat.id}`" 
                                class="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all duration-200" 
                                title="Voir les détails">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </NuxtLink>
                      <NuxtLink :to="`/esats/edit/${esat.id}`" 
                                class="p-2 rounded-lg hover:bg-green-500/20 text-green-400 hover:text-green-300 transition-all duration-200" 
                                title="Modifier">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </NuxtLink>
                      <button @click="confirmDelete(esat)" 
                              class="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200" 
                              title="Supprimer">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Footer -->
          <div class="px-6 py-4 bg-white/5 border-t border-white/10">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div class="text-sm text-gray-400 mb-2 sm:mb-0">
                Affichage de <span class="font-medium text-gray-300">{{ esats.length }}</span> ESATs
              </div>
              <div class="flex space-x-2">
                <button class="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-lg text-gray-400 bg-white/5 hover:bg-white/10 transition-all duration-200">
                  <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Précédent
                </button>
                <button class="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-lg text-gray-400 bg-white/5 hover:bg-white/10 transition-all duration-200">
                  Suivant
                  <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4" @click.self="cancelDelete">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white">Confirmer la suppression</h3>
              <p class="text-gray-400 text-sm">Cette action ne peut pas être annulée</p>
            </div>
          </div>
          <p class="text-gray-300 mb-6">
            Êtes-vous sûr de vouloir supprimer l'ESAT <strong class="text-white">"{{ esatToDelete?.name }}"</strong> ?
          </p>
          <div class="flex justify-end space-x-3">
            <button @click="cancelDelete" class="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-lg transition-all duration-200">
              Annuler
            </button>
            <button @click="deleteEsat" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const esats = ref([]);
const loading = ref(true);
const error = ref(null);
const showDeleteModal = ref(false);
const esatToDelete = ref(null);

// Get initials helper for ESAT name
const getInitials = (name) => {
  if (!name) return '?';
  const words = name.split(' ');
  if (words.length >= 2) {
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }
  return name.charAt(0).toUpperCase() + (name.charAt(1) || '').toUpperCase();
};

// Get unique count helper
const getUniqueCount = (array, field) => {
  const uniqueValues = new Set(array.filter(item => item[field]).map(item => item[field]));
  return uniqueValues.size;
};

// Fetch ESATs on component mount
onMounted(async () => {
  try {
    const response = await fetch('/api/esats');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    // L'API peut retourner soit directement un tableau, soit un objet avec une propriété data
    const esatsData = Array.isArray(data) ? data : (data.data || []);
    esats.value = esatsData;
    
  } catch (err) {
    error.value = `Erreur lors du chargement des ESATs: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Delete confirmation
const confirmDelete = (esat) => {
  esatToDelete.value = esat;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  esatToDelete.value = null;
};

// Delete ESAT
const deleteEsat = async () => {
  if (!esatToDelete.value) return;
  
  try {
    const response = await fetch(`/api/esats/${esatToDelete.value.id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    esats.value = esats.value.filter(e => e.id !== esatToDelete.value.id);
    showDeleteModal.value = false;
    esatToDelete.value = null;
    
  } catch (err) {
    error.value = `Erreur lors de la suppression: ${err.message}`;
    console.error(err);
  }
};
</script>

<style>
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Grid Pattern Background */
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: 0 0, 0 0;
  animation: grid-move 20s linear infinite;
}

/* Grid fade overlay */
.grid-fade-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 40%,
    rgba(17, 24, 39, 0.3) 60%,
    rgba(17, 24, 39, 0.7) 80%,
    rgba(17, 24, 39, 0.9) 100%
  );
  pointer-events: none;
}

/* Optional animation for the grid */
@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(80px, 80px);
  }
}

/* Light Halos */
.light-halo {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.light-halo-1 {
  top: -8%;
  right: -8%;
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.25) 0%,
    rgba(34, 197, 94, 0.15) 30%,
    rgba(34, 197, 94, 0.08) 60%,
    transparent 100%
  );
  filter: blur(60px);
}

.light-halo-2 {
  top: 5%;
  left: 5%;
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.20) 0%,
    rgba(34, 197, 94, 0.12) 30%,
    rgba(34, 197, 94, 0.06) 60%,
    transparent 100%
  );
  filter: blur(50px);
}
</style>
