<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Modifier le Travailleur</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/workers" class="text-gray-500">Travailleurs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-green-600 font-medium">Modifier</span>
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <NuxtLink :to="`/workers/${id}`" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Voir les détails
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
    
    <!-- Message de succès -->
    <div v-else-if="success" class="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div class="flex-1">
          <span class="text-green-700">Travailleur mis à jour avec succès !</span>
          <div class="mt-3 flex space-x-3">
            <NuxtLink :to="`/workers/${id}`" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Voir les détails
            </NuxtLink>
            <NuxtLink to="/workers" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
              <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              Retour à la liste
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Formulaire principal -->
    <form v-else @submit.prevent="submitForm" class="bg-white rounded-lg shadow overflow-hidden">
      <!-- En-tête de la card -->
      <div class="px-6 py-5 border-b border-gray-200">
        <div class="flex items-center">
          <svg class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          <h2 class="text-lg font-semibold text-gray-800">Modifier les informations du travailleur</h2>
        </div>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Section Informations personnelles -->
        <div>
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Informations personnelles
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
              <input 
                type="text" 
                id="first_name" 
                v-model="formData.first_name" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200" 
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
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200" 
                required
                :disabled="submitting"
              >
            </div>
          </div>
          
          <div class="mb-4">
            <label for="birth_date" class="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
            <input 
              type="date" 
              id="birth_date" 
              v-model="formData.birth_date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              required
              :disabled="submitting"
            >
          </div>
          
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input 
              type="text" 
              id="address" 
              v-model="formData.address" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              :disabled="submitting"
            >
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
              <input 
                type="text" 
                id="city" 
                v-model="formData.city" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
            
            <div>
              <label for="postal_code" class="block text-sm font-medium text-gray-700 mb-1">Code Postal</label>
              <input 
                type="text" 
                id="postal_code" 
                v-model="formData.postal_code" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formData.phone" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
            
            <div>
              <label for="social_security_number" class="block text-sm font-medium text-gray-700 mb-1">N° Sécurité Sociale</label>
              <input 
                type="text" 
                id="social_security_number" 
                v-model="formData.social_security_number" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
          </div>
        </div>
        
        <!-- Section Informations ESAT -->
        <div>
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            Informations ESAT
          </h3>
          
          <div class="mb-4">
            <label for="esat_id" class="block text-sm font-medium text-gray-700 mb-1">ESAT *</label>
            <div class="relative">
              <select 
                id="esat_id" 
                v-model="formData.esat_id" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                required
                :disabled="submitting || loadingEsats"
              >
                <option :value="null" disabled>Sélectionnez un ESAT</option>
                <option v-if="loadingEsats" disabled>Chargement des ESATs...</option>
                <option v-for="esatOption in esats" :key="esatOption.id" :value="esatOption.id">{{ esatOption.name }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <div v-if="esatsError" class="mt-1 text-sm text-red-600">{{ esatsError }}</div>
            <div v-if="loadingEsats" class="mt-1 text-sm text-gray-500 flex items-center">
              <svg class="animate-spin h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Chargement des ESATs...
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="admission_date" class="block text-sm font-medium text-gray-700 mb-1">Date d'admission *</label>
              <input 
                type="date" 
                id="admission_date" 
                v-model="formData.admission_date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                required
                :disabled="submitting"
              >
            </div>
            
            <div>
              <label for="departure_date" class="block text-sm font-medium text-gray-700 mb-1">Date de départ (Optionnel)</label>
              <input 
                type="date" 
                id="departure_date" 
                v-model="formData.departure_date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="work_regime" class="block text-sm font-medium text-gray-700 mb-1">Régime de travail *</label>
              <div class="relative">
                <select 
                  id="work_regime" 
                  v-model="formData.work_regime" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  required
                  :disabled="submitting"
                >
                  <option value="full-time">Temps plein</option>
                  <option value="part-time">Temps partiel</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label for="protection_measure" class="block text-sm font-medium text-gray-700 mb-1">Mesure de protection (Optionnel)</label>
              <div class="relative">
                <select 
                  id="protection_measure" 
                  v-model="formData.protection_measure" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  :disabled="submitting"
                >
                  <option :value="null">Aucune</option>
                  <option value="guardianship">Tutelle</option>
                  <option value="curatorship">Curatelle</option>
                  <option value="safeguard_justice">Sauvegarde de justice</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label for="guardian_contact" class="block text-sm font-medium text-gray-700 mb-1">Contact Tuteur/Curateur (Optionnel)</label>
            <input 
              type="text" 
              id="guardian_contact" 
              v-model="formData.guardian_contact" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Nom, téléphone, email du tuteur/curateur"
              :disabled="submitting"
            >
          </div>
        </div>
      </div>
      
      <!-- Footer du formulaire avec boutons d'action -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
        <button 
          type="button" 
          @click="resetForm" 
          class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" 
          :disabled="submitting"
        >
          <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Réinitialiser
        </button>
        <button 
          type="submit" 
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" 
          :disabled="submitting"
        >
          <svg v-if="!submitting" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ submitting ? 'Mise à jour en cours...' : 'Mettre à jour le Travailleur' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

const formData = ref({
  first_name: '',
  last_name: '',
  birth_date: '',
  address: null,
  city: null,
  postal_code: null,
  phone: null,
  social_security_number: null,
  esat_id: null,
  admission_date: '',
  departure_date: null,
  work_regime: 'full-time',
  protection_measure: null,
  guardian_contact: null
});

const originalData = ref(null);
const worker = ref(null); 
const loading = ref(true);
const submitting = ref(false);
const error = ref(null);
const success = ref(false);

const esats = ref([]);
const loadingEsats = ref(true);
const esatsError = ref(null);

// Helper to format date for input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

onMounted(async () => {
  try {
    const workerResponse = await fetch(`/api/workers/${id.value}`);
    if (!workerResponse.ok) {
      if (workerResponse.status === 404) throw new Error('Travailleur non trouvé');
      throw new Error(`Erreur HTTP (travailleur): ${workerResponse.status}`);
    }
    worker.value = await workerResponse.json();
    
    formData.value = {
      first_name: worker.value.first_name,
      last_name: worker.value.last_name,
      birth_date: formatDateForInput(worker.value.birth_date),
      address: worker.value.address,
      city: worker.value.city,
      postal_code: worker.value.postal_code,
      phone: worker.value.phone,
      social_security_number: worker.value.social_security_number,
      esat_id: worker.value.esat_id,
      admission_date: formatDateForInput(worker.value.admission_date),
      departure_date: worker.value.departure_date ? formatDateForInput(worker.value.departure_date) : null,
      work_regime: worker.value.work_regime,
      protection_measure: worker.value.protection_measure,
      guardian_contact: worker.value.guardian_contact
    };
    originalData.value = { ...formData.value };

    const esatsResponse = await fetch('/api/esats');
    if (!esatsResponse.ok) {
      throw new Error(`Erreur HTTP (ESATs): ${esatsResponse.status}`);
    }
    esats.value = await esatsResponse.json();

  } catch (err) {
    error.value = `Erreur chargement données: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
    loadingEsats.value = false;
  }
});

const resetForm = () => {
  if (originalData.value) {
    formData.value = { ...originalData.value };
  }
  error.value = null;
  success.value = false;
};

const submitForm = async () => {
  error.value = null;
  submitting.value = true;
  success.value = false;
  
  try {
    const cleanedData = { ...formData.value };
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });
    if (cleanedData.esat_id !== null) {
      cleanedData.esat_id = parseInt(cleanedData.esat_id, 10);
    }
    // Ensure date fields are correctly formatted or null
    if (cleanedData.birth_date === '') cleanedData.birth_date = null;
    if (cleanedData.admission_date === '') cleanedData.admission_date = null;
    if (cleanedData.departure_date === '') cleanedData.departure_date = null;

    const response = await fetch(`/api/workers/${id.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanedData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    
    const updatedWorker = await response.json();
    worker.value = updatedWorker;
    originalData.value = { ...formData.value }; // Update original data to current form state
    success.value = true;
    
  } catch (err) {
    error.value = `Erreur mise à jour travailleur: ${err.message}`;
    console.error(err);
  } finally {
    submitting.value = false;
  }
};
</script>