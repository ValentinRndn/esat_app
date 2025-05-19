<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Ajouter un Travailleur</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/workers" class="text-gray-500">Travailleurs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-green-600 font-medium">Ajouter</span>
        </p>
      </div>
      <NuxtLink to="/workers" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Retour à la liste
      </NuxtLink>
    </div>
    
    <!-- Message d'erreur -->
    <div v-if="error" class="mx-4 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-red-700">{{ error }}</span>
      </div>
    </div>
    
    <!-- Message de succès -->
    <div v-if="success" class="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-green-700">Travailleur créé avec succès !</span>
        </div>
        <NuxtLink :to="`/workers/${createdWorkerId}`" class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
          <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          Voir le détail
        </NuxtLink>
      </div>
    </div>
    
    <!-- Formulaire principal -->
    <form v-if="!success" @submit.prevent="submitForm" class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-200">
        <div class="flex items-center">
          <svg class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
          <h2 class="text-lg font-semibold text-gray-800">Informations du nouveau travailleur</h2>
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
            <label for="birth_date" class="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input 
              type="date" 
              id="birth_date" 
              v-model="formData.birth_date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              :disabled="submitting"
            >
          </div>
          
          <div>
            <label for="contact_info" class="block text-sm font-medium text-gray-700 mb-1">Informations de contact</label>
            <input 
              type="text" 
              id="contact_info" 
              v-model="formData.contact_info" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Email, Téléphone du travailleur ou référent"
              :disabled="submitting"
            >
          </div>
        </div>
        
        <!-- Section Informations ESAT -->
        <div>
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                <option v-for="esat in esats" :key="esat.id" :value="esat.id">{{ esat.name }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <div v-if="esatsError" class="mt-1 text-sm text-red-600">{{ esatsError }}</div>
            <div v-if="esatSelectError" class="mt-1 text-sm text-red-600">{{ esatSelectError }}</div>
            <div v-if="loadingEsats" class="mt-1 text-sm text-gray-500 flex items-center">
              <svg class="animate-spin h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Chargement des ESATs...
            </div>
          </div>
          
          <div class="mb-4">
            <label for="internal_code" class="block text-sm font-medium text-gray-700 mb-1">Code interne ESAT</label>
            <input 
              type="text" 
              id="internal_code" 
              v-model="formData.internal_code" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Code interne ESAT si existant"
              :disabled="submitting"
            >
          </div>
          
          <div class="mb-4">
            <label for="entry_date_esat" class="block text-sm font-medium text-gray-700 mb-1">Date d'entrée dans l'ESAT</label>
            <input 
              type="date" 
              id="entry_date_esat" 
              v-model="formData.entry_date_esat" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              :disabled="submitting"
            >
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label for="work_regime" class="block text-sm font-medium text-gray-700 mb-1">Régime de travail</label>
              <div class="relative">
                <select 
                  id="work_regime" 
                  v-model="formData.work_regime" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  :disabled="submitting"
                >
                  <option :value="null">Sélectionner</option>
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
            
            <div v-if="formData.work_regime === 'part-time'">
              <label for="part_time_percentage" class="block text-sm font-medium text-gray-700 mb-1">Pourcentage temps partiel</label>
              <div class="relative">
                <input 
                  type="number" 
                  id="part_time_percentage" 
                  v-model.number="formData.part_time_percentage" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  :disabled="submitting"
                  min="1" 
                  max="99"
                >
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">%</div>
              </div>
            </div>
          </div>
          
          <div>
            <label for="work_hours" class="block text-sm font-medium text-gray-700 mb-1">Horaires de travail</label>
            <input 
              type="text" 
              id="work_hours" 
              v-model="formData.work_hours" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Ex: 10h-15h"
              :disabled="submitting"
            >
          </div>
        </div>
        
        <!-- Section Informations complémentaires -->
        <div>
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Informations complémentaires
          </h3>
          
          <div class="mb-4">
            <label for="living_situation" class="block text-sm font-medium text-gray-700 mb-1">Situation de logement</label>
            <textarea 
              id="living_situation" 
              v-model="formData.living_situation" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Infos logement et vie avec famille/autre (résumé ou stable)"
              :disabled="submitting"
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label for="mobility_info" class="block text-sm font-medium text-gray-700 mb-1">Informations de mobilité</label>
            <textarea 
              id="mobility_info" 
              v-model="formData.mobility_info" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Infos générales sur permis, véhicule, transports en commun (si stable)"
              :disabled="submitting"
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label for="protection_measure" class="block text-sm font-medium text-gray-700 mb-1">Mesure de protection juridique</label>
            <div class="relative">
              <select 
                id="protection_measure" 
                v-model="formData.protection_measure" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
                <option :value="null">Aucune</option>
                <option value="tutelle">Tutelle</option>
                <option value="curatelle_simple">Curatelle simple</option>
                <option value="curatelle_renforcee">Curatelle renforcée</option>
                <option value="pas_de_mesure">Pas de mesure</option>
                <option value="autre">Autre</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="health_info_summary" class="block text-sm font-medium text-gray-700 mb-1">Résumé d'informations santé</label>
            <textarea 
              id="health_info_summary" 
              v-model="formData.health_info_summary" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Résumé infos santé stables, traitement de fond, restrictions générales"
              :disabled="submitting"
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label for="educational_background" class="block text-sm font-medium text-gray-700 mb-1">Parcours scolaire</label>
            <textarea 
              id="educational_background" 
              v-model="formData.educational_background" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Résumé du parcours scolaire et formations initiales"
              :disabled="submitting"
            ></textarea>
          </div>
          
          <div>
            <label for="professional_background_summary" class="block text-sm font-medium text-gray-700 mb-1">Parcours professionnel</label>
            <textarea 
              id="professional_background_summary" 
              v-model="formData.professional_background_summary" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Résumé du parcours professionnel hors ESAT"
              :disabled="submitting"
            ></textarea>
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
          <svg v-else class="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ submitting ? 'Création en cours...' : 'Créer le Travailleur' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const defaultFormData = {
  first_name: '',
  last_name: '',
  birth_date: null,
  contact_info: null,
  esat_id: null,
  internal_code: null,
  entry_date_esat: null,
  work_regime: null,
  part_time_percentage: null,
  work_hours: null,
  living_situation: null,
  mobility_info: null,
  protection_measure: null,
  health_info_summary: null,
  educational_background: null,
  professional_background_summary: null
};

const formData = ref({ ...defaultFormData });
const submitting = ref(false);
const error = ref(null);
const success = ref(false);
const createdWorkerId = ref(null);

const esats = ref([]);
const loadingEsats = ref(true);
const esatsError = ref(null);
const esatSelectError = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/api/esats');
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const fetchedData = await response.json();
    console.log('Fetched ESATs for worker creation:', fetchedData);

    if (fetchedData.status === 'success' && Array.isArray(fetchedData.data)) {
      esats.value = fetchedData.data;
    } else {
      esatsError.value = 'Format de données ESAT inattendu.';
      console.error('Unexpected ESAT data format:', fetchedData);
    }
  } catch (err) {
    esatsError.value = `Erreur chargement ESATs: ${err.message}`;
    console.error(err);
  } finally {
    loadingEsats.value = false;
  }
});

const resetForm = () => {
  formData.value = { ...defaultFormData };
  error.value = null;
  success.value = false;
  esatSelectError.value = null;
};

const submitForm = async () => {
  error.value = null;
  success.value = false;
  esatSelectError.value = null;

  if (formData.value.esat_id === null) {
    esatSelectError.value = 'Veuillez sélectionner un ESAT.';
    return;
  }

  submitting.value = true;
  
  try {
    const cleanedData = { ...formData.value };
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });
    
    cleanedData.esat_id = parseInt(cleanedData.esat_id, 10);
    if (cleanedData.part_time_percentage) {
      cleanedData.part_time_percentage = parseInt(cleanedData.part_time_percentage, 10);
    }

    const response = await fetch('/api/workers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanedData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erreur inconnue' }));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    
    const newWorker = await response.json();
    createdWorkerId.value = newWorker.id || newWorker.data?.id;
    success.value = true;
    
  } catch (err) {
    error.value = `Erreur création travailleur: ${err.message}`;
    console.error(err);
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
</style>