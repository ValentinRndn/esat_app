<template>
  <div class="w-full">
    <!-- En-tête de la page -->
    <div class="flex flex-col md:flex-row justify-between items-start mb-6">
      <div class="mb-4 md:mb-0">
        <h1 class="text-2xl font-semibold text-gray-800 mb-2">Détails du Travailleur</h1>
        <p class="text-sm text-gray-500 flex items-center">
          <span>Dashboard</span>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <NuxtLink to="/workers" class="text-gray-500">Travailleurs</NuxtLink>
          <svg class="h-3 w-3 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="text-green-600 font-medium">Détails</span>
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-2">
        <!-- Bouton Suggérer des métiers et Modifier -->
        <button 
          @click="suggestJobs" 
          class="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          :disabled="loadingSuggestions"
        >
          <svg v-if="!loadingSuggestions" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <svg v-else class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loadingSuggestions ? 'Suggestions en cours...' : 'Suggérer des métiers (IA)' }}
        </button>
        <NuxtLink :to="`/workers/edit/${id}`" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
          <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Modifier
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
    
    <!-- Contenu principal -->
    <div v-else>
      <!-- Informations du travailleur -->
      <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <!-- En-tête de la card avec identité du travailleur -->
        <div class="flex items-center p-4 border-b border-gray-200 bg-green-50">
          <svg class="h-8 w-8 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <div>
            <h2 class="text-xl font-semibold text-gray-800">
              {{ worker.first_name }} {{ worker.last_name }}
            </h2>
            <div class="text-sm text-gray-500 mt-1">
              Régime: 
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ formatWorkRegime(worker.work_regime) }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Section Informations personnelles -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Informations personnelles
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">ID</p>
              <p class="text-gray-900">
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">#{{ worker.id }}</span>
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Prénom</p>
              <p class="text-gray-900">{{ worker.first_name }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Nom</p>
              <p class="text-gray-900">{{ worker.last_name }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Date de naissance</p>
              <p class="text-gray-900">{{ formatDate(worker.birth_date) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Informations de contact</p>
              <p class="text-gray-900">{{ worker.contact_info || 'Non spécifiées' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Code interne ESAT</p>
              <p class="text-gray-900">{{ worker.internal_code || 'Non spécifié' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Section Informations ESAT -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-pink-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            Informations ESAT
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">ESAT</p>
              <p class="text-gray-900">
                <NuxtLink 
                  v-if="worker.esat_id" 
                  :to="`/esats/${worker.esat_id}`" 
                  class="text-pink-600 hover:text-pink-800 hover:underline flex items-center"
                >
                  <svg class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Voir l'ESAT (ID: {{ worker.esat_id }})
                </NuxtLink>
                <span v-else class="text-gray-500">Non assigné</span>
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Date d'entrée dans l'ESAT</p>
              <p class="text-gray-900">{{ formatDate(worker.entry_date_esat) }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Régime de travail</p>
              <p class="text-gray-900">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ formatWorkRegime(worker.work_regime) }}
                </span>
              </p>
            </div>
            <div v-if="worker.work_regime === 'part-time'">
              <p class="text-sm font-medium text-gray-500 mb-1">Pourcentage temps partiel</p>
              <p class="text-gray-900">{{ worker.part_time_percentage ? `${worker.part_time_percentage}%` : 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Horaires de travail</p>
              <p class="text-gray-900">{{ worker.work_hours || 'Non spécifiés' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Section Situation personnelle -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Situation personnelle
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Situation de logement</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.living_situation || 'Non spécifiée' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Informations de mobilité</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.mobility_info || 'Non spécifiées' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Mesure de protection juridique</p>
              <p class="text-gray-900">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {{ formatProtectionMeasure(worker.protection_measure) }}
                </span>
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Tuteur légal</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.legal_guardian || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Contact d'urgence</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.emergency_contact || 'Non spécifié' }}</p>
            </div>
          </div>
        </div>

        <!-- Section Santé et parcours -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Santé et parcours
          </h3>
          
          <div class="grid grid-cols-1 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Résumé d'informations santé</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.health_info_summary || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Parcours scolaire</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.educational_background || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Parcours professionnel</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.professional_background_summary || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Points de vigilance</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.vigilance_points || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Actions face aux points de vigilance</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.vigilance_actions || 'Non spécifié' }}</p>
            </div>
          </div>
        </div>

  <!-- Section Savoirs de base -->
  <div class="p-5 border-b border-gray-200">
    <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
      <svg class="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a4.5 4.5 0 00-4.5 4.5c0 1.746 0.726 3.33 1.957 4.583M12 6.253v13m0-13C13.168 5.477 14.754 4.75 16.5 4.75a4.5 4.5 0 014.5 4.5c0 1.746-.726 3.33-1.957 4.583"></path>
      </svg>
      Savoirs de base
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Repères spatio-temporels</p>
        <div v-if="parsedSpatialTemporalOrientation" class="mt-2">
          <div class="flex flex-wrap gap-2">
            <span v-if="parsedSpatialTemporalOrientation.time_orientation === 'yes'" 
                  class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
              Orientation temporelle
            </span>
            <span v-if="parsedSpatialTemporalOrientation.space_orientation === 'yes'" 
                  class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
              Orientation spatiale
            </span>
          </div>
        </div>
        <p v-else class="text-gray-900">Non spécifié</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Compétences en lecture</p>
        <div v-if="worker.reading_skills" class="flex flex-wrap gap-2 mt-1">
          <span v-for="skill in formatCommaSeparatedField(worker.reading_skills)" 
                :key="skill" 
                class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
            {{ formatSkillName(skill) }}
          </span>
        </div>
        <p v-else class="text-gray-900">Non spécifié</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Compétences en écriture</p>
        <div v-if="worker.writing_skills" class="flex flex-wrap gap-2 mt-1">
          <span v-for="skill in formatCommaSeparatedField(worker.writing_skills)" 
                :key="skill" 
                class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
            {{ formatSkillName(skill) }}
          </span>
        </div>
        <p v-else class="text-gray-900">Non spécifié</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Compétences en calcul</p>
        <div v-if="worker.calculation_skills" class="flex flex-wrap gap-2 mt-1">
          <span v-for="skill in formatCommaSeparatedField(worker.calculation_skills)" 
                :key="skill" 
                class="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
            {{ formatSkillName(skill) }}
          </span>
        </div>
        <p v-else class="text-gray-900">Non spécifié</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Compétences informatiques</p>
        <p class="text-gray-900 whitespace-pre-line">{{ worker.computer_skills || 'Non spécifié' }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Commentaires sur les compétences informatiques</p>
        <p class="text-gray-900 whitespace-pre-line">{{ worker.computer_skills_comments || 'Non spécifié' }}</p>
      </div>
    </div>
  </div>

  <!-- Section Évaluations professionnelles -->
  <div class="p-5 border-b border-gray-200">
    <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
      <svg class="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0m5-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m6 0a2 2 0 100-4m-12 4c.001-1.002.166-1.962.485-2.863a9 9 0 1011.215 0c.319.901.484 1.861.485 2.863m-1.5 1.5a3 3 0 11-6 0m6 0v6"></path>
      </svg>
      Évaluations professionnelles
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Évaluation professionnelle</p>
        <div v-if="parsedProfessionalEvaluation" class="space-y-3 mt-2">
          <div v-for="(value, key) in parsedProfessionalEvaluation" :key="key" class="bg-gray-50 p-3 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="font-medium text-gray-700">{{ formatEvaluationKey(key) }}</span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">Travailleur:</span>
                <span :class="`px-2 py-0.5 rounded-full text-xs font-medium ${getRatingClass(value.worker)}`">
                  {{ formatRating(value.worker) }}
                </span>
                <span class="text-xs text-gray-500 ml-2">Moniteur:</span>
                <span :class="`px-2 py-0.5 rounded-full text-xs font-medium ${getRatingClass(value.monitor)}`">
                  {{ formatRating(value.monitor) }}
                </span>
              </div>
            </div>
            <p v-if="value.comment" class="text-sm text-gray-600 italic">{{ value.comment }}</p>
          </div>
        </div>
        <p v-else class="text-gray-500 italic">Non spécifié</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Commentaires sur l'évaluation professionnelle</p>
        <p class="text-gray-900 whitespace-pre-line">{{ worker.professional_evaluation_comments || 'Non spécifié' }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Relations sociales</p>
        <div v-if="parsedSocialRelations" class="space-y-3 mt-2">
          <div v-for="(value, key) in parsedSocialRelations" :key="key" class="bg-gray-50 p-3 rounded-lg">
            <div class="flex items-center justify-between mb-1">
              <span class="font-medium text-gray-700">{{ formatEvaluationKey(key) }}</span>
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">Travailleur:</span>
                <span :class="`px-2 py-0.5 rounded-full text-xs font-medium ${getRatingClass(value.worker)}`">
                  {{ formatRating(value.worker) }}
                </span>
                <span class="text-xs text-gray-500 ml-2">Moniteur:</span>
                <span :class="`px-2 py-0.5 rounded-full text-xs font-medium ${getRatingClass(value.monitor)}`">
                  {{ formatRating(value.monitor) }}
                </span>
              </div>
            </div>
            <p v-if="value.comment" class="text-sm text-gray-600 italic">{{ value.comment }}</p>
          </div>
        </div>
        <p v-else class="text-gray-500 italic">Non spécifié</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500 mb-1">Commentaires sur les relations sociales</p>
        <p class="text-gray-900 whitespace-pre-line">{{ worker.social_relations_comments || 'Non spécifié' }}</p>
      </div>
    </div>
  </div>
        <!-- Section Employabilité -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.221-.791-9-2.245M16 6.379a23.897 23.897 0 00-9 0m13 12.379a23.897 23.897 0 01-9 0M9 5a2.25 2.25 0 012.25-2.25h.5a2.25 2.25 0 012.25 2.25m-1.378 1.122c-.462.462-.921.921-1.378 1.378m0 0A12.012 12.012 0 0112 12c.47 0 .934.016 1.392.048m0 0c.555-.555 1.21-.892 1.95-.892m0 0A12.012 12.012 0 0012 9c-.47 0-.934-.016-1.392-.048m0 0c.555.555 1.21.892 1.95.892M6.379 16.379c-.462-.462-.921-.921-1.378-1.378M13 17.254A23.917 23.917 0 0016 15c3.184 0 6.221-.791 9-2.245M3 3.621a23.917 23.917 0 019 0"></path>
            </svg>
            Employabilité
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">CV disponible</p>
              <p class="text-gray-900">{{ worker.has_cv ? 'Oui' : 'Non' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Lettre de motivation disponible</p>
              <p class="text-gray-900">{{ worker.has_motivation_letter ? 'Oui' : 'Non' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Compte CPF</p>
              <p class="text-gray-900">{{ worker.has_cpf_account ? 'Oui' : 'Non' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Volonté de travailler chez un employeur</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.employer_work_willingness || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Domaine de métier souhaité</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.desired_job_field || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Entreprises souhaitées</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.desired_companies || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Mobilité géographique</p>
              <p class="text-gray-900 whitespace-pre-line">{{ formatGeographicMobility(worker.geographic_mobility) }}</p>
            </div>
            <div v-if="worker.geographic_mobility === 'other'">
              <p class="text-sm font-medium text-gray-500 mb-1">Précisions mobilité</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.geographic_mobility_other || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Expériences professionnelles</p>
              <div v-if="parsedExperiences && parsedExperiences.length > 0" class="mt-2">
                <div v-for="(exp, index) in parsedExperiences" :key="index" class="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div class="flex justify-between">
                    <span class="text-xs font-semibold text-gray-500">{{ formatDate(exp.date) }}</span>
                    <span class="text-xs font-medium text-gray-600">{{ exp.company }}</span>
                  </div>
                  <p class="text-sm mt-1">{{ exp.missions }}</p>
                  <p class="text-xs italic mt-1 text-gray-600">Avis: {{ exp.worker_opinion }}</p>
                </div>
              </div>
              <p v-else class="text-gray-500 italic">Aucune expérience professionnelle enregistrée</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Demandes refusées</p>
              <div v-if="parsedDeclinedApplications && parsedDeclinedApplications.length > 0" class="mt-2">
                <div v-for="(app, index) in parsedDeclinedApplications" :key="index" class="mb-2">
                  <span class="text-xs font-semibold text-gray-500">{{ formatDate(app.request_date) }}</span>
                  <span class="text-sm ml-2">{{ app.company_name }}</span>
                </div>
              </div>
              <p v-else class="text-gray-500 italic">Aucune demande refusée enregistrée</p>
            </div>
          </div>
          
          <div class="mt-4 grid grid-cols-1 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Expériences exceptionnelles</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.exceptional_experiences || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Difficultés liées au projet</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.project_difficulties || 'Non spécifié' }}</p>
            </div>
          </div>
        </div>

        <!-- Section Évaluation du projet -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Évaluation du projet
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Clarté du projet professionnel</p>
              <div class="mt-1">
                <div class="flex items-center">
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-purple-600 h-2 rounded-full" 
                      :style="`width: ${(worker.professional_project_clarity || 0) * 33.33}%`"
                    ></div>
                  </div>
                  <span class="ml-2 text-sm font-medium text-gray-700">{{ worker.professional_project_clarity || 0 }}/3</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ formatProjectClarity(worker.professional_project_clarity) }}</p>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Capacité à travailler en milieu ordinaire</p>
              <div class="mt-1">
                <div class="flex items-center">
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-purple-600 h-2 rounded-full" 
                      :style="`width: ${(worker.ordinary_work_capacity || 0) * 33.33}%`"
                    ></div>
                  </div>
                  <span class="ml-2 text-sm font-medium text-gray-700">{{ worker.ordinary_work_capacity || 0 }}/3</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ formatWorkCapacity(worker.ordinary_work_capacity) }}</p>
              </div>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Évaluation du moniteur</p>
              <p class="text-gray-900 whitespace-pre-line">{{ worker.monitor_assessment || 'Non spécifié' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Prochaines étapes</p>
              <div v-if="worker.next_steps" class="flex flex-wrap gap-2 mt-1">
                <span 
                  v-for="step in worker.next_steps.split(',')" 
                  :key="step" 
                  class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                >
                  {{ formatNextStep(step) }}
                </span>
              </div>
              <p v-else class="text-gray-500 italic">Non spécifié</p>
            </div>
          </div>
        </div>

        <!-- Section Projets futurs -->
        <div class="p-5 border-b border-gray-200">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            Projets futurs
          </h3>

          <div v-if="hasAnyProject" class="space-y-6">
            <!-- Projet professionnel -->
            <div v-if="parsedProfessionalProject && parsedProfessionalProject.length > 0">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Projet professionnel pour 2 ans</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Échéances</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyens</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suivi</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in parsedProfessionalProject" :key="index">
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.action || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.deadline || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.responsible || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.resources || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.follow_up || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Projet vie sociale -->
            <div v-if="parsedSocialLifeProject && parsedSocialLifeProject.length > 0">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Projet vie sociale / compétences psycho sociales</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Échéances</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyens</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suivi</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in parsedSocialLifeProject" :key="index">
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.action || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.deadline || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.responsible || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.resources || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.follow_up || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Formations -->
            <div v-if="parsedTrainingProject && parsedTrainingProject.length > 0">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Formations</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Échéances</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyens</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suivi</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in parsedTrainingProject" :key="index">
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.action || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.deadline || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.responsible || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.resources || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.follow_up || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Insertion vers l'emploi -->
            <div v-if="parsedEmploymentInsertionProject && parsedEmploymentInsertionProject.length > 0">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Insertion vers l'emploi</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Échéances</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyens</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suivi</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in parsedEmploymentInsertionProject" :key="index">
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.action || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.deadline || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.responsible || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.resources || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.follow_up || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 italic">Aucun projet futur enregistré</p>
        </div>

        <!-- Section Consentements -->
        <div class="p-5">
          <h3 class="flex items-center text-lg font-medium text-gray-700 mb-4">
            <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
            Consentements
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Consentement au partage d'informations</p>
              <p class="text-gray-900">
                <span 
                  :class="`px-2 py-1 text-xs font-medium rounded-full ${worker.information_sharing_consent ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`"
                >
                  {{ worker.information_sharing_consent ? 'Oui' : 'Non' }}
                </span>
              </p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 mb-1">Signature</p>
              <p class="text-gray-900">{{ worker.signature_name || 'Non signé' }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Suggestions IA -->
      <div v-if="aiSuggestions" ref="aiSuggestionsSection" class="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div class="flex items-center p-4 border-b border-gray-200 bg-purple-50">
          <svg class="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <h3 class="text-lg font-medium text-purple-800">Suggestions de métiers (IA)</h3>
        </div>
        <div class="p-5">
          <div class="prose max-w-none">
            <!-- Utiliser v-html pour afficher le HTML formaté -->
            <div v-html="formattedAiSuggestions" class="text-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

// Worker data
const worker = ref(null);
const loading = ref(true);
const error = ref(null);

// AI Suggestions data
const aiSuggestions = ref(null);
const loadingSuggestions = ref(false);
const aiSuggestionsSection = ref(null);

// Fonction simple pour convertir le Markdown en HTML
const simpleMarkdownToHtml = (text) => {
  if (!text) return '';
  
  return text
    // Convertir les titres
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-purple-800 mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-purple-800 mt-4 mb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-purple-800 mt-4 mb-2">$1</h1>')
    // Convertir le texte en gras
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-purple-800">$1</strong>')
    // Convertir le texte en italique
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Convertir les listes à puces
    .replace(/^\- (.*$)/gim, '<li class="ml-4">• $1</li>')
    // Convertir les listes numérotées
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
    // Convertir les sauts de ligne en paragraphes
    .replace(/\n\n/g, '</p><p class="mb-2">')
    // Ajouter les balises de paragraphe au début et à la fin
    .replace(/^/, '<p class="mb-2">')
    .replace(/$/, '</p>')
    // Nettoyer les paragraphes vides
    .replace(/<p class="mb-2"><\/p>/g, '');
};

const formattedAiSuggestions = computed(() => {
  if (!aiSuggestions.value) return '';
  
  try {
    // Convertir le texte markdown en HTML avec notre fonction simple
    let html = simpleMarkdownToHtml(aiSuggestions.value);
    
    // Ajouter des styles spécifiques pour les suggestions de métiers
    html = html
      // Styliser les sections des suggestions de métiers
      .replace(/- Description:/g, '<span class="font-medium text-gray-700 mt-2">📝 <span class="underline">Description</span>:</span>')
      .replace(/- Adéquation:/g, '<span class="font-medium text-gray-700 mt-2">✅ <span class="underline">Adéquation</span>:</span>')
      .replace(/- Aménagements:/g, '<span class="font-medium text-gray-700 mt-2">🔧 <span class="underline">Aménagements</span>:</span>')
      .replace(/- Entreprises locales:/g, '<span class="font-medium text-gray-700 mt-2">🏢 <span class="underline">Entreprises locales</span>:</span>');
    
    return html;
  } catch (e) {
    console.error('Error formatting AI suggestions:', e);
    return aiSuggestions.value.replace(/\n/g, '<br>'); // Retourner le texte avec des sauts de ligne
  }
});

// Format date helper (date only)
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Format date and time helper
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
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

// Format protection measure helper
const formatProtectionMeasure = (measure) => {
  if (!measure) return 'Non spécifiée';
  const measureMap = {
    'tutelle': 'Tutelle',
    'curatelle_simple': 'Curatelle simple',
    'curatelle_renforcee': 'Curatelle renforcée',
    'pas_de_mesure': 'Pas de mesure',
    'autre': 'Autre'
  };
  return measureMap[measure] || measure;
};

// Format geographic mobility
const formatGeographicMobility = (mobility) => {
  if (!mobility) return 'Non spécifiée';
  const mobilityMap = {
    'less_than_10km': 'Moins de 10 km',
    'less_than_30km': 'Moins de 30 km',
    'department': 'Département',
    'france': 'France entière',
    'other': 'Autre'
  };
  return mobilityMap[mobility] || mobility;
};

// Format project clarity
const formatProjectClarity = (clarity) => {
  if (!clarity) return 'Pas de projet professionnel défini';
  const clarityMap = {
    0: 'Pas de projet professionnel défini',
    1: 'Projet peu clair, pas en accord avec les capacités et les compétences',
    2: 'Projet assez clair, avec des étapes à réaliser',
    3: 'Projet clair et bien en accord avec les compétences et les intérêts'
  };
  return clarityMap[clarity] || `Niveau ${clarity}`;
};

// Format work capacity
const formatWorkCapacity = (capacity) => {
  if (!capacity) return 'Capacités très limitées, besoin de beaucoup de soutien';
  const capacityMap = {
    0: 'Capacités très limitées, besoin de beaucoup de soutien',
    1: 'Capacités présentes, mais besoin d\'un soutien moyen',
    2: 'Capacités conformes, besoin d\'un soutien occasionnel',
    3: 'Capacités très solides, presque autonome pour travailler en milieu ordinaire'
  };
  return capacityMap[capacity] || `Niveau ${capacity}`;
};

// Format next step
const formatNextStep = (step) => {
  if (!step) return '';
  const stepMap = {
    'duoday': 'DuoDay',
    'pmsmp': 'PMSMP',
    'prestation': 'Prestation',
    'double_activity': 'Double activité',
    'full_time': 'Temps complet'
  };
  return stepMap[step.trim()] || step;
};

// Computed properties for parsing JSON data
const parsedExperiences = computed(() => {
  if (!worker.value || !worker.value.professional_experiences) return null;
  try {
    return typeof worker.value.professional_experiences === 'string' 
      ? JSON.parse(worker.value.professional_experiences) 
      : worker.value.professional_experiences;
  } catch (e) {
    console.error('Error parsing professional experiences:', e);
    return null;
  }
});

const parsedDeclinedApplications = computed(() => {
  if (!worker.value || !worker.value.declined_applications) return null;
  try {
    return typeof worker.value.declined_applications === 'string' 
      ? JSON.parse(worker.value.declined_applications) 
      : worker.value.declined_applications;
  } catch (e) {
    console.error('Error parsing declined applications:', e);
    return null;
  }
});

const parsedProfessionalProject = computed(() => {
  if (!worker.value || !worker.value.professional_project_2_years) return null;
  try {
    return typeof worker.value.professional_project_2_years === 'string' 
      ? JSON.parse(worker.value.professional_project_2_years) 
      : worker.value.professional_project_2_years;
  } catch (e) {
    console.error('Error parsing professional project:', e);
    return null;
  }
});

const parsedSocialLifeProject = computed(() => {
  if (!worker.value || !worker.value.social_life_project) return null;
  try {
    return typeof worker.value.social_life_project === 'string' 
      ? JSON.parse(worker.value.social_life_project) 
      : worker.value.social_life_project;
  } catch (e) {
    console.error('Error parsing social life project:', e);
    return null;
  }
});

const parsedTrainingProject = computed(() => {
  if (!worker.value || !worker.value.training_project) return null;
  try {
    return typeof worker.value.training_project === 'string' 
      ? JSON.parse(worker.value.training_project) 
      : worker.value.training_project;
  } catch (e) {
    console.error('Error parsing training project:', e);
    return null;
  }
});

const parsedEmploymentInsertionProject = computed(() => {
  if (!worker.value || !worker.value.employment_insertion_project) return null;
  try {
    return typeof worker.value.employment_insertion_project === 'string' 
      ? JSON.parse(worker.value.employment_insertion_project) 
      : worker.value.employment_insertion_project;
  } catch (e) {
    console.error('Error parsing employment insertion project:', e);
    return null;
  }
});

// Check if any project data exists
const hasAnyProject = computed(() => {
  return (
    (parsedProfessionalProject.value && parsedProfessionalProject.value.length > 0) ||
    (parsedSocialLifeProject.value && parsedSocialLifeProject.value.length > 0) ||
    (parsedTrainingProject.value && parsedTrainingProject.value.length > 0) ||
    (parsedEmploymentInsertionProject.value && parsedEmploymentInsertionProject.value.length > 0)
  );
});

// Nouvelles computed properties pour parser les champs JSON
const parsedSpatialTemporalOrientation = computed(() => {
  if (!worker.value || !worker.value.spatial_temporal_orientation) return null;
  
  try {
    return typeof worker.value.spatial_temporal_orientation === 'string'
      ? JSON.parse(worker.value.spatial_temporal_orientation)
      : worker.value.spatial_temporal_orientation;
  } catch (e) {
    console.error('Error parsing spatial temporal orientation:', e);
    return null;
  }
});

const parsedProfessionalEvaluation = computed(() => {
  if (!worker.value || !worker.value.professional_evaluation) return null;
  
  try {
    return typeof worker.value.professional_evaluation === 'string'
      ? JSON.parse(worker.value.professional_evaluation)
      : worker.value.professional_evaluation;
  } catch (e) {
    console.error('Error parsing professional evaluation:', e);
    return null;
  }
});

const parsedSocialRelations = computed(() => {
  if (!worker.value || !worker.value.social_relations) return null;
  
  try {
    return typeof worker.value.social_relations === 'string'
      ? JSON.parse(worker.value.social_relations)
      : worker.value.social_relations;
  } catch (e) {
    console.error('Error parsing social relations:', e);
    return null;
  }
});

// Fonctions d'aide pour le formatage
const formatCommaSeparatedField = (field) => {
  if (!field) return [];
  return field.split(',').map(item => item.trim());
};

const formatSkillName = (skillCode) => {
  const skillMap = {
    'can_read_letters': 'Lecture des lettres',
    'can_read_words': 'Lecture des mots',
    'can_read_sentences': 'Lecture de phrases',
    'can_read_with_comprehension': 'Lecture avec compréhension',
    'can_copy': 'Copie de texte',
    'can_write_letters': 'Écriture de lettres',
    'can_write_words': 'Écriture de mots',
    'can_write_sentences': 'Écriture de phrases',
    'can_count': 'Comptage',
    'can_add': 'Addition',
    'can_subtract': 'Soustraction',
    'can_multiply': 'Multiplication',
    'can_divide': 'Division',
    'can_solve_problems': 'Résolution de problèmes'
  };
  
  return skillMap[skillCode] || skillCode;
};

const formatEvaluationKey = (key) => {
  const keyMap = {
    'comprehension_consignes': 'Compréhension des consignes',
    'qualite_travail': 'Qualité du travail',
    'initiatives': 'Prise d\'initiatives',
    'memorisation': 'Mémorisation',
    'esprit_equipe': 'Esprit d\'équipe',
    'contact_moniteurs': 'Contact avec les moniteurs',
    'contact_collegues': 'Contact avec les collègues',
    'comportement': 'Comportement'
  };
  
  return keyMap[key] || key.replace(/_/g, ' ');
};

const formatRating = (rating) => {
  if (!rating) return 'Non évalué';
  
  const ratingMap = {
    'poor': 'Difficile',
    'medium': 'Moyen',
    'good': 'Bon',
    'excellent': 'Excellent'
  };
  
  return ratingMap[rating] || rating;
};

const getRatingClass = (rating) => {
  if (!rating) return 'bg-gray-100 text-gray-800';
  
  const ratingClassMap = {
    'poor': 'bg-red-100 text-red-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'good': 'bg-green-100 text-green-800',
    'excellent': 'bg-blue-100 text-blue-800'
  };
  
  return ratingClassMap[rating] || 'bg-gray-100 text-gray-800';
};

// Fetch Worker data
onMounted(async () => {
  try {
    const response = await fetch(`/api/workers/${id.value}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Travailleur non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    // Handle if the API wraps the worker data in a 'data' property
    worker.value = data.data || data;
    
  } catch (err) {
    error.value = `Erreur lors du chargement du travailleur: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});


// Method to suggest jobs using AI
const suggestJobs = async () => {
  loadingSuggestions.value = true;
  aiSuggestions.value = null; // Clear previous suggestions
  try {
    const response = await fetch(`/api/workers/${id.value}/suggest-jobs`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const result = await response.json();
    if (result.status === 'success') {
      aiSuggestions.value = result.suggestions;
      // Attendre que le DOM soit mis à jour avant de faire défiler
      await nextTick();
      scrollToAiSuggestions();
    } else {
      throw new Error(result.message || 'Failed to get job suggestions from AI');
    }
  } catch (err) {
    aiSuggestions.value = `Erreur lors de la suggestion de métiers: ${err.message}`;
    await nextTick();
    scrollToAiSuggestions();
  } finally {
    loadingSuggestions.value = false;
  }
};

// Fonction pour faire défiler jusqu'à la section des suggestions
const scrollToAiSuggestions = () => {
  if (aiSuggestionsSection.value) {
    aiSuggestionsSection.value.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

// Surveiller les changements de suggestions pour faire défiler automatiquement
watch(aiSuggestions, (newValue) => {
  if (newValue) {
    nextTick(() => {
      scrollToAiSuggestions();
    });
  }
});
</script>

<style>
/* Styles supplémentaires pour la mise en forme des suggestions */

</style>
