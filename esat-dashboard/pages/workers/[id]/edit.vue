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
        <!-- Navigation par onglets -->
        <div class="mb-4 border-b border-gray-200">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li class="mr-2" v-for="(tab, index) in tabs" :key="index">
              <button 
                type="button"
                @click="activeTab = index"
                :class="[
                  'inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300',
                  activeTab === index 
                    ? 'text-green-600 border-green-600' 
                    : 'text-gray-500 border-transparent'
                ]"
              >
                {{ tab.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Section 1: Informations personnelles -->
        <div v-show="activeTab === 0">
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
          
          <div class="mb-4">
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
          
          <div class="mb-4">
            <label for="legal_guardian" class="block text-sm font-medium text-gray-700 mb-1">Tuteur légal</label>
            <input 
              type="text" 
              id="legal_guardian" 
              v-model="formData.legal_guardian" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Nom et relation du tuteur légal"
              :disabled="submitting"
            >
          </div>
          
          <div>
            <label for="emergency_contact" class="block text-sm font-medium text-gray-700 mb-1">Contact d'urgence</label>
            <input 
              type="text" 
              id="emergency_contact" 
              v-model="formData.emergency_contact" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Nom et téléphone du contact d'urgence"
              :disabled="submitting"
            >
          </div>
        </div>
        
        <!-- Section 2: Informations ESAT -->
        <div v-show="activeTab === 1">
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
        
        <!-- Section 3: Situation personnelle -->
        <div v-show="activeTab === 2">
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Situation personnelle
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
          
          <div>
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
        </div>
        
        <!-- Section 4: Santé et parcours -->
        <div v-show="activeTab === 3">
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Santé et parcours
          </h3>
          
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
          
          <div class="mb-4">
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
          
          <div class="mb-4">
            <label for="vigilance_points" class="block text-sm font-medium text-gray-700 mb-1">Points de vigilance</label>
            <textarea 
              id="vigilance_points" 
              v-model="formData.vigilance_points" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Points d'attention particuliers (santé, comportement, etc.)"
              :disabled="submitting"
            ></textarea>
          </div>
          
          <div>
            <label for="vigilance_actions" class="block text-sm font-medium text-gray-700 mb-1">Actions face aux points de vigilance</label>
            <textarea 
              id="vigilance_actions" 
              v-model="formData.vigilance_actions" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Actions mises en place pour répondre aux points de vigilance"
              :disabled="submitting"
            ></textarea>
          </div>
        </div>
        
        <!-- Section 5: Savoirs de base -->
        <div v-show="activeTab === 4">
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a4.5 4.5 0 00-4.5 4.5c0 1.746 0.726 3.33 1.957 4.583M12 6.253v13m0-13C13.168 5.477 14.754 4.75 16.5 4.75a4.5 4.5 0 014.5 4.5c0 1.746-.726 3.33-1.957 4.583"></path>
            </svg>
            Savoirs de base
          </h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Repères spatio-temporels</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="time_orientation" 
                  v-model="formData.spatial_temporal_orientation.time_orientation" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                  :disabled="submitting"
                >
                <label for="time_orientation" class="ml-2 block text-sm text-gray-700">Orientation temporelle</label>
              </div>
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="space_orientation" 
                  v-model="formData.spatial_temporal_orientation.space_orientation" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                  :disabled="submitting"
                >
                <label for="space_orientation" class="ml-2 block text-sm text-gray-700">Orientation spatiale</label>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Compétences en lecture</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="option in readingOptions" :key="option.value" class="flex items-center">
                <input 
                  type="checkbox" 
                  :id="`reading_${option.value}`" 
                  v-model="selectedReadingSkills" 
                  :value="option.value" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                  :disabled="submitting"
                >
                <label :for="`reading_${option.value}`" class="ml-2 block text-sm text-gray-700">{{ option.label }}</label>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Compétences en écriture</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="option in writingOptions" :key="option.value" class="flex items-center">
                <input 
                  type="checkbox" 
                  :id="`writing_${option.value}`" 
                  v-model="selectedWritingSkills" 
                  :value="option.value" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                  :disabled="submitting"
                >
                <label :for="`writing_${option.value}`" class="ml-2 block text-sm text-gray-700">{{ option.label }}</label>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Compétences en calcul</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="option in calculationOptions" :key="option.value" class="flex items-center">
                <input 
                  type="checkbox" 
                  :id="`calculation_${option.value}`" 
                  v-model="selectedCalculationSkills" 
                  :value="option.value" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                  :disabled="submitting"
                >
                <label :for="`calculation_${option.value}`" class="ml-2 block text-sm text-gray-700">{{ option.label }}</label>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="computer_skills" class="block text-sm font-medium text-gray-700 mb-1">Compétences informatiques</label>
            <input 
              type="text" 
              id="computer_skills" 
              v-model="formData.computer_skills" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Ex: Word, Excel, Internet, etc."
              :disabled="submitting"
            >
          </div>
          
          <div>
            <label for="computer_skills_comments" class="block text-sm font-medium text-gray-700 mb-1">Commentaires sur les compétences informatiques</label>
            <textarea 
              id="computer_skills_comments" 
              v-model="formData.computer_skills_comments" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Commentaires sur les compétences informatiques"
              :disabled="submitting"
            ></textarea>
          </div>
        </div>
        
        <!-- Section 6: Employabilité -->
        <div v-show="activeTab === 5">
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.221-.791-9-2.245M16 6.379a23.897 23.897 0 00-9 0m13 12.379a23.897 23.897 0 01-9 0M9 5a2.25 2.25 0 012.25-2.25h.5a2.25 2.25 0 012.25 2.25m-1.378 1.122c-.462.462-.921.921-1.378 1.378m0 0A12.012 12.012 0 0112 12c.47 0 .934.016 1.392.048m0 0c.555-.555 1.21-.892 1.95-.892m0 0A12.012 12.012 0 0012 9c-.47 0-.934-.016-1.392-.048m0 0c.555.555 1.21.892 1.95.892M6.379 16.379c-.462-.462-.921-.921-1.378-1.378M13 17.254A23.917 23.917 0 0016 15c3.184 0 6.221-.791 9-2.245M3 3.621a23.917 23.917 0 019 0"></path>
            </svg>
            Employabilité
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="has_cv" 
                v-model="formData.has_cv" 
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                :disabled="submitting"
              >
              <label for="has_cv" class="ml-2 block text-sm text-gray-700">CV disponible</label>
            </div>
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="has_motivation_letter" 
                v-model="formData.has_motivation_letter" 
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                :disabled="submitting"
              >
              <label for="has_motivation_letter" class="ml-2 block text-sm text-gray-700">Lettre de motivation disponible</label>
            </div>
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="has_cpf_account" 
                v-model="formData.has_cpf_account" 
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                :disabled="submitting"
              >
              <label for="has_cpf_account" class="ml-2 block text-sm text-gray-700">Compte CPF</label>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="employer_work_willingness" class="block text-sm font-medium text-gray-700 mb-1">Volonté de travailler chez un employeur</label>
            <div class="relative">
              <select 
                id="employer_work_willingness" 
                v-model="formData.employer_work_willingness" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
                <option :value="null">Sélectionner</option>
                <option value="very_interested">Très intéressé</option>
                <option value="interested">Intéressé</option>
                <option value="interested_with_doubts">Intéressé avec des doutes</option>
                <option value="not_interested">Pas intéressé</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="desired_job_field" class="block text-sm font-medium text-gray-700 mb-1">Domaine de métier souhaité</label>
            <input 
              type="text" 
              id="desired_job_field" 
              v-model="formData.desired_job_field" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Ex: Restauration, Jardinage, etc."
              :disabled="submitting"
            >
          </div>
          
          <div class="mb-4">
            <label for="desired_companies" class="block text-sm font-medium text-gray-700 mb-1">Entreprises souhaitées</label>
            <input 
              type="text" 
              id="desired_companies" 
              v-model="formData.desired_companies" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Noms d'entreprises souhaitées si pertinent"
              :disabled="submitting"
            >
          </div>
          
          <div class="mb-4">
            <label for="geographic_mobility" class="block text-sm font-medium text-gray-700 mb-1">Mobilité géographique</label>
            <div class="relative">
              <select 
                id="geographic_mobility" 
                v-model="formData.geographic_mobility" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
                <option :value="null">Sélectionner</option>
                <option value="less_than_10km">Moins de 10 km</option>
                <option value="less_than_30km">Moins de 30 km</option>
                <option value="department">Département</option>
                <option value="france">France entière</option>
                <option value="other">Autre</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div v-if="formData.geographic_mobility === 'other'" class="mb-4">
            <label for="geographic_mobility_other" class="block text-sm font-medium text-gray-700 mb-1">Précisions mobilité</label>
            <input 
              type="text" 
              id="geographic_mobility_other" 
              v-model="formData.geographic_mobility_other" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Préciser la mobilité géographique"
              :disabled="submitting"
            >
          </div>
          
          <div>
            <label for="project_difficulties" class="block text-sm font-medium text-gray-700 mb-1">Difficultés liées au projet</label>
            <textarea 
              id="project_difficulties" 
              v-model="formData.project_difficulties" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Difficultés potentielles pour l'insertion en milieu ordinaire"
              :disabled="submitting"
            ></textarea>
          </div>
        </div>
        
        <!-- Section 7: Évaluation du projet -->
        <div v-show="activeTab === 6">
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Évaluation du projet
          </h3>
          
          <div class="mb-4">
            <label for="professional_project_clarity" class="block text-sm font-medium text-gray-700 mb-1">Clarté du projet professionnel</label>
            <div class="relative">
              <select 
                id="professional_project_clarity" 
                v-model="formData.professional_project_clarity" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
                <option :value="null">Sélectionner</option>
                <option :value="0">0 - Pas de projet professionnel défini</option>
                <option :value="1">1 - Projet peu clair, pas en accord avec les capacités et les compétences</option>
                <option :value="2">2 - Projet assez clair, avec des étapes à réaliser</option>
                <option :value="3">3 - Projet clair et bien en accord avec les compétences et les intérêts</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="ordinary_work_capacity" class="block text-sm font-medium text-gray-700 mb-1">Capacité à travailler en milieu ordinaire</label>
            <div class="relative">
              <select 
                id="ordinary_work_capacity" 
                v-model="formData.ordinary_work_capacity" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                :disabled="submitting"
              >
                <option :value="null">Sélectionner</option>
                <option :value="0">0 - Capacités très limitées, besoin de beaucoup de soutien</option>
                <option :value="1">1 - Capacités présentes, mais besoin d'un soutien moyen</option>
                <option :value="2">2 - Capacités conformes, besoin d'un soutien occasionnel</option>
                <option :value="3">3 - Capacités très solides, presque autonome pour travailler en milieu ordinaire</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label for="monitor_assessment" class="block text-sm font-medium text-gray-700 mb-1">Évaluation du moniteur</label>
            <textarea 
              id="monitor_assessment" 
              v-model="formData.monitor_assessment" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              rows="3"
              placeholder="Synthèse de l'évaluation par le moniteur"
              :disabled="submitting"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Prochaines étapes</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="option in nextStepsOptions" :key="option.value" class="flex items-center">
                <input 
                  type="checkbox" 
                  :id="`next_step_${option.value}`" 
                  v-model="selectedNextSteps" 
                  :value="option.value" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                  :disabled="submitting"
                >
                <label :for="`next_step_${option.value}`" class="ml-2 block text-sm text-gray-700">{{ option.label }}</label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Section 8: Consentements -->
        <div v-show="activeTab === 7">
          <h3 class="flex items-center text-base font-semibold text-gray-800 pb-2 mb-4 border-b border-gray-200">
            <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Consentements
          </h3>
          
          <div class="mb-4">
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="information_sharing_consent" 
                v-model="formData.information_sharing_consent" 
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded transition-colors duration-200"
                :disabled="submitting"
              >
              <label for="information_sharing_consent" class="ml-2 block text-sm text-gray-700">Consentement au partage d'informations</label>
            </div>
            <p class="mt-1 text-xs text-gray-500">
              Le travailleur consent au partage des informations nécessaires à son accompagnement entre les différents intervenants.
            </p>
          </div>
          
          <div>
            <label for="signature_name" class="block text-sm font-medium text-gray-700 mb-1">Signature</label>
            <input 
              type="text" 
              id="signature_name" 
              v-model="formData.signature_name" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              placeholder="Nom et prénom de la personne qui signe"
              :disabled="submitting"
            >
          </div>
        </div>
      </div>
      
      <!-- Footer du formulaire avec boutons d'action -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div class="flex gap-2">
          <button 
            type="button" 
            @click="previousTab" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" 
            :disabled="activeTab === 0 || submitting"
          >
            <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Précédent
          </button>
          <button 
            type="button" 
            @click="nextTab" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" 
            :disabled="activeTab === tabs.length - 1 || submitting"
          >
            Suivant
            <svg class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div class="flex gap-2">
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
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

// Configuration des onglets
const tabs = [
  { label: 'Informations personnelles' },
  { label: 'Informations ESAT' },
  { label: 'Situation personnelle' },
  { label: 'Santé et parcours' },
  { label: 'Savoirs de base' },
  { label: 'Employabilité' },
  { label: 'Évaluation du projet' },
  { label: 'Consentements' }
];
const activeTab = ref(0);

const nextTab = () => {
  if (activeTab.value < tabs.length - 1) {
    activeTab.value++;
  }
};

const previousTab = () => {
  if (activeTab.value > 0) {
    activeTab.value--;
  }
};

// Options pour les compétences et prochaines étapes
const readingOptions = [
  { value: 'can_read_letters', label: 'Lecture des lettres' },
  { value: 'can_read_words', label: 'Lecture des mots' },
  { value: 'can_read_sentences', label: 'Lecture de phrases' },
  { value: 'can_read_with_comprehension', label: 'Lecture avec compréhension' }
];

const writingOptions = [
  { value: 'can_copy', label: 'Copie de texte' },
  { value: 'can_write_letters', label: 'Écriture de lettres' },
  { value: 'can_write_words', label: 'Écriture de mots' },
  { value: 'can_write_sentences', label: 'Écriture de phrases' }
];

const calculationOptions = [
  { value: 'can_count', label: 'Comptage' },
  { value: 'can_add', label: 'Addition' },
  { value: 'can_subtract', label: 'Soustraction' },
  { value: 'can_multiply', label: 'Multiplication' },
  { value: 'can_divide', label: 'Division' },
  { value: 'can_solve_problems', label: 'Résolution de problèmes' }
];

const nextStepsOptions = [
  { value: 'duoday', label: 'DuoDay' },
  { value: 'pmsmp', label: 'PMSMP' },
  { value: 'prestation', label: 'Prestation' },
  { value: 'double_activity', label: 'Double activité' },
  { value: 'full_time', label: 'Temps complet' }
];

// Variables pour les compétences et prochaines étapes
const selectedReadingSkills = ref([]);
const selectedWritingSkills = ref([]);
const selectedCalculationSkills = ref([]);
const selectedNextSteps = ref([]);

// État de base du formulaire
const defaultFormData = {
  first_name: '',
  last_name: '',
  birth_date: '',
  contact_info: '',
  legal_guardian: '',
  emergency_contact: '',
  esat_id: null,
  internal_code: '',
  entry_date_esat: '',
  work_regime: 'full-time',
  part_time_percentage: null,
  work_hours: '',
  living_situation: '',
  mobility_info: '',
  protection_measure: null,
  health_info_summary: '',
  educational_background: '',
  professional_background_summary: '',
  vigilance_points: '',
  vigilance_actions: '',
  spatial_temporal_orientation: {
    time_orientation: false,
    space_orientation: false
  },
  computer_skills: '',
  computer_skills_comments: '',
  has_cv: false,
  has_motivation_letter: false,
  has_cpf_account: false,
  employer_work_willingness: null,
  desired_job_field: '',
  desired_companies: '',
  geographic_mobility: null,
  geographic_mobility_other: '',
  project_difficulties: '',
  professional_project_clarity: null,
  ordinary_work_capacity: null,
  monitor_assessment: '',
  next_steps: '',
  information_sharing_consent: false,
  signature_name: ''
};

const formData = ref({ ...defaultFormData });
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

// Parse string values to appropriate types
const parseJsonField = (field) => {
  if (!field) return null;
  try {
    return typeof field === 'string' ? JSON.parse(field) : field;
  } catch (e) {
    console.error(`Error parsing JSON field: ${e}`);
    return null;
  }
};

// Convertir les sélections en chaînes pour le formData
watch(selectedReadingSkills, (newVal) => {
  formData.value.reading_skills = newVal.join(',');
});

watch(selectedWritingSkills, (newVal) => {
  formData.value.writing_skills = newVal.join(',');
});

watch(selectedCalculationSkills, (newVal) => {
  formData.value.calculation_skills = newVal.join(',');
});

watch(selectedNextSteps, (newVal) => {
  formData.value.next_steps = newVal.join(',');
});

// Load worker and ESATs data
onMounted(async () => {
  try {
    // Load ESATs
    const esatsResponse = await fetch('/api/esats');
    if (!esatsResponse.ok) {
      throw new Error(`Erreur HTTP (ESATs): ${esatsResponse.status}`);
    }
    const esatsData = await esatsResponse.json();
    
    // Check if data is wrapped in a 'data' property
    if (esatsData.data && Array.isArray(esatsData.data)) {
      esats.value = esatsData.data;
    } else if (Array.isArray(esatsData)) {
      esats.value = esatsData;
    } else {
      throw new Error('Format de données ESAT inattendu');
    }
    
    // Load worker
    const workerResponse = await fetch(`/api/workers/${id.value}`);
    if (!workerResponse.ok) {
      if (workerResponse.status === 404) throw new Error('Travailleur non trouvé');
      throw new Error(`Erreur HTTP (travailleur): ${workerResponse.status}`);
    }
    
    const workerData = await workerResponse.json();
    
    // Check if worker data is wrapped in a 'data' property
    worker.value = workerData.data || workerData;
    
    // Parse spatial_temporal_orientation JSON
    let spatialTemporalOrientation = { time_orientation: false, space_orientation: false };
    try {
      const parsedOrientation = parseJsonField(worker.value.spatial_temporal_orientation);
      if (parsedOrientation) {
        spatialTemporalOrientation = {
          time_orientation: parsedOrientation.time_orientation === 'yes',
          space_orientation: parsedOrientation.space_orientation === 'yes'
        };
      }
    } catch (e) {
      console.error('Error parsing spatial temporal orientation:', e);
    }
    
    // Parse skills from comma-separated strings
    if (worker.value.reading_skills) {
      selectedReadingSkills.value = worker.value.reading_skills.split(',').map(s => s.trim());
    }
    
    if (worker.value.writing_skills) {
      selectedWritingSkills.value = worker.value.writing_skills.split(',').map(s => s.trim());
    }
    
    if (worker.value.calculation_skills) {
      selectedCalculationSkills.value = worker.value.calculation_skills.split(',').map(s => s.trim());
    }
    
    if (worker.value.next_steps) {
      selectedNextSteps.value = worker.value.next_steps.split(',').map(s => s.trim());
    }
    
    // Initialize form data from worker data
    formData.value = {
      first_name: worker.value.first_name || '',
      last_name: worker.value.last_name || '',
      birth_date: formatDateForInput(worker.value.birth_date),
      contact_info: worker.value.contact_info || '',
      legal_guardian: worker.value.legal_guardian || '',
      emergency_contact: worker.value.emergency_contact || '',
      esat_id: worker.value.esat_id,
      internal_code: worker.value.internal_code || '',
      entry_date_esat: formatDateForInput(worker.value.entry_date_esat),
      work_regime: worker.value.work_regime || 'full-time',
      part_time_percentage: worker.value.part_time_percentage,
      work_hours: worker.value.work_hours || '',
      living_situation: worker.value.living_situation || '',
      mobility_info: worker.value.mobility_info || '',
      protection_measure: worker.value.protection_measure,
      health_info_summary: worker.value.health_info_summary || '',
      educational_background: worker.value.educational_background || '',
      professional_background_summary: worker.value.professional_background_summary || '',
      vigilance_points: worker.value.vigilance_points || '',
      vigilance_actions: worker.value.vigilance_actions || '',
      spatial_temporal_orientation: spatialTemporalOrientation,
      computer_skills: worker.value.computer_skills || '',
      computer_skills_comments: worker.value.computer_skills_comments || '',
      has_cv: !!worker.value.has_cv,
      has_motivation_letter: !!worker.value.has_motivation_letter,
      has_cpf_account: !!worker.value.has_cpf_account,
      employer_work_willingness: worker.value.employer_work_willingness,
      desired_job_field: worker.value.desired_job_field || '',
      desired_companies: worker.value.desired_companies || '',
      geographic_mobility: worker.value.geographic_mobility,
      geographic_mobility_other: worker.value.geographic_mobility_other || '',
      project_difficulties: worker.value.project_difficulties || '',
      professional_project_clarity: worker.value.professional_project_clarity,
      ordinary_work_capacity: worker.value.ordinary_work_capacity,
      monitor_assessment: worker.value.monitor_assessment || '',
      information_sharing_consent: !!worker.value.information_sharing_consent,
      signature_name: worker.value.signature_name || ''
    };
    
    originalData.value = { ...formData.value };
    
    console.log('Worker data loaded:', worker.value);
    console.log('Form data initialized:', formData.value);
  } catch (err) {
    error.value = `Erreur chargement données: ${err.message}`;
    console.error('Error loading data:', err);
  } finally {
    loading.value = false;
    loadingEsats.value = false;
  }
});

// Reset form to original values
const resetForm = () => {
  if (originalData.value) {
    formData.value = { ...originalData.value };
    
    // Reset checkbox groups
    if (worker.value.reading_skills) {
      selectedReadingSkills.value = worker.value.reading_skills.split(',').map(s => s.trim());
    } else {
      selectedReadingSkills.value = [];
    }
    
    if (worker.value.writing_skills) {
      selectedWritingSkills.value = worker.value.writing_skills.split(',').map(s => s.trim());
    } else {
      selectedWritingSkills.value = [];
    }
    
    if (worker.value.calculation_skills) {
      selectedCalculationSkills.value = worker.value.calculation_skills.split(',').map(s => s.trim());
    } else {
      selectedCalculationSkills.value = [];
    }
    
    if (worker.value.next_steps) {
      selectedNextSteps.value = worker.value.next_steps.split(',').map(s => s.trim());
    } else {
      selectedNextSteps.value = [];
    }
  }
  error.value = null;
  success.value = false;
};

// Submit form
const submitForm = async () => {
  error.value = null;
  submitting.value = true;
  success.value = false;
  
  try {
    const cleanedData = { ...formData.value };
    
    // Clean up empty values
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });
    
    // Ensure esat_id is a number
    if (cleanedData.esat_id !== null) {
      cleanedData.esat_id = parseInt(cleanedData.esat_id, 10);
    }
    
    // Ensure part_time_percentage is a number
    if (cleanedData.part_time_percentage) {
      cleanedData.part_time_percentage = parseInt(cleanedData.part_time_percentage, 10);
    }
    
    // Ensure professional_project_clarity and ordinary_work_capacity are numbers
    if (cleanedData.professional_project_clarity !== null) {
      cleanedData.professional_project_clarity = parseInt(cleanedData.professional_project_clarity, 10);
    }
    
    if (cleanedData.ordinary_work_capacity !== null) {
      cleanedData.ordinary_work_capacity = parseInt(cleanedData.ordinary_work_capacity, 10);
    }
    
    // Convert spatial_temporal_orientation to the expected format
    cleanedData.spatial_temporal_orientation = JSON.stringify({
      time_orientation: cleanedData.spatial_temporal_orientation.time_orientation ? 'yes' : 'no',
      space_orientation: cleanedData.spatial_temporal_orientation.space_orientation ? 'yes' : 'no'
    });
    
    console.log('Submitting data:', cleanedData);
    
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
    worker.value = updatedWorker.data || updatedWorker;
    originalData.value = { ...formData.value }; // Update original data to current form state
    success.value = true;
    
    console.log('Worker updated successfully:', worker.value);
  } catch (err) {
    error.value = `Erreur mise à jour travailleur: ${err.message}`;
    console.error('Error updating worker:', err);
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>