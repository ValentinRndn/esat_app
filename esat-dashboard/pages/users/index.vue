<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Liste des Utilisateurs</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-blue-600 font-medium">Utilisateurs</span>
        </p>
      </div>
      <NuxtLink to="/users/create" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Ajouter un Utilisateur
      </NuxtLink>
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
    
    <!-- État vide -->
    <div v-else-if="users.length === 0" class="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
      <div class="w-20 h-20 text-gray-300 mb-4">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Aucun utilisateur trouvé</h3>
      <p class="text-gray-500 mb-6 max-w-sm text-center">Commencez par ajouter un utilisateur au système</p>
      <NuxtLink to="/users/create" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Ajouter un Utilisateur
      </NuxtLink>
    </div>
    
    <!-- Card principale avec table des utilisateurs -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <!-- En-tête de la card -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-200">
        <div class="flex items-center mb-3 md:mb-0">
          <svg class="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <h2 class="text-lg font-semibold text-gray-800">Utilisateurs enregistrés</h2>
        </div>
        <div class="w-full md:w-auto relative">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            class="w-full md:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <svg class="absolute right-3 top-2.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      
      <!-- Table des utilisateurs -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer group">
                  ID
                  <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer group">
                  Prénom
                  <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer group">
                  Nom
                  <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer group">
                  Email
                  <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer group">
                  Rôle
                  <svg class="ml-1 h-4 w-4 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-blue-50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">#{{ user.id }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ user.first_name || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ user.last_name || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <a :href="`mailto:${user.email}`" class="text-blue-600 hover:text-blue-800 hover:underline">{{ user.email }}</a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ user.role || 'Utilisateur' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                <div class="flex items-center justify-center space-x-2">
                  <NuxtLink :to="`/users/${user.id}`" class="p-1.5 rounded-full hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition-colors duration-200" title="Voir les détails">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </NuxtLink>
                  <NuxtLink :to="`/users/edit/${user.id}`" class="p-1.5 rounded-full hover:bg-green-50 text-green-500 hover:text-green-600 transition-colors duration-200" title="Modifier">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </NuxtLink>
                  <button @click="confirmDelete(user)" class="p-1.5 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors duration-200" title="Supprimer">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Footer de la table avec pagination -->
        <div class="px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 border-t border-gray-200">
          <div class="text-sm text-gray-500 mb-2 sm:mb-0">
            Affichage de <span class="font-medium text-gray-700">1-{{ users.length }}</span> sur <span class="font-medium text-gray-700">{{ users.length }}</span> utilisateurs
          </div>
          <div class="flex space-x-2">
            <button disabled class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-400 bg-white opacity-50 cursor-not-allowed">
              <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Précédent
            </button>
            <button disabled class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-400 bg-white opacity-50 cursor-not-allowed">
              Suivant
              <svg class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6" @click.self="cancelDelete">
      <div class="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full animate-modal-appear">
        <div class="p-5 bg-white border-b border-gray-200 flex items-center">
          <svg class="h-6 w-6 text-yellow-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900">
            Confirmer la suppression
          </h3>
          <button @click="cancelDelete" class="ml-auto text-gray-400 hover:text-gray-500">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-5">
          <p class="text-gray-700 mb-4">
            Êtes-vous sûr de vouloir supprimer l'utilisateur "<strong>{{ userToDelete?.first_name }} {{ userToDelete?.last_name }}</strong>" ?
          </p>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div class="flex">
              <svg class="h-5 w-5 text-yellow-500 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span class="text-yellow-700">Cette action est irréversible et supprimera toutes les données associées.</span>
            </div>
          </div>
        </div>
        <div class="px-5 py-4 bg-gray-50 flex justify-end space-x-3">
          <button @click="cancelDelete" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
            Annuler
          </button>
          <button @click="deleteUser" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const loading = ref(true);
const error = ref(null);
const showDeleteModal = ref(false);
const userToDelete = ref(null);

// Fetch Users on component mount
onMounted(async () => {
  try {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    users.value = await response.json();
  } catch (err) {
    error.value = `Erreur lors du chargement des utilisateurs: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Delete confirmation
const confirmDelete = (user) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
};

// Delete User
const deleteUser = async () => {
  if (!userToDelete.value) return;
  
  try {
    const response = await fetch(`/api/users/${userToDelete.value.id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    // Remove from list
    users.value = users.value.filter(u => u.id !== userToDelete.value.id);
    
    // Close modal
    showDeleteModal.value = false;
    userToDelete.value = null;
    
  } catch (err) {
    error.value = `Erreur lors de la suppression: ${err.message}`;
    console.error(err);
  }
};
</script>

<style>
@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-modal-appear {
  animation: modal-appear 0.2s ease-out forwards;
}
</style>