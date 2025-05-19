<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Détails de l'ESAT</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/esats" class="text-gray-500">ESATs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-pink-600 font-medium">Détails</span>
        </p>
      </div>
      <div class="flex space-x-2">
        <NuxtLink :to="`/esats/${id}/edit`" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Modifier
        </NuxtLink>
        <NuxtLink to="/esats" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Retour à la liste
        </NuxtLink>
      </div>
    </div>
    
    <!-- État de chargement -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-12">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-pink-600 rounded-full animate-spin mb-4"></div>
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
    
    <!-- Message ESAT non trouvé -->
    <div v-else-if="!esat" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-red-700">ESAT non trouvé.</span>
      </div>
    </div>
    
    <!-- Contenu principal -->
    <div v-else class="space-y-6">
      <!-- Card des informations de l'ESAT -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <!-- En-tête de la card -->
        <div class="flex items-center p-4 border-b border-gray-200">
          <svg class="h-6 w-6 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <h2 class="text-lg font-semibold text-gray-800">{{ esat.name }}</h2>
        </div>
        
        <!-- Contenu des informations -->
        <div class="p-5">
          <h3 class="text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200">Informations générales</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">ID</p>
              <p class="text-gray-900 font-medium">
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">#{{ esat.id }}</span>
              </p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Adresse</p>
              <p class="text-gray-900">{{ esat.address || 'Non spécifiée' }}</p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Ville</p>
              <p class="text-gray-900">{{ esat.city || 'Non spécifiée' }}</p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Code Postal</p>
              <p class="text-gray-900">{{ esat.postal_code || 'Non spécifié' }}</p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Email</p>
              <p class="text-gray-900">
                <a v-if="esat.email" :href="`mailto:${esat.email}`" class="text-pink-600 hover:text-pink-800 hover:underline">
                  {{ esat.email }}
                </a>
                <span v-else class="text-gray-500">Non spécifié</span>
              </p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Téléphone</p>
              <p class="text-gray-900">
                <a v-if="esat.phone" :href="`tel:${esat.phone}`" class="text-pink-600 hover:text-pink-800 hover:underline">
                  {{ esat.phone }}
                </a>
                <span v-else class="text-gray-500">Non spécifié</span>
              </p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Créé le</p>
              <p class="text-gray-900">{{ formatDate(esat.created_at) }}</p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Dernière mise à jour</p>
              <p class="text-gray-900">{{ formatDate(esat.updated_at) }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Card des utilisateurs associés -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
          <div class="flex items-center mb-3 md:mb-0">
            <svg class="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <h2 class="text-lg font-semibold text-gray-800">Utilisateurs associés</h2>
          </div>
          <NuxtLink to="/users/create" class="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Ajouter un utilisateur
          </NuxtLink>
        </div>
        
        <!-- État de chargement -->
        <div v-if="loadingUsers" class="flex flex-col items-center justify-center py-8">
          <div class="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
          <p class="text-gray-500">Chargement des utilisateurs...</p>
        </div>
        
        <!-- Message d'erreur utilisateurs -->
        <div v-else-if="usersError" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div class="flex items-start">
            <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-700">{{ usersError }}</span>
          </div>
        </div>
        
        <!-- État vide utilisateurs -->
        <div v-else-if="users.length === 0" class="flex flex-col items-center justify-center py-8">
          <div class="w-16 h-16 text-gray-300 mb-3">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Aucun utilisateur associé</h3>
          <p class="text-gray-500 mb-5 max-w-sm text-center">Il n'y a pas encore d'utilisateurs liés à cet ESAT</p>
          <NuxtLink to="/users/create" class="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Ajouter un utilisateur
          </NuxtLink>
        </div>
        
        <!-- Table des utilisateurs -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-blue-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">#{{ user.id }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-gray-900">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-gray-900">{{ formatRole(user.role) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="user.is_active" class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Actif
                  </span>
                  <span v-else class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Inactif
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <div class="flex items-center justify-center">
                    <NuxtLink :to="`/users/${user.id}`" class="p-1.5 rounded-full hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition-colors duration-200" title="Voir les détails">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Card des travailleurs associés -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
          <div class="flex items-center mb-3 md:mb-0">
            <svg class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h2 class="text-lg font-semibold text-gray-800">Travailleurs associés</h2>
          </div>
          <NuxtLink to="/workers/create" class="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Ajouter un travailleur
          </NuxtLink>
        </div>
        
        <!-- État de chargement -->
        <div v-if="loadingWorkers" class="flex flex-col items-center justify-center py-8">
          <div class="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mb-3"></div>
          <p class="text-gray-500">Chargement des travailleurs...</p>
        </div>
        
        <!-- Message d'erreur travailleurs -->
        <div v-else-if="workersError" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div class="flex items-start">
            <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-700">{{ workersError }}</span>
          </div>
        </div>
        
        <!-- État vide travailleurs -->
        <div v-else-if="workers.length === 0" class="flex flex-col items-center justify-center py-8">
          <div class="w-16 h-16 text-gray-300 mb-3">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Aucun travailleur associé</h3>
          <p class="text-gray-500 mb-5 max-w-sm text-center">Il n'y a pas encore de travailleurs liés à cet ESAT</p>
          <NuxtLink to="/workers/create" class="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Ajouter un travailleur
          </NuxtLink>
        </div>
        
        <!-- Table des travailleurs -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Régime de travail</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code interne</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'entrée</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="worker in workers" :key="worker.id" class="hover:bg-green-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">#{{ worker.id }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-gray-900">{{ worker.last_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-gray-900">{{ worker.first_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                  {{ formatWorkRegime(worker.work_regime) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                  {{ worker.internal_code || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-gray-900">{{ formatDate(worker.entry_date_esat, true) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <div class="flex items-center justify-center">
                    <NuxtLink :to="`/workers/${worker.id}`" class="p-1.5 rounded-full hover:bg-green-50 text-green-500 hover:text-green-600 transition-colors duration-200" title="Voir les détails">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </NuxtLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => {
  console.log('Route params ID:', route.params.id); // Log the route parameter
  return route.params.id;
});

// ESAT data
const esat = ref(null);
const loading = ref(true);
const error = ref(null);

// Users data
const users = ref([]);
const loadingUsers = ref(true);
const usersError = ref(null);

// Workers data
const workers = ref([]);
const loadingWorkers = ref(true);
const workersError = ref(null);

// Format date helper
const formatDate = (dateString, dateOnly = false) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  if (dateOnly) {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
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
  
  return roleMap[role] || role;
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

// Fetch ESAT data
onMounted(async () => {
  try {
    // Fetch ESAT details
    const response = await fetch(`/api/esats/${id.value}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ESAT non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    // Handle if API returns data wrapped in a data property
    esat.value = data.data || data;
    
    // After fetching ESAT, fetch related users and workers
    fetchRelatedUsers();
    fetchRelatedWorkers();
    
  } catch (err) {
    error.value = `Erreur lors du chargement de l'ESAT: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Fetch users related to this ESAT
const fetchRelatedUsers = async () => {
  try {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const userData = await response.json();
    // Handle if API returns data wrapped in a data property
    const allUsers = userData.data || userData;
    
    // Filter users by esat_id
    users.value = allUsers.filter(user => user.esat_id === parseInt(id.value));
    
  } catch (err) {
    usersError.value = `Erreur lors du chargement des utilisateurs: ${err.message}`;
    console.error(err);
  } finally {
    loadingUsers.value = false;
  }
};

// Fetch workers related to this ESAT
const fetchRelatedWorkers = async () => {
  try {
    const response = await fetch('/api/workers');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const workerData = await response.json();
    // Handle if API returns data wrapped in a data property
    const allWorkers = workerData.data || workerData;
    
    // Filter workers by esat_id
    workers.value = allWorkers.filter(worker => worker.esat_id === parseInt(id.value));
    
  } catch (err) {
    workersError.value = `Erreur lors du chargement des travailleurs: ${err.message}`;
    console.error(err);
  } finally {
    loadingWorkers.value = false;
  }
};
</script>