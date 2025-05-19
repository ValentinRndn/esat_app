<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Ajouter un Utilisateur</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/users" class="text-gray-500">Utilisateurs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-blue-600 font-medium">Ajouter</span>
        </p>
      </div>
      <NuxtLink to="/users" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Retour à la liste
      </NuxtLink>
    </div>
    
    <!-- Message d'erreur général -->
    <div v-if="error" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-red-700">{{ error }}</span>
      </div>
    </div>
    
    <!-- Message d'erreur de mot de passe -->
    <div v-if="passwordError" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
        <span class="text-red-700">{{ passwordError }}</span>
      </div>
    </div>
    
    <!-- Message de succès -->
    <div v-if="success" class="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div class="flex-1">
          <span class="text-green-700">Utilisateur créé avec succès !</span>
          <div class="mt-3 flex space-x-3">
            <NuxtLink :to="`/users/${createdUserId}`" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Voir l'Utilisateur
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
    <div v-if="!success" class="bg-white rounded-lg shadow overflow-hidden">
      <!-- En-tête de la card -->
      <div class="flex items-center p-4 border-b border-gray-200">
        <svg class="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">Informations de l'utilisateur</h2>
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
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
            <input 
              type="password" 
              id="password" 
              v-model="formData.password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
              required
              :disabled="submitting"
            >
            <p class="mt-1 text-sm text-gray-500">Le mot de passe doit contenir au moins 8 caractères.</p>
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
              <label for="esat_id" class="block text-sm font-medium text-gray-700 mb-1">ESAT</label>
              <select 
                id="esat_id" 
                v-model="formData.esat_id" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                :disabled="submitting || loadingEsats"
              >
                <option :value="null">Aucun ESAT assigné</option>
                <option v-if="loadingEsats" disabled>Chargement des ESATs...</option>
                <option v-for="esat in esats" :key="esat.id" :value="esat.id">
                  {{ esat.name }}
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
              <div v-else-if="esats.length === 0 && !esatsError" class="mt-1 text-sm text-gray-500">Aucun ESAT disponible</div>
            </div>
          </div>
          
          <!-- Statut actif -->
          <div>
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="is_active" 
                v-model="formData.is_active" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                :disabled="submitting"
              >
              <label for="is_active" class="ml-2 block text-sm text-gray-700">Actif</label>
            </div>
            <p class="mt-1 text-sm text-gray-500">Cochez pour activer immédiatement le compte</p>
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            <svg v-else class="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ submitting ? 'Création en cours...' : 'Créer l\'Utilisateur' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Form state
const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '', // Sera converti en password_hash côté serveur
  role: 'user_esat', // Valeur par défaut
  esat_id: null,
  is_active: true // Valeur par défaut
});

const submitting = ref(false);
const error = ref(null);
const success = ref(false);
const createdUserId = ref(null);
const passwordError = ref(null);

// ESATs pour le dropdown
const esats = ref([]);
const loadingEsats = ref(true);
const esatsError = ref(null);

// Récupération des ESATs au montage du composant
onMounted(async () => {
  try {
    console.log('Récupération des ESATs...');
    loadingEsats.value = true;
    
    const response = await fetch('/api/esats');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Données ESAT reçues:', data);
    
    // Gestion des différentes structures de réponse possibles
    if (Array.isArray(data)) {
      esats.value = data;
    } else if (data.data && Array.isArray(data.data)) {
      esats.value = data.data;
    } else if (data.status === 'success' && Array.isArray(data.data)) {
      esats.value = data.data;
    } else {
      throw new Error('Format de données ESAT inattendu');
    }
    
    console.log('ESATs traités:', esats.value);
    
  } catch (err) {
    esatsError.value = `Erreur lors du chargement des ESATs: ${err.message}`;
    console.error('Erreur de récupération des ESATs:', err);
  } finally {
    loadingEsats.value = false;
  }
});

// Réinitialisation du formulaire
const resetForm = () => {
  formData.value = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user_esat',
    esat_id: null,
    is_active: true
  };
  error.value = null;
  passwordError.value = null;
  success.value = false;
};

// Soumission du formulaire
const submitForm = async () => {
  error.value = null;
  passwordError.value = null;
  success.value = false;

  // Validation du mot de passe côté client
  if (!formData.value.password || formData.value.password.length < 8) {
    passwordError.value = 'Le mot de passe doit contenir au moins 8 caractères.';
    return;
  }
  
  submitting.value = true;
  
  try {
    // Nettoyage des données du formulaire
    const cleanedData = { ...formData.value };
    if (cleanedData.esat_id === '') {
      cleanedData.esat_id = null;
    }
    // Conversion de esat_id en nombre si non null
    if (cleanedData.esat_id !== null) {
      cleanedData.esat_id = parseInt(cleanedData.esat_id, 10);
    }
    
    console.log('Données utilisateur à envoyer:', cleanedData);
    
    // Envoi de la requête à l'API
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cleanedData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || 
        `Erreur HTTP: ${response.status} ${response.statusText}`
      );
    }
    
    // Traitement de la réponse
    const data = await response.json();
    console.log('Réponse de création utilisateur:', data);
    
    // Extraction de l'ID utilisateur selon le format de réponse
    if (typeof data === 'object') {
      createdUserId.value = data.id || data.data?.id || null;
    } else {
      createdUserId.value = data;
    }
    
    success.value = true;
    
  } catch (err) {
    error.value = `Erreur lors de la création de l'utilisateur: ${err.message}`;
    console.error('Erreur de création utilisateur:', err);
  } finally {
    submitting.value = false;
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