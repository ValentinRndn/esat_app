<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Modifier l'Utilisateur</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/users" class="text-gray-500">Utilisateurs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-blue-600 font-medium">Modifier</span>
        </p>
      </div>
      <div class="flex space-x-2">
        <NuxtLink :to="`/users/${id}`" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Voir les détails
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
    
    <!-- Message de succès -->
    <div v-else-if="success" class="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div class="flex-1">
          <span class="text-green-700">Utilisateur mis à jour avec succès !</span>
          <div class="mt-3 flex space-x-3">
            <NuxtLink :to="`/users/${id}`" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Voir les détails
            </NuxtLink>
            <NuxtLink to="/users" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              Retour à la liste
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Card du formulaire -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <!-- En-tête de la card -->
      <div class="flex items-center p-4 border-b border-gray-200">
        <svg class="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">Modifier les informations</h2>
      </div>
      
      <!-- Formulaire -->
      <form @submit.prevent="submitForm" class="p-6">
        <div class="grid grid-cols-1 gap-6">
          <!-- Nom et prénom -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input 
                type="text" 
                id="first_name" 
                v-model="formData.first_name" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                required
                :disabled="submitting"
              >
            </div>
            
            <div>
              <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input 
                type="text" 
                id="last_name" 
                v-model="formData.last_name" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                required
                :disabled="submitting"
              >
            </div>
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
              required
              :disabled="submitting"
            >
          </div>
          
          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe (laisser vide pour ne pas changer)</label>
            <input 
              type="password" 
              id="password" 
              v-model="formData.password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              :disabled="submitting"
            >
            <p class="mt-1 text-sm text-gray-500">Si vous remplissez ce champ, le mot de passe de l'utilisateur sera changé.</p>
          </div>
          
          <!-- Rôle et ESAT -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
              <select 
                id="role" 
                v-model="formData.role" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                required
                :disabled="submitting"
              >
                <option value="super_admin">Super Administrateur</option>
                <option value="admin_esat">Administrateur ESAT</option>
                <option value="user_esat">Utilisateur ESAT</option>
              </select>
            </div>
            
            <div>
              <label for="esat_id" class="block text-sm font-medium text-gray-700 mb-1">ESAT (Optionnel)</label>
              <select 
                id="esat_id" 
                v-model="formData.esat_id" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                :disabled="submitting || loadingEsats"
              >
                <option :value="null">Aucun ESAT assigné</option>
                <option v-if="loadingEsats" disabled>Chargement des ESATs...</option>
                <option v-for="esatOption in esats" :key="esatOption.id" :value="esatOption.id">
                  {{ esatOption.name }}
                </option>
              </select>
              <div v-if="esatsError" class="mt-1 text-sm text-red-600">{{ esatsError }}</div>
              <div v-if="loadingEsats" class="mt-1 text-sm text-gray-500 flex items-center">
                <svg class="animate-spin h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement des ESATs...
              </div>
            </div>
          </div>
          
          <!-- Statut actif -->
          <div>
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="is_active" 
                v-model="formData.is_active" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-200"
                :disabled="submitting"
              >
              <label for="is_active" class="ml-2 block text-sm text-gray-700">Actif</label>
            </div>
            <p class="mt-1 text-sm text-gray-500">Décochez pour désactiver temporairement le compte de l'utilisateur</p>
          </div>
        </div>
        
        <!-- Footer du formulaire avec boutons d'action -->
        <div class="mt-8 pt-5 border-t border-gray-200 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="resetForm" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200" 
            :disabled="submitting"
          >
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Réinitialiser
          </button>
          <button 
            type="submit" 
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200" 
            :disabled="submitting"
          >
            <svg v-if="!submitting" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else class="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ submitting ? 'Mise à jour en cours...' : 'Mettre à jour l\'Utilisateur' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

// Form state
const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: 'user_esat',
  esat_id: null,
  is_active: true
});

const user = ref(null);
const originalData = ref(null);
const loading = ref(true);
const submitting = ref(false);
const error = ref(null);
const success = ref(false);

// ESATs loading state
const esats = ref([]);
const loadingEsats = ref(true);
const esatsError = ref(null);

// Fetch user data
onMounted(async () => {
  try {
    loading.value = true;
    
    // Charger les données de l'utilisateur
    const userResponse = await fetch(`/api/users/${id.value}`);
    
    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      throw new Error(`Erreur HTTP: ${userResponse.status}`);
    }
    
    user.value = await userResponse.json();
    
    // Initialiser le formulaire avec les données de l'utilisateur
    formData.value = {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      email: user.value.email,
      password: '', // Toujours vide pour des raisons de sécurité
      role: user.value.role,
      esat_id: user.value.esat_id,
      is_active: user.value.is_active
    };
    
    // Sauvegarder les données originales pour la réinitialisation
    originalData.value = { ...formData.value };
    
    // Charger les ESATs disponibles
    try {
      loadingEsats.value = true;
      const esatsResponse = await fetch('/api/esats');
      
      if (!esatsResponse.ok) {
        throw new Error(`Erreur HTTP: ${esatsResponse.status}`);
      }
      
      esats.value = await esatsResponse.json();
    } catch (esatsErr) {
      console.error('Erreur lors du chargement des ESATs:', esatsErr);
      esatsError.value = `Erreur lors du chargement des ESATs: ${esatsErr.message}`;
    } finally {
      loadingEsats.value = false;
    }
    
  } catch (err) {
    console.error('Erreur lors du chargement de l\'utilisateur:', err);
    error.value = `Erreur: ${err.message}`;
  } finally {
    loading.value = false;
  }
});

// Submit form
const submitForm = async () => {
  try {
    submitting.value = true;
    success.value = false;
    error.value = null;
    
    // Copie des données pour éviter de modifier l'original
    const dataToSend = { ...formData.value };
    
    // Supprimer les champs qui ne doivent pas être envoyés
    if (!dataToSend.password.trim()) {
      delete dataToSend.password;
    }
    
    // Conversion explicite des types numériques si nécessaire
    if (dataToSend.esat_id) {
      dataToSend.esat_id = Number(dataToSend.esat_id);
    }
    
    console.log('Données envoyées:', dataToSend);
    
    const response = await fetch(`/api/users/${id.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erreur HTTP: ${response.status} - ${errorData.message || response.statusText}`);
    }
    
    const updatedUser = await response.json();
    user.value = updatedUser;
    
    // Mettre à jour originalData pour la réinitialisation
    originalData.value = { ...formData.value };
    
    success.value = true;
    
    // Redirection après 2 secondes
    setTimeout(() => {
      success.value = false;
    }, 2000);
    
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
    error.value = `Erreur lors de la mise à jour: ${err.message}`;
  } finally {
    submitting.value = false;
  }
};

// Reset form to original data
const resetForm = () => {
  if (originalData.value) {
    formData.value = { ...originalData.value };
  }
};
</script> 