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
    
    <!-- Formulaire complet -->
    <div v-else-if="worker" class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Édition de {{ worker.first_name }} {{ worker.last_name }}</h2>
          <div class="text-sm text-gray-500">ID: {{ worker.id }}</div>
        </div>
        
        <form @submit.prevent="updateWorker" class="space-y-8">
          <!-- Système d'onglets -->
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px space-x-8">
              <button 
                type="button"
                @click="activeTab = 'personal'"
                :class="[
                  activeTab === 'personal' 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Informations personnelles
              </button>
              <button 
                type="button"
                @click="activeTab = 'professional'"
                :class="[
                  activeTab === 'professional' 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Situation professionnelle
              </button>
              <button 
                type="button"
                @click="activeTab = 'skills'"
                :class="[
                  activeTab === 'skills' 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Compétences
              </button>
              <button 
                type="button"
                @click="activeTab = 'evaluation'"
                :class="[
                  activeTab === 'evaluation' 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Évaluation
              </button>
              <button 
                type="button"
                @click="activeTab = 'projects'"
                :class="[
                  activeTab === 'projects' 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                Projet professionnel
              </button>
            </nav>
          </div>

          <!-- Contenu des onglets -->
          <!-- 1. Informations personnelles -->
          <div v-if="activeTab === 'personal'" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-700 border-b pb-2">Informations personnelles</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input 
                  type="text" 
                  id="first_name" 
                  v-model="formData.first_name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  required
                  :disabled="submitting"
                >
              </div>

              <div>
                <label for="internal_code" class="block text-sm font-medium text-gray-700 mb-1">Code interne</label>
                <input 
                  type="text" 
                  id="internal_code" 
                  v-model="formData.internal_code" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  :disabled="submitting"
                >
              </div>

              <div>
                <label for="birth_date" class="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                <input 
                  type="date" 
                  id="birth_date" 
                  v-model="formData.birth_date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                >
              </div>
              
              <div>
                <label for="contact_info" class="block text-sm font-medium text-gray-700 mb-1">Informations de contact</label>
                <input 
                  type="text" 
                  id="contact_info" 
                  v-model="formData.contact_info" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Email, Téléphone du travailleur ou référent"
                  :disabled="submitting"
                >
              </div>

              <div>
                <label for="esat_id" class="block text-sm font-medium text-gray-700 mb-1">ESAT</label>
                <select 
                  id="esat_id" 
                  v-model="formData.esat_id" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting || loadingEsats"
                >
                  <option :value="null">Sélectionner un ESAT</option>
                  <option v-if="loadingEsats" disabled>Chargement des ESATs...</option>
                  <option v-for="esat in esats" :key="esat.id" :value="esat.id">{{ esat.name }}</option>
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="living_situation" class="block text-sm font-medium text-gray-700 mb-1">Situation de vie</label>
                <textarea 
                  id="living_situation" 
                  v-model="formData.living_situation" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3"
                  :disabled="submitting"
                  placeholder="Décrivez la situation de vie du travailleur"
                ></textarea>
              </div>

              <div>
                <label for="mobility_info" class="block text-sm font-medium text-gray-700 mb-1">Informations de mobilité</label>
                <textarea 
                  id="mobility_info" 
                  v-model="formData.mobility_info" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3"
                  :disabled="submitting"
                  placeholder="Permis, véhicule, transports en commun, etc."
                ></textarea>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="legal_guardian" class="block text-sm font-medium text-gray-700 mb-1">Tuteur légal</label>
                <input 
                  type="text" 
                  id="legal_guardian" 
                  v-model="formData.legal_guardian" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  :disabled="submitting"
                >
              </div>

              <div>
                <label for="emergency_contact" class="block text-sm font-medium text-gray-700 mb-1">Contact d'urgence</label>
                <input 
                  type="text" 
                  id="emergency_contact" 
                  v-model="formData.emergency_contact" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  :disabled="submitting"
                >
              </div>
            </div>

            <div>
              <label for="protection_measure" class="block text-sm font-medium text-gray-700 mb-1">Mesure de protection</label>
              <select 
                id="protection_measure" 
                v-model="formData.protection_measure" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                :disabled="submitting"
              >
                <option :value="null">Sélectionner</option>
                <option value="tutelle">Tutelle</option>
                <option value="curatelle_simple">Curatelle simple</option>
                <option value="curatelle_renforcee">Curatelle renforcée</option>
                <option value="pas_de_mesure">Pas de mesure</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label for="health_info_summary" class="block text-sm font-medium text-gray-700 mb-1">Résumé des informations de santé</label>
              <textarea 
                id="health_info_summary" 
                v-model="formData.health_info_summary" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                rows="4"
                :disabled="submitting"
                placeholder="Informations de santé importantes pour l'accompagnement du travailleur"
              ></textarea>
            </div>
          </div>

          <!-- 2. Situation professionnelle -->
          <div v-if="activeTab === 'professional'" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-700 border-b pb-2">Situation professionnelle</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="entry_date_esat" class="block text-sm font-medium text-gray-700 mb-1">Date d'entrée à l'ESAT</label>
                <input 
                  type="date" 
                  id="entry_date_esat" 
                  v-model="formData.entry_date_esat" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                >
              </div>
              
              <div>
                <label for="work_regime" class="block text-sm font-medium text-gray-700 mb-1">Régime de travail</label>
                <select 
                  id="work_regime" 
                  v-model="formData.work_regime" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                >
                  <option :value="null">Sélectionner</option>
                  <option value="full-time">Temps plein</option>
                  <option value="part-time">Temps partiel</option>
                </select>
              </div>

              <div v-if="formData.work_regime === 'part-time'">
                <label for="part_time_percentage" class="block text-sm font-medium text-gray-700 mb-1">Pourcentage temps partiel</label>
                <div class="relative">
                  <input 
                    type="number" 
                    id="part_time_percentage" 
                    v-model.number="formData.part_time_percentage" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    :disabled="submitting"
                    min="1" 
                    max="99"
                  >
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">%</div>
                </div>
              </div>

              <div>
                <label for="work_hours" class="block text-sm font-medium text-gray-700 mb-1">Horaires de travail</label>
                <input 
                  type="text" 
                  id="work_hours" 
                  v-model="formData.work_hours" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                  placeholder="Ex: 8h-16h du lundi au vendredi"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Secteurs d'activité</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sector_menuiserie" 
                    :value="'menuiserie'" 
                    v-model="activitySectorsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="sector_menuiserie" class="ml-2 block text-sm text-gray-700">Menuiserie</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sector_espaces_verts" 
                    :value="'espaces_verts'" 
                    v-model="activitySectorsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="sector_espaces_verts" class="ml-2 block text-sm text-gray-700">Espaces verts</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sector_conditionnement" 
                    :value="'conditionnement'" 
                    v-model="activitySectorsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="sector_conditionnement" class="ml-2 block text-sm text-gray-700">Conditionnement</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sector_restauration" 
                    :value="'restauration'" 
                    v-model="activitySectorsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="sector_restauration" class="ml-2 block text-sm text-gray-700">Restauration</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sector_blanchisserie" 
                    :value="'blanchisserie'" 
                    v-model="activitySectorsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="sector_blanchisserie" class="ml-2 block text-sm text-gray-700">Blanchisserie</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sector_administratif" 
                    :value="'administratif'" 
                    v-model="activitySectorsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="sector_administratif" class="ml-2 block text-sm text-gray-700">Administratif</label>
                </div>
              </div>
            </div>

            <div>
              <label for="activity_sectors_other" class="block text-sm font-medium text-gray-700 mb-1">Autres secteurs d'activité</label>
              <input 
                type="text" 
                id="activity_sectors_other" 
                v-model="formData.activity_sectors_other" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                :disabled="submitting"
                placeholder="Secteurs non listés ci-dessus"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="educational_background" class="block text-sm font-medium text-gray-700 mb-1">Formation et diplômes</label>
                <textarea 
                  id="educational_background" 
                  v-model="formData.educational_background" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3"
                  :disabled="submitting"
                  placeholder="Diplômes, formations suivies, etc."
                ></textarea>
              </div>

              <div>
                <label for="professional_background_summary" class="block text-sm font-medium text-gray-700 mb-1">Parcours professionnel</label>
                <textarea 
                  id="professional_background_summary" 
                  v-model="formData.professional_background_summary" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3"
                  :disabled="submitting"
                  placeholder="Résumé des expériences professionnelles antérieures"
                ></textarea>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="vigilance_points" class="block text-sm font-medium text-gray-700 mb-1">Points de vigilance</label>
                <textarea 
                  id="vigilance_points" 
                  v-model="formData.vigilance_points" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3"
                  :disabled="submitting"
                  placeholder="Points particuliers à surveiller"
                ></textarea>
              </div>

              <div>
                <label for="vigilance_actions" class="block text-sm font-medium text-gray-700 mb-1">Actions à mettre en place</label>
                <textarea 
                  id="vigilance_actions" 
                  v-model="formData.vigilance_actions" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="3"
                  :disabled="submitting"
                  placeholder="Actions à mettre en place en lien avec les points de vigilance"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- 3. Compétences -->
          <div v-if="activeTab === 'skills'" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-700 border-b pb-2">Compétences</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Orientation spatio-temporelle</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Orientation dans le temps</label>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center">
                      <input 
                        type="radio" 
                        id="time_yes" 
                        :value="true" 
                        v-model="spatialTemporalData.time_orientation" 
                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        :disabled="submitting"
                      >
                      <label for="time_yes" class="ml-2 block text-sm text-gray-700">Oui</label>
                    </div>
                    <div class="flex items-center">
                      <input 
                        type="radio" 
                        id="time_no" 
                        :value="false" 
                        v-model="spatialTemporalData.time_orientation" 
                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        :disabled="submitting"
                      >
                      <label for="time_no" class="ml-2 block text-sm text-gray-700">Non</label>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Orientation dans l'espace</label>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center">
                      <input 
                        type="radio" 
                        id="space_yes" 
                        :value="true" 
                        v-model="spatialTemporalData.space_orientation" 
                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        :disabled="submitting"
                      >
                      <label for="space_yes" class="ml-2 block text-sm text-gray-700">Oui</label>
                    </div>
                    <div class="flex items-center">
                      <input 
                        type="radio" 
                        id="space_no" 
                        :value="false" 
                        v-model="spatialTemporalData.space_orientation" 
                        class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                        :disabled="submitting"
                      >
                      <label for="space_no" class="ml-2 block text-sm text-gray-700">Non</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Compétences en lecture</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="reading_recognize_letters" 
                    value="recognize_letters" 
                    v-model="readingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="reading_recognize_letters" class="ml-2 block text-sm text-gray-700">Reconnaît les lettres</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="reading_recognize_words" 
                    value="recognize_words" 
                    v-model="readingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="reading_recognize_words" class="ml-2 block text-sm text-gray-700">Reconnaît des mots simples</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="reading_read_sentences" 
                    value="can_read_sentences" 
                    v-model="readingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="reading_read_sentences" class="ml-2 block text-sm text-gray-700">Peut lire des phrases simples</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="reading_read_with_comprehension" 
                    value="can_read_with_comprehension" 
                    v-model="readingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="reading_read_with_comprehension" class="ml-2 block text-sm text-gray-700">Lit avec compréhension</label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Compétences en écriture</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="writing_sign_name" 
                    value="can_sign_name" 
                    v-model="writingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="writing_sign_name" class="ml-2 block text-sm text-gray-700">Peut signer son nom</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="writing_copy" 
                    value="can_copy" 
                    v-model="writingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="writing_copy" class="ml-2 block text-sm text-gray-700">Peut copier un texte</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="writing_write_words" 
                    value="can_write_words" 
                    v-model="writingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="writing_write_words" class="ml-2 block text-sm text-gray-700">Peut écrire des mots</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="writing_write_sentences" 
                    value="can_write_sentences" 
                    v-model="writingSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="writing_write_sentences" class="ml-2 block text-sm text-gray-700">Peut écrire des phrases</label>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Compétences en calcul</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="calculation_count" 
                    value="can_count" 
                    v-model="calculationSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="calculation_count" class="ml-2 block text-sm text-gray-700">Sait compter</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="calculation_add" 
                    value="can_add" 
                    v-model="calculationSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="calculation_add" class="ml-2 block text-sm text-gray-700">Sait additionner</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="calculation_subtract" 
                    value="can_subtract" 
                    v-model="calculationSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="calculation_subtract" class="ml-2 block text-sm text-gray-700">Sait soustraire</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="calculation_multiply" 
                    value="can_multiply" 
                    v-model="calculationSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="calculation_multiply" class="ml-2 block text-sm text-gray-700">Sait multiplier</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="calculation_divide" 
                    value="can_divide" 
                    v-model="calculationSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="calculation_divide" class="ml-2 block text-sm text-gray-700">Sait diviser</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="calculation_use_calculator" 
                    value="can_use_calculator" 
                    v-model="calculationSkillsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="calculation_use_calculator" class="ml-2 block text-sm text-gray-700">Utilise une calculatrice</label>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label for="computer_skills" class="block text-sm font-medium text-gray-700 mb-1">Compétences informatiques</label>
                <input 
                  type="text" 
                  id="computer_skills" 
                  v-model="formData.computer_skills" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                  placeholder="Compétences en informatique"
                >
              </div>

              <div>
                <label for="computer_skills_comments" class="block text-sm font-medium text-gray-700 mb-1">Commentaires sur les compétences informatiques</label>
                <textarea 
                  id="computer_skills_comments" 
                  v-model="formData.computer_skills_comments" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="2"
                  :disabled="submitting"
                  placeholder="Précisions sur les compétences informatiques"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- 4. Évaluation -->
          <div v-if="activeTab === 'evaluation'" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-700 border-b pb-2">Évaluation professionnelle</h3>
            
            <div class="space-y-4">
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-2">Aspects professionnels</h4>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                  <div class="grid grid-cols-3 gap-2 mb-2 text-sm font-medium">
                    <div></div>
                    <div class="text-center">Auto-évaluation</div>
                    <div class="text-center">Évaluation moniteur</div>
                  </div>
                  
                  <!-- Initiatives -->
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="text-sm font-medium">Initiatives</div>
                    <div>
                      <select 
                        v-model="professionalEvalData.initiatives.worker" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        v-model="professionalEvalData.initiatives.monitor" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Commentaire initiatives -->
                  <div class="mb-4">
                    <label class="block text-sm text-gray-700 mb-1">Commentaire sur les initiatives</label>
                    <textarea 
                      v-model="professionalEvalData.initiatives.comment" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                      rows="2"
                      :disabled="submitting"
                    ></textarea>
                  </div>
                  
                  <!-- Qualité du travail -->
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="text-sm font-medium">Qualité du travail</div>
                    <div>
                      <select 
                        v-model="professionalEvalData.qualite_travail.worker" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        v-model="professionalEvalData.qualite_travail.monitor" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Commentaire qualité du travail -->
                  <div class="mb-4">
                    <label class="block text-sm text-gray-700 mb-1">Commentaire sur la qualité du travail</label>
                    <textarea 
                      v-model="professionalEvalData.qualite_travail.comment" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                      rows="2"
                      :disabled="submitting"
                    ></textarea>
                  </div>
                  
                  <!-- Compréhension des consignes -->
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="text-sm font-medium">Compréhension des consignes</div>
                    <div>
                      <select 
                        v-model="professionalEvalData.comprehension_consignes.worker" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        v-model="professionalEvalData.comprehension_consignes.monitor" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Commentaire compréhension des consignes -->
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Commentaire sur la compréhension des consignes</label>
                    <textarea 
                      v-model="professionalEvalData.comprehension_consignes.comment" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                      rows="2"
                      :disabled="submitting"
                    ></textarea>
                  </div>
                </div>
                
                <div>
                  <label for="professional_evaluation_comments" class="block text-sm font-medium text-gray-700 mb-1">Commentaires généraux sur les aspects professionnels</label>
                  <textarea 
                    id="professional_evaluation_comments" 
                    v-model="formData.professional_evaluation_comments" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    rows="3"
                    :disabled="submitting"
                    placeholder="Commentaires généraux sur les compétences professionnelles"
                  ></textarea>
                </div>
              </div>
              
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-2">Relations sociales</h4>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                  <div class="grid grid-cols-3 gap-2 mb-2 text-sm font-medium">
                    <div></div>
                    <div class="text-center">Auto-évaluation</div>
                    <div class="text-center">Évaluation moniteur</div>
                  </div>
                  
                  <!-- Esprit d'équipe -->
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="text-sm font-medium">Esprit d'équipe</div>
                    <div>
                      <select 
                        v-model="socialRelationsData.esprit_equipe.worker" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        v-model="socialRelationsData.esprit_equipe.monitor" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Commentaire esprit d'équipe -->
                  <div class="mb-4">
                    <label class="block text-sm text-gray-700 mb-1">Commentaire sur l'esprit d'équipe</label>
                    <textarea 
                      v-model="socialRelationsData.esprit_equipe.comment" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                      rows="2"
                      :disabled="submitting"
                    ></textarea>
                  </div>
                  
                  <!-- Contact avec les collègues -->
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="text-sm font-medium">Contact avec les collègues</div>
                    <div>
                      <select 
                        v-model="socialRelationsData.contact_collegues.worker" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        v-model="socialRelationsData.contact_collegues.monitor" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Commentaire contact avec les collègues -->
                  <div class="mb-4">
                    <label class="block text-sm text-gray-700 mb-1">Commentaire sur le contact avec les collègues</label>
                    <textarea 
                      v-model="socialRelationsData.contact_collegues.comment" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                      rows="2"
                      :disabled="submitting"
                    ></textarea>
                  </div>
                  
                  <!-- Contact avec les moniteurs -->
                  <div class="grid grid-cols-3 gap-2 mb-4">
                    <div class="text-sm font-medium">Contact avec les moniteurs</div>
                    <div>
                      <select 
                        v-model="socialRelationsData.contact_moniteurs.worker" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        v-model="socialRelationsData.contact_moniteurs.monitor" 
                        class="w-full px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        :disabled="submitting"
                      >
                        <option value="poor">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="good">Bon</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- Commentaire contact avec les moniteurs -->
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Commentaire sur le contact avec les moniteurs</label>
                    <textarea 
                      v-model="socialRelationsData.contact_moniteurs.comment" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                      rows="2"
                      :disabled="submitting"
                    ></textarea>
                  </div>
                </div>
                
                <div>
                  <label for="social_relations_comments" class="block text-sm font-medium text-gray-700 mb-1">Commentaires généraux sur les relations sociales</label>
                  <textarea 
                    id="social_relations_comments" 
                    v-model="formData.social_relations_comments" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    rows="3"
                    :disabled="submitting"
                    placeholder="Commentaires généraux sur les relations sociales"
                  ></textarea>
                </div>
              </div>
              
              <div>
                <label for="monitor_assessment" class="block text-sm font-medium text-gray-700 mb-1">Évaluation globale du moniteur</label>
                <textarea 
                  id="monitor_assessment" 
                  v-model="formData.monitor_assessment" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                  rows="4"
                  :disabled="submitting"
                  placeholder="Évaluation globale par le moniteur"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- 5. Projet professionnel -->
          <div v-if="activeTab === 'projects'" class="space-y-6">
            <h3 class="text-lg font-medium text-gray-700 border-b pb-2">Projet professionnel</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div class="flex items-center mb-2">
                  <label for="has_cv" class="block text-sm font-medium text-gray-700">CV disponible</label>
                  <input 
                    type="checkbox" 
                    id="has_cv" 
                    v-model="formData.has_cv" 
                    class="ml-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                </div>
                <div class="flex items-center mb-2">
                  <label for="has_motivation_letter" class="block text-sm font-medium text-gray-700">Lettre de motivation disponible</label>
                  <input 
                    type="checkbox" 
                    id="has_motivation_letter" 
                    v-model="formData.has_motivation_letter" 
                    class="ml-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                </div>
                <div class="flex items-center">
                  <label for="has_cpf_account" class="block text-sm font-medium text-gray-700">Compte CPF actif</label>
                  <input 
                    type="checkbox" 
                    id="has_cpf_account" 
                    v-model="formData.has_cpf_account" 
                    class="ml-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                </div>
              </div>
              
              <div>
                <label for="employer_work_willingness" class="block text-sm font-medium text-gray-700 mb-1">Volonté de travailler en milieu ordinaire</label>
                <select 
                  id="employer_work_willingness" 
                  v-model="formData.employer_work_willingness" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                >
                  <option :value="null">Non renseigné</option>
                  <option value="not_interested">Pas intéressé</option>
                  <option value="interested_with_doubts">Intéressé avec des réserves</option>
                  <option value="very_interested">Très intéressé</option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="desired_job_field" class="block text-sm font-medium text-gray-700 mb-1">Domaine d'emploi souhaité</label>
                <input 
                  type="text" 
                  id="desired_job_field" 
                  v-model="formData.desired_job_field" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                  placeholder="Domaine de travail souhaité"
                >
              </div>
              
              <div>
                <label for="desired_companies" class="block text-sm font-medium text-gray-700 mb-1">Entreprises souhaitées</label>
                <input 
                  type="text" 
                  id="desired_companies" 
                  v-model="formData.desired_companies" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                  placeholder="Entreprises où le travailleur souhaiterait travailler"
                >
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="geographic_mobility" class="block text-sm font-medium text-gray-700 mb-1">Mobilité géographique</label>
                <select 
                  id="geographic_mobility" 
                  v-model="formData.geographic_mobility" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                >
                  <option :value="null">Non renseigné</option>
                  <option value="very_limited">Très limitée (même ville)</option>
                  <option value="less_than_15km">Limitée ( - 15km)</option>
                  <option value="less_than_30km">Moyenne ( - 30km)</option>
                  <option value="more_than_30km">Étendue (+ 30km)</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              
              <div v-if="formData.geographic_mobility === 'other'">
                <label for="geographic_mobility_other" class="block text-sm font-medium text-gray-700 mb-1">Précision sur la mobilité</label>
                <input 
                  type="text" 
                  id="geographic_mobility_other" 
                  v-model="formData.geographic_mobility_other" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                  placeholder="Précisez la mobilité géographique"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Expériences professionnelles en milieu ordinaire</label>
              <div v-for="(exp, index) in professionalExperiencesData" :key="index" class="bg-gray-50 p-4 rounded-lg mb-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div>
                    <label :for="'exp_date_'+index" class="block text-sm text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      :id="'exp_date_'+index" 
                      v-model="exp.date" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      :disabled="submitting"
                    >
                  </div>
                  <div>
                    <label :for="'exp_company_'+index" class="block text-sm text-gray-700 mb-1">Entreprise</label>
                    <input 
                      type="text" 
                      :id="'exp_company_'+index" 
                      v-model="exp.company" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      :disabled="submitting"
                      placeholder="Nom de l'entreprise"
                    >
                  </div>
                </div>
                <div class="mb-2">
                  <label :for="'exp_missions_'+index" class="block text-sm text-gray-700 mb-1">Missions réalisées</label>
                  <textarea 
                    :id="'exp_missions_'+index" 
                    v-model="exp.missions" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    rows="2"
                    :disabled="submitting"
                    placeholder="Description des missions effectuées"
                  ></textarea>
                </div>
                <div class="mb-2">
                  <label :for="'exp_opinion_'+index" class="block text-sm text-gray-700 mb-1">Avis du travailleur</label>
                  <textarea 
                    :id="'exp_opinion_'+index" 
                    v-model="exp.worker_opinion" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                    rows="2"
                    :disabled="submitting"
                    placeholder="Avis du travailleur sur cette expérience"
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <button 
                    type="button" 
                    @click="removeProfessionalExperience(index)"
                    class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    :disabled="submitting"
                  >
                    <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Supprimer
                  </button>
                </div>
              </div>
              <div class="flex justify-center">
                <button 
                  type="button" 
                  @click="addProfessionalExperience"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  :disabled="submitting"
                >
                  <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Ajouter une expérience
                </button>
              </div>
            </div>
            
            <div>
              <label for="exceptional_experiences" class="block text-sm font-medium text-gray-700 mb-1">Expériences exceptionnelles</label>
              <textarea 
                id="exceptional_experiences" 
                v-model="formData.exceptional_experiences" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                rows="3"
                :disabled="submitting"
                placeholder="Expériences professionnelles particulières ou exceptionnelles"
              ></textarea>
            </div>
            
            <div>
              <label for="project_difficulties" class="block text-sm font-medium text-gray-700 mb-1">Difficultés rencontrées</label>
              <textarea 
                id="project_difficulties" 
                v-model="formData.project_difficulties" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                rows="3"
                :disabled="submitting"
                placeholder="Difficultés rencontrées dans le projet professionnel"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="professional_project_clarity" class="block text-sm font-medium text-gray-700 mb-1">Clarté du projet professionnel</label>
                <select 
                  id="professional_project_clarity" 
                  v-model="formData.professional_project_clarity" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                >
                  <option :value="0">0 - Aucune idée</option>
                  <option :value="1">1 - Vague idée</option>
                  <option :value="2">2 - Idée assez claire</option>
                  <option :value="3">3 - Projet très clair</option>
                </select>
              </div>
              
              <div>
                <label for="ordinary_work_capacity" class="block text-sm font-medium text-gray-700 mb-1">Capacité à travailler en milieu ordinaire</label>
                <select 
                  id="ordinary_work_capacity" 
                  v-model="formData.ordinary_work_capacity" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  :disabled="submitting"
                >
                  <option :value="0">0 - Pas possible actuellement</option>
                  <option :value="1">1 - Possible avec accompagnement important</option>
                  <option :value="2">2 - Possible avec accompagnement modéré</option>
                  <option :value="3">3 - Possible avec accompagnement léger</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Prochaines étapes</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="next_step_duoday" 
                    value="duoday" 
                    v-model="nextStepsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="next_step_duoday" class="ml-2 block text-sm text-gray-700">DuoDay</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="next_step_pmsmp" 
                    value="pmsmp" 
                    v-model="nextStepsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="next_step_pmsmp" class="ml-2 block text-sm text-gray-700">PMSMP</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="next_step_stage" 
                    value="stage" 
                    v-model="nextStepsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="next_step_stage" class="ml-2 block text-sm text-gray-700">Stage</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="next_step_formation" 
                    value="formation" 
                    v-model="nextStepsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="next_step_formation" class="ml-2 block text-sm text-gray-700">Formation</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="next_step_mise_disposition" 
                    value="mise_disposition" 
                    v-model="nextStepsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="next_step_mise_disposition" class="ml-2 block text-sm text-gray-700">Mise à disposition</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="next_step_emploi_accompagne" 
                    value="emploi_accompagne" 
                    v-model="nextStepsArray" 
                    class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    :disabled="submitting"
                  >
                  <label for="next_step_emploi_accompagne" class="ml-2 block text-sm text-gray-700">Emploi accompagné</label>
                </div>
              </div>
            </div>
            
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="information_sharing_consent" 
                v-model="formData.information_sharing_consent" 
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                :disabled="submitting"
              >
              <label for="information_sharing_consent" class="ml-2 block text-sm text-gray-700">Consentement au partage d'informations</label>
            </div>
            
            <div>
              <label for="signature_name" class="block text-sm font-medium text-gray-700 mb-1">Nom pour signature</label>
              <input 
                type="text" 
                id="signature_name" 
                v-model="formData.signature_name" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                :disabled="submitting"
                placeholder="Nom et prénom pour la signature"
              >
            </div>
          </div>
          
          <!-- Boutons d'action -->
          <div class="flex justify-end space-x-2 mt-6">
            <button 
              type="button" 
              @click="$router.push(`/workers/${id}`)"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              :disabled="submitting"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              :disabled="submitting"
            >
              <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="!submitting">Enregistrer les modifications</span>
              <span v-else>Enregistrement en cours...</span>
            </button>
          </div>
        </form>
        
        <!-- Message de succès -->
        <div v-if="success" class="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-green-700">Les modifications ont été enregistrées avec succès.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);

// États pour le formulaire
const worker = ref(null);
const loading = ref(true);
const submitting = ref(false);
const error = ref(null);
const success = ref(false);
const formData = ref({
  first_name: '',
  last_name: '',
  birth_date: null,
  contact_info: '',
  internal_code: '',
  esat_id: null,
  entry_date_esat: null,
  work_regime: null,
  part_time_percentage: null,
  work_hours: '',
  activity_sectors: [],
  activity_sectors_other: '',
  living_situation: '',
  mobility_info: '',
  legal_guardian: '',
  emergency_contact: '',
  protection_measure: null,
  health_info_summary: '',
  educational_background: '',
  professional_background_summary: '',
  vigilance_points: '',
  vigilance_actions: '',
  computer_skills: '',
  computer_skills_comments: '',
  professional_evaluation_comments: '',
  social_relations_comments: '',
  monitor_assessment: '',
  has_cv: false,
  has_motivation_letter: false,
  has_cpf_account: false,
  employer_work_willingness: null,
  desired_job_field: '',
  desired_companies: '',
  geographic_mobility: null,
  geographic_mobility_other: '',
  exceptional_experiences: '',
  project_difficulties: '',
  professional_project_clarity: 0,
  ordinary_work_capacity: 0,
  information_sharing_consent: false,
  signature_name: '',
  reading_skills: '',
  writing_skills: '',
  calculation_skills: '',
  next_steps: '',
  professional_evaluation: null,
  social_relations: null,
  spatial_temporal_orientation: null,
  professional_experiences: null
});
const activeTab = ref('personal');
const activitySectorsArray = ref([]);
const spatialTemporalData = ref({
  time_orientation: false,
  space_orientation: false
});
const readingSkillsArray = ref([]);
const writingSkillsArray = ref([]);
const calculationSkillsArray = ref([]);
const nextStepsArray = ref([]);
const professionalEvalData = ref({
  initiatives: {
    worker: 'medium',
    monitor: 'medium',
    comment: ''
  },
  qualite_travail: {
    worker: 'medium',
    monitor: 'medium',
    comment: ''
  },
  comprehension_consignes: {
    worker: 'medium',
    monitor: 'medium',
    comment: ''
  }
});
const socialRelationsData = ref({
  esprit_equipe: {
    worker: 'medium',
    monitor: 'medium',
    comment: ''
  },
  contact_collegues: {
    worker: 'medium',
    monitor: 'medium',
    comment: ''
  },
  contact_moniteurs: {
    worker: 'medium',
    monitor: 'medium',
    comment: ''
  }
});
const professionalExperiencesData = ref([]);

// État pour les ESATs
const esats = ref([]);
const loadingEsats = ref(true);
const esatsError = ref(null);

// Récupérer les données du travailleur
onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;

    // Charger les ESATs
    try {
      const esatsResponse = await fetch('/api/esats');
      if (!esatsResponse.ok) throw new Error(`Erreur HTTP: ${esatsResponse.status}`);
      const esatsData = await esatsResponse.json();
      console.log('Fetched ESATs for worker edit:', esatsData);

      if (esatsData.status === 'success' && Array.isArray(esatsData.data)) {
        esats.value = esatsData.data;
      } else {
        esatsError.value = 'Format de données ESAT inattendu.';
        console.error('Unexpected ESAT data format:', esatsData);
      }
    } catch (err) {
      esatsError.value = `Erreur chargement ESATs: ${err.message}`;
      console.error('Erreur lors du chargement des ESATs:', err);
    } finally {
      loadingEsats.value = false;
    }

    // Charger les données du travailleur
    const response = await fetch(`/api/workers/${route.params.id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Travailleur non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    worker.value = data.data || data;
    console.log('Données du travailleur chargées:', worker.value);
    
    // Copier les données du travailleur dans le formulaire
    for (const [key, value] of Object.entries(worker.value)) {
      if (key in formData.value) {
        formData.value[key] = value;
      }
    }

    // Formater les dates
    if (formData.value.birth_date) {
      formData.value.birth_date = formData.value.birth_date.split('T')[0];
    }
    if (formData.value.entry_date_esat) {
      formData.value.entry_date_esat = formData.value.entry_date_esat.split('T')[0];
    }

    // Initialiser les expériences professionnelles depuis les données du travailleur
    if (worker.value.professional_experiences) {
      try {
        if (typeof worker.value.professional_experiences === 'string') {
          professionalExperiencesData.value = JSON.parse(worker.value.professional_experiences);
        } else if (Array.isArray(worker.value.professional_experiences)) {
          professionalExperiencesData.value = worker.value.professional_experiences;
        }
      } catch (e) {
        console.error('Erreur lors du parsing des expériences professionnelles:', e);
        professionalExperiencesData.value = [];
      }
    } else {
      professionalExperiencesData.value = [];
    }

    parseJsonData();
    console.log('Données du formulaire après chargement:', formData.value);
  } catch (err) {
    console.error('Erreur lors du chargement du travailleur:', err);
    error.value = `Erreur lors du chargement du travailleur: ${err.message}`;
  } finally {
    loading.value = false;
  }
});

// Traiter les champs qui doivent être au format JSON
const jsonFields = [
  'professional_evaluation', 'social_relations', 'spatial_temporal_orientation',
  'professional_experiences', 'declined_applications',
  'professional_project_2_years', 'social_life_project', 'training_project', 
  'employment_insertion_project'
];

// Fonction helper pour s'assurer que le champ est bien au format JSON
const ensureValidJson = (value) => {
  if (value === null || value === undefined) {
    return null;
  }
  
  // Si c'est déjà une chaîne JSON
  if (typeof value === 'string') {
    try {
      // Vérifier si c'est un JSON valide
      JSON.parse(value);
      return value; // Si c'est valide, on le retourne tel quel
    } catch (e) {
      // Si ce n'est pas un JSON valide, essayer de le convertir
      try {
        return JSON.stringify(value);
      } catch (e2) {
        console.error("Impossible de convertir la chaîne en JSON:", e2);
        return null;
      }
    }
  }
  
  // Si c'est un objet, le convertir en JSON
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (e) {
      console.error("Impossible de convertir l'objet en JSON:", e);
      return null;
    }
  }
  
  // Autres cas, mettre à null
  return null;
};

// Mettre à jour le travailleur
const updateWorker = async () => {
  try {
    submitting.value = true;
    success.value = false;
    
    // Créer une copie des données pour éviter de modifier l'original
    const dataToSend = { ...formData.value };
    
    // Supprimer les champs qui pourraient causer des problèmes
    delete dataToSend.id; // L'ID ne doit pas être modifié
    delete dataToSend.created_at; // Ces champs sont gérés par le serveur
    delete dataToSend.updated_at;
    
    // Préparer les données structurées
    const preparedData = prepareStructuredData(dataToSend);
    
    // Traiter les champs JSON
    for (const field of jsonFields) {
      if (field in preparedData && preparedData[field] !== null && preparedData[field] !== undefined) {
        preparedData[field] = ensureValidJson(preparedData[field]);
      }
    }
    
    console.log('Données envoyées:', preparedData);
    
    const response = await fetch(`/api/workers/${id.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur de réponse:', response.status, errorData);
      throw new Error(`Erreur HTTP: ${response.status} - ${errorData.message || response.statusText}`);
    }
    
    // Récupérer les données mises à jour
    const updatedData = await response.json();
    console.log('Données mises à jour:', updatedData);
    
    success.value = true;
    
    // Mettre à jour l'objet worker pour refléter les changements
    worker.value = updatedData;
    
    // Attendre 2 secondes avant de rediriger vers la page de détail
    setTimeout(() => {
      router.push(`/workers/${id.value}`);
    }, 2000);
    
  } catch (err) {
    console.error('Erreur lors de la mise à jour du travailleur:', err);
    error.value = `Erreur lors de la mise à jour du travailleur: ${err.message}`;
  } finally {
    submitting.value = false;
  }
};

// Fonctions pour gérer les expériences professionnelles
function addProfessionalExperience() {
  professionalExperiencesData.value.push({
    date: '',
    company: '',
    missions: '',
    worker_opinion: ''
  });
}

function removeProfessionalExperience(index) {
  professionalExperiencesData.value.splice(index, 1);
}

// Convertir les données JSON en objets lors du chargement
function parseJsonData() {
  // Traiter activity_sectors (JSON ou chaîne séparée par des virgules)
  if (formData.value.activity_sectors) {
    try {
      // Si c'est une chaîne, essayer de la parser comme JSON
      if (typeof formData.value.activity_sectors === 'string') {
        try {
          const sectors = JSON.parse(formData.value.activity_sectors);
          if (Array.isArray(sectors)) {
            activitySectorsArray.value = sectors;
          } else {
            // Si ce n'est pas un tableau, c'est peut-être une chaîne séparée par des virgules
            activitySectorsArray.value = formData.value.activity_sectors.split(',').map(s => s.trim()).filter(s => s);
          }
        } catch (e) {
          // Si ce n'est pas du JSON valide, c'est peut-être une chaîne séparée par des virgules
          activitySectorsArray.value = formData.value.activity_sectors.split(',').map(s => s.trim()).filter(s => s);
        }
      } else if (Array.isArray(formData.value.activity_sectors)) {
        // Si c'est déjà un tableau, l'utiliser directement
        activitySectorsArray.value = formData.value.activity_sectors;
      } else {
        // Cas par défaut
        activitySectorsArray.value = [];
      }
    } catch (e) {
      console.error('Erreur lors du parsing de activity_sectors:', e);
      activitySectorsArray.value = [];
    }
  } else {
    activitySectorsArray.value = [];
  }

  // Traiter les listes séparées par des virgules
  if (formData.value.reading_skills && typeof formData.value.reading_skills === 'string') {
    readingSkillsArray.value = formData.value.reading_skills.split(',').map(s => s.trim()).filter(s => s);
  } else {
    readingSkillsArray.value = [];
  }
  
  if (formData.value.writing_skills && typeof formData.value.writing_skills === 'string') {
    writingSkillsArray.value = formData.value.writing_skills.split(',').map(s => s.trim()).filter(s => s);
  } else {
    writingSkillsArray.value = [];
  }
  
  if (formData.value.calculation_skills && typeof formData.value.calculation_skills === 'string') {
    calculationSkillsArray.value = formData.value.calculation_skills.split(',').map(s => s.trim()).filter(s => s);
  } else {
    calculationSkillsArray.value = [];
  }
  
  if (formData.value.next_steps && typeof formData.value.next_steps === 'string') {
    nextStepsArray.value = formData.value.next_steps.split(',').map(s => s.trim()).filter(s => s);
  } else {
    nextStepsArray.value = [];
  }

  // Traiter les champs JSON complexes
  if (formData.value.spatial_temporal_orientation) {
    try {
      if (typeof formData.value.spatial_temporal_orientation === 'string') {
        spatialTemporalData.value = JSON.parse(formData.value.spatial_temporal_orientation);
      } else if (typeof formData.value.spatial_temporal_orientation === 'object') {
        spatialTemporalData.value = formData.value.spatial_temporal_orientation;
      }
    } catch (e) {
      console.error('Erreur lors du parsing de spatial_temporal_orientation:', e);
    }
  }

  if (formData.value.professional_evaluation) {
    try {
      if (typeof formData.value.professional_evaluation === 'string') {
        professionalEvalData.value = JSON.parse(formData.value.professional_evaluation);
      } else if (typeof formData.value.professional_evaluation === 'object') {
        professionalEvalData.value = formData.value.professional_evaluation;
      }
    } catch (e) {
      console.error('Erreur lors du parsing de professional_evaluation:', e);
    }
  }

  if (formData.value.social_relations) {
    try {
      if (typeof formData.value.social_relations === 'string') {
        socialRelationsData.value = JSON.parse(formData.value.social_relations);
      } else if (typeof formData.value.social_relations === 'object') {
        socialRelationsData.value = formData.value.social_relations;
      }
    } catch (e) {
      console.error('Erreur lors du parsing de social_relations:', e);
    }
  }

  if (formData.value.professional_experiences) {
    try {
      if (typeof formData.value.professional_experiences === 'string') {
        const experiences = JSON.parse(formData.value.professional_experiences);
        if (Array.isArray(experiences)) {
          professionalExperiencesData.value = experiences;
        } else {
          professionalExperiencesData.value = [];
        }
      } else if (Array.isArray(formData.value.professional_experiences)) {
        professionalExperiencesData.value = formData.value.professional_experiences;
      } else {
        professionalExperiencesData.value = [];
      }
    } catch (e) {
      console.error('Erreur lors du parsing de professional_experiences:', e);
      professionalExperiencesData.value = [];
    }
  } else {
    professionalExperiencesData.value = [];
  }
}

// Mettre à jour les champs structurés avant l'envoi
function prepareStructuredData(dataToSend) {
  const prepared = { ...dataToSend };
  
  // Convertir les tableaux en format approprié
  // Pour activity_sectors, on veut un format JSON
  prepared.activity_sectors = activitySectorsArray.value;
  
  // Pour les champs de liste, on veut des chaînes séparées par des virgules
  prepared.reading_skills = readingSkillsArray.value.join(',');
  prepared.writing_skills = writingSkillsArray.value.join(',');
  prepared.calculation_skills = calculationSkillsArray.value.join(',');
  prepared.next_steps = nextStepsArray.value.join(',');

  // Pour les champs JSON, on veut des objets
  prepared.spatial_temporal_orientation = spatialTemporalData.value;
  prepared.professional_evaluation = professionalEvalData.value;
  prepared.social_relations = socialRelationsData.value;
  prepared.professional_experiences = professionalExperiencesData.value;

  // S'assurer que les booléens sont correctement définis
  ['has_cv', 'has_motivation_letter', 'has_cpf_account', 'information_sharing_consent'].forEach(field => {
    if (field in prepared) {
      prepared[field] = Boolean(prepared[field]);
    }
  });

  // S'assurer que les champs numériques sont bien des nombres
  ['part_time_percentage', 'professional_project_clarity', 'ordinary_work_capacity', 'esat_id'].forEach(field => {
    if (field in prepared && prepared[field] !== null && prepared[field] !== undefined && prepared[field] !== '') {
      const num = Number(prepared[field]);
      if (!isNaN(num)) {
        prepared[field] = num;
      }
    }
  });

  return prepared;
}
</script> 