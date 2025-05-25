<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Modifier l'ESAT</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/esats" class="text-gray-500">ESATs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-pink-600 font-medium">Modifier</span>
        </p>
      </div>
      <div class="flex space-x-2">
        <NuxtLink :to="`/esats/${id}`" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Voir les détails
        </NuxtLink>
        <NuxtLink to="/esats" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Retour à la liste
        </NuxtLink>
      </div>
    </div>
    
    <!-- Card principale -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- En-tête de la card -->
      <div class="flex items-center p-4 border-b border-gray-200">
        <svg class="h-6 w-6 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        <h2 class="text-lg font-semibold text-gray-800">Informations de l'ESAT</h2>
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
      
      <!-- Message de succès -->
      <div v-else-if="success" class="mx-4 my-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <div class="flex items-start">
          <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <div class="flex-1">
            <span class="text-green-700">ESAT mis à jour avec succès !</span>
            <div class="mt-3 flex space-x-3">
              <NuxtLink :to="`/esats/${id}`" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Voir les détails
              </NuxtLink>
              <NuxtLink to="/esats" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
                <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                Retour à la liste
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Formulaire -->
      <form v-else @submit.prevent="submitForm" class="p-6">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200" 
              required
              :disabled="submitting"
            >
          </div>
          
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input 
              type="text" 
              id="address" 
              v-model="formData.address" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              :disabled="submitting"
            >
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input 
                type="text" 
                id="city" 
                v-model="formData.city" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
            
            <div>
              <label for="postal_code" class="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
              <input 
                type="text" 
                id="postal_code" 
                v-model="formData.postal_code" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formData.phone" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
          </div>
        </div>
        
        <!-- Footer du formulaire avec boutons d'action -->
        <div class="mt-8 pt-5 border-t border-gray-200 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="resetForm" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200" 
            :disabled="submitting"
          >
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Réinitialiser
          </button>
          <button 
            type="submit" 
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200" 
            :disabled="submitting"
          >
            <svg v-if="!submitting" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else class="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ submitting ? 'Mise à jour en cours...' : 'Mettre à jour l\'ESAT' }}
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
  name: '',
  address: null,
  city: null,
  postal_code: null,
  email: null,
  phone: null
});

const originalData = ref(null);
const esat = ref(null);
const loading = ref(true);
const submitting = ref(false);
const error = ref(null);
const success = ref(false);

// Fetch ESAT data
onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetch(`/api/esats/${id.value}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ESAT non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', data); // Log pour diagnostic
    
    // Handle if API returns data wrapped in a data property
    esat.value = data.data || data;
    console.log('Extracted ESAT:', esat.value); // Log pour diagnostic
    
    // Initialize form with ESAT data
    formData.value = {
      name: esat.value.name || '',
      address: esat.value.address || null,
      city: esat.value.city || null,
      postal_code: esat.value.postal_code || null,
      email: esat.value.email || null,
      phone: esat.value.phone || null
    };
    
    console.log('Form data initialized:', formData.value); // Log pour diagnostic
    
    // Save original data for reset
    originalData.value = { ...formData.value };
    
  } catch (err) {
    console.error('Erreur lors du chargement de l\'ESAT:', err);
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
    
    // Convertir les chaînes vides en null
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === '') {
        dataToSend[key] = null;
      }
    });
    
    console.log('Données envoyées:', dataToSend);
    
    const response = await fetch(`/api/esats/${id.value}`, {
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
    
    const updateResponse = await response.json();
    console.log('Update response:', updateResponse); // Log pour diagnostic
    
    // Handle if API returns data wrapped in a data property
    esat.value = updateResponse.data || updateResponse;
    console.log('Updated ESAT:', esat.value); // Log pour diagnostic
    
    // Mettre à jour originalData pour la réinitialisation
    originalData.value = { ...formData.value };
    
    success.value = true;
    
    // Redirection après 2 secondes
    setTimeout(() => {
      success.value = false;
    }, 2000);
    
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'ESAT:', err);
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