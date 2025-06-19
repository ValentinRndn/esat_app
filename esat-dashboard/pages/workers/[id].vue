<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    
    <!-- Grid Background with fade effect -->
    <div class="absolute inset-0 z-0">
      <div class="grid-pattern"></div>
      <div class="grid-fade-overlay"></div>
      
      <!-- Light Halos -->
      <div class="light-halo light-halo-1"></div>
      <div class="light-halo light-halo-2"></div>
    </div>

    <!-- Navigation Header -->
    <nav class="relative z-50 border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <div class="flex items-center">
            <NuxtLink to="/dashboard" class="text-2xl font-semibold text-white hover:text-green-400 transition-colors duration-200">BAYTH</NuxtLink>
            <span class="ml-4 text-sm text-gray-400">/ Travailleurs / Détails</span>
          </div>
          <div class="flex items-center space-x-3">

            <!-- Bouton Suggestions avancées avec carte -->
            <NuxtLink 
              :to="`/suggestions/${id}`"
              class="inline-flex items-center px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 10V9m0 0L9 7" />
              </svg>
              Suggestions avancées avec carte
            </NuxtLink>
            
            <NuxtLink :to="`/workers/edit/${id}`" class="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </NuxtLink>
            
            <div class="flex items-center space-x-4">
              <NuxtLink to="/workers" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour
              </NuxtLink>
            </div>
            
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span class="text-sm font-medium text-white">A</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="relative z-10 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Section -->
        <div class="mb-12">
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-orange-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-orange-400">Travailleur</span>
            <span class="text-sm text-gray-300">Détails du profil</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Profil du 
            <span class="text-orange-400">travailleur</span>
          </h1>
        </div>

        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div class="w-12 h-12 border-4 border-white/20 border-t-orange-400 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-300">Chargement des données...</p>
        </div>
        
        <!-- Message d'erreur -->
        <div v-else-if="error" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">{{ error }}</span>
          </div>
        </div>
        
        <!-- Message travailleur non trouvé -->
        <div v-else-if="!worker" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">Travailleur non trouvé.</span>
          </div>
        </div>
        
        <!-- Contenu principal -->
        <div v-else class="space-y-8">
          <!-- En-tête du profil -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div class="p-8">
              <div class="flex items-start space-x-6">
                <!-- Avatar -->
                <div class="w-24 h-24 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span class="text-3xl font-bold text-orange-400">{{ getInitials(worker.first_name, worker.last_name) }}</span>
                </div>
                
                <!-- Informations principales -->
                <div class="flex-1">
                  <h2 class="text-3xl font-bold text-white mb-2">
                    {{ worker.first_name }} {{ worker.last_name }}
                  </h2>
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="px-4 py-2 rounded-full text-sm font-semibold" :class="getWorkRegimeClass(worker.work_regime)">
                      {{ formatWorkRegime(worker.work_regime) }}
                    </span>
                    <span class="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      ID: #{{ worker.id }}
                    </span>
                    <span v-if="worker.internal_code" class="px-3 py-1 bg-orange-500/20 rounded-full text-sm text-orange-400">
                      {{ worker.internal_code }}
                    </span>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18l-3-9H6l-3 9z" />
                      </svg>
                      Né(e) le {{ formatDate(worker.birth_date) }}
                    </div>
                    <div class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Entrée ESAT: {{ formatDate(worker.entry_date_esat) }}
                    </div>
                    <div class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ worker.contact_info || 'Contact non spécifié' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          
          <!-- Section Informations personnelles complètes -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Informations personnelles</h3>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Colonne 1 -->
              <div class="space-y-6">
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Mesure de protection</p>
                  <p class="text-white">{{ formatProtectionMeasure(worker.protection_measure) }}</p>
                </div>
                
                <div v-if="worker.legal_guardian">
                  <p class="text-sm font-medium text-gray-400 mb-1">Tuteur légal</p>
                  <p class="text-white">{{ worker.legal_guardian }}</p>
                </div>
                
                <div v-if="worker.emergency_contact">
                  <p class="text-sm font-medium text-gray-400 mb-1">Contact d'urgence</p>
                  <p class="text-white">{{ worker.emergency_contact }}</p>
                </div>
                
                <div v-if="worker.living_situation">
                  <p class="text-sm font-medium text-gray-400 mb-2">Situation de logement</p>
                  <p class="text-white whitespace-pre-line">{{ worker.living_situation }}</p>
                </div>
              </div>
              
              <!-- Colonne 2 -->
              <div class="space-y-6">
                <div v-if="worker.mobility_info">
                  <p class="text-sm font-medium text-gray-400 mb-2">Informations de mobilité</p>
                  <p class="text-white whitespace-pre-line">{{ worker.mobility_info }}</p>
                </div>
                
                <div v-if="worker.health_info_summary">
                  <p class="text-sm font-medium text-gray-400 mb-2">Résumé informations de santé</p>
                  <p class="text-white whitespace-pre-line">{{ worker.health_info_summary }}</p>
                </div>
                
                <div v-if="worker.educational_background">
                  <p class="text-sm font-medium text-gray-400 mb-2">Parcours scolaire</p>
                  <p class="text-white whitespace-pre-line">{{ worker.educational_background }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section Situation professionnelle -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Situation professionnelle</h3>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Informations ESAT -->
              <div class="space-y-6">
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">ESAT assigné</p>
                  <div v-if="worker.esat_id">
                    <NuxtLink 
                      :to="`/esats/${worker.esat_id}`" 
                      class="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Voir l'ESAT (ID: {{ worker.esat_id }})
                    </NuxtLink>
                  </div>
                  <p v-else class="text-gray-400">Non assigné</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Régime de travail</p>
                  <div class="flex items-center space-x-3">
                    <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="getWorkRegimeClass(worker.work_regime)">
                      {{ formatWorkRegime(worker.work_regime) }}
                    </span>
                    <span v-if="worker.work_regime === 'part-time' && worker.part_time_percentage" class="px-3 py-1 bg-gray-500/20 rounded-full text-sm text-gray-300">
                      {{ worker.part_time_percentage }}%
                    </span>
                  </div>
                </div>
                
                <div v-if="worker.work_hours">
                  <p class="text-sm font-medium text-gray-400 mb-1">Horaires de travail</p>
                  <p class="text-white">{{ worker.work_hours }}</p>
                </div>
              </div>
              
              <!-- Secteurs d'activité et vigilance -->
              <div class="space-y-6">
                <div v-if="worker.activity_sectors">
                  <p class="text-sm font-medium text-gray-400 mb-2">Secteurs d'activité</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="sector in getActivitySectors(worker.activity_sectors)" 
                          :key="sector"
                          class="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full">
                      {{ sector.trim() }}
                    </span>
                  </div>
                </div>
                
                <div v-if="worker.activity_sectors_other">
                  <p class="text-sm font-medium text-gray-400 mb-1">Autres secteurs</p>
                  <p class="text-white">{{ worker.activity_sectors_other }}</p>
                </div>
                
                <div v-if="worker.vigilance_points">
                  <p class="text-sm font-medium text-gray-400 mb-2">Points de vigilance</p>
                  <p class="text-white whitespace-pre-line">{{ worker.vigilance_points }}</p>
                </div>
                
                <div v-if="worker.vigilance_actions">
                  <p class="text-sm font-medium text-gray-400 mb-2">Actions de vigilance</p>
                  <p class="text-white whitespace-pre-line">{{ worker.vigilance_actions }}</p>
                </div>
              </div>
            </div>
            
            <!-- Parcours professionnel -->
            <div v-if="worker.professional_background_summary" class="mt-8 pt-6 border-t border-white/10">
              <p class="text-sm font-medium text-gray-400 mb-2">Résumé du parcours professionnel</p>
              <p class="text-white whitespace-pre-line">{{ worker.professional_background_summary }}</p>
            </div>
          </div>
          
          <!-- Section Compétences et évaluations -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Compétences et évaluations</h3>
            </div>
            
            <!-- Compétences de base -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 class="text-lg font-medium text-white mb-4">Compétences de base</h4>
                <div class="space-y-4">
                  <div v-if="worker.reading_skills">
                    <p class="text-sm font-medium text-gray-400 mb-1">Compétences en lecture</p>
                    <p class="text-white">{{ formatReadingSkills(worker.reading_skills) }}</p>
                  </div>
                  
                  <div v-if="worker.writing_skills">
                    <p class="text-sm font-medium text-gray-400 mb-1">Compétences en écriture</p>
                    <p class="text-white">{{ formatWritingSkills(worker.writing_skills) }}</p>
                  </div>
                  
                  <div v-if="worker.calculation_skills">
                    <p class="text-sm font-medium text-gray-400 mb-1">Compétences en calcul</p>
                    <p class="text-white">{{ formatCalculationSkills(worker.calculation_skills) }}</p>
                  </div>
                  
                  <div v-if="worker.computer_skills">
                    <p class="text-sm font-medium text-gray-400 mb-1">Compétences informatiques</p>
                    <p class="text-white">{{ worker.computer_skills }}</p>
                    <div v-if="worker.computer_skills_comments" class="mt-2 p-3 bg-white/5 rounded-lg">
                      <p class="text-sm text-gray-300">{{ worker.computer_skills_comments }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Capacités et clarté du projet -->
              <div>
                <h4 class="text-lg font-medium text-white mb-4">Capacités</h4>
                <div class="space-y-4">
                  <div v-if="worker.professional_project_clarity !== null">
                    <p class="text-sm font-medium text-gray-400 mb-1">Clarté du projet professionnel</p>
                    <div class="flex items-center space-x-3">
                      <div class="flex space-x-1">
                        <div v-for="i in 10" :key="i" 
                             class="w-3 h-3 rounded-full"
                             :class="i <= worker.professional_project_clarity ? 'bg-orange-400' : 'bg-gray-600'">
                        </div>
                      </div>
                      <span class="text-white">{{ worker.professional_project_clarity }}/10</span>
                    </div>
                  </div>
                  
                  <div v-if="worker.ordinary_work_capacity !== null">
                    <p class="text-sm font-medium text-gray-400 mb-1">Capacité de travail en milieu ordinaire</p>
                    <div class="flex items-center space-x-3">
                      <div class="flex space-x-1">
                        <div v-for="i in 10" :key="i" 
                             class="w-3 h-3 rounded-full"
                             :class="i <= worker.ordinary_work_capacity ? 'bg-green-400' : 'bg-gray-600'">
                        </div>
                      </div>
                      <span class="text-white">{{ worker.ordinary_work_capacity }}/10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Évaluations professionnelles et sociales -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <div v-if="worker.professional_evaluation_comments">
                <h4 class="text-lg font-medium text-white mb-3">Évaluation professionnelle</h4>
                <div class="p-4 bg-white/5 rounded-lg">
                  <p class="text-gray-300 whitespace-pre-line">{{ worker.professional_evaluation_comments }}</p>
                </div>
              </div>
              
              <div v-if="worker.social_relations_comments">
                <h4 class="text-lg font-medium text-white mb-3">Relations sociales</h4>
                <div class="p-4 bg-white/5 rounded-lg">
                  <p class="text-gray-300 whitespace-pre-line">{{ worker.social_relations_comments }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section Documents et projet professionnel -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Documents et projet professionnel</h3>
            </div>
            
            <!-- Documents disponibles -->
            <div class="mb-8">
              <h4 class="text-lg font-medium text-white mb-4">Documents disponibles</h4>
              <div class="flex flex-wrap gap-3">
                <div class="flex items-center px-4 py-2 rounded-lg" :class="worker.has_cv ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'">
                  <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-sm font-medium">CV</span>
                  <span class="ml-2 text-xs">{{ worker.has_cv ? '✓' : '✗' }}</span>
                </div>
                
                <div class="flex items-center px-4 py-2 rounded-lg" :class="worker.has_motivation_letter ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'">
                  <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span class="text-sm font-medium">Lettre de motivation</span>
                  <span class="ml-2 text-xs">{{ worker.has_motivation_letter ? '✓' : '✗' }}</span>
                </div>
                
                <div class="flex items-center px-4 py-2 rounded-lg" :class="worker.has_cpf_account ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'">
                  <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span class="text-sm font-medium">Compte CPF</span>
                  <span class="ml-2 text-xs">{{ worker.has_cpf_account ? '✓' : '✗' }}</span>
                </div>
              </div>
            </div>
            
            <!-- Projet professionnel -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div v-if="worker.employer_work_willingness">
                  <p class="text-sm font-medium text-gray-400 mb-2">Volonté de travail chez un employeur</p>
                  <p class="text-white whitespace-pre-line">{{ worker.employer_work_willingness }}</p>
                </div>
                
                <div v-if="worker.desired_job_field">
                  <p class="text-sm font-medium text-gray-400 mb-1">Domaine professionnel souhaité</p>
                  <p class="text-white">{{ worker.desired_job_field }}</p>
                </div>
                
                <div v-if="worker.desired_companies">
                  <p class="text-sm font-medium text-gray-400 mb-1">Entreprises souhaitées</p>
                  <p class="text-white">{{ worker.desired_companies }}</p>
                </div>
              </div>
              
              <div class="space-y-6">
                <div v-if="worker.geographic_mobility">
                  <p class="text-sm font-medium text-gray-400 mb-1">Mobilité géographique</p>
                  <div class="flex items-center space-x-2">
                    <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {{ formatGeographicMobility(worker.geographic_mobility) }}
                    </span>
                    <span v-if="worker.geographic_mobility === 'autre' && worker.geographic_mobility_other" class="text-white text-sm">
                      ({{ worker.geographic_mobility_other }})
                    </span>
                  </div>
                </div>
                
                <div v-if="worker.exceptional_experiences">
                  <p class="text-sm font-medium text-gray-400 mb-2">Expériences exceptionnelles</p>
                  <p class="text-white whitespace-pre-line">{{ worker.exceptional_experiences }}</p>
                </div>
                
                <div v-if="worker.project_difficulties">
                  <p class="text-sm font-medium text-gray-400 mb-2">Difficultés du projet</p>
                  <p class="text-white whitespace-pre-line">{{ worker.project_difficulties }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

const worker = ref(null);
const loading = ref(true);
const error = ref(null);

// Variables pour les suggestions IA supprimées car remplacées par la page dédiée

// Statistiques calculées
const stats = computed(() => {
  if (!worker.value) return [];
  
  return [
    {
      label: 'Âge',
      value: worker.value.age ? `${worker.value.age} ans` : 'Non renseigné',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      label: 'Sexe',
      value: worker.value.gender === 'male' ? 'Homme' : worker.value.gender === 'female' ? 'Femme' : 'Non renseigné',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      label: 'ESAT',
      value: worker.value.esat_name || 'Non renseigné',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
    {
      label: 'Situation',
      value: worker.value.current_situation || 'Non renseignée',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    }
  ];
});

// Get initials helper
const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last || '?';
};

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'Non spécifiée';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  });
};

// Format work regime helper
const formatWorkRegime = (regime) => {
  if (!regime) return 'Non spécifié';
  const regimeMap = {
    'temps_plein': 'Temps plein',
    'temps_partiel': 'Temps partiel',
    'full-time': 'Temps plein',
    'part-time': 'Temps partiel'
  };
  return regimeMap[regime] || regime;
};

// Get work regime class
const getWorkRegimeClass = (regime) => {
  switch (regime) {
    case 'temps_plein':
    case 'full-time':
      return 'bg-green-500/20 text-green-400';
    case 'temps_partiel':
    case 'part-time':
      return 'bg-blue-500/20 text-blue-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

// Format protection measure
const formatProtectionMeasure = (measure) => {
  if (!measure) return 'Non spécifiée';
  const measureMap = {
    'none': 'Aucune',
    'tutorship': 'Tutelle',
    'curatorship': 'Curatelle',
    'reinforced_curatorship': 'Curatelle renforcée',
    'safeguard_justice': 'Sauvegarde de justice'
  };
  return measureMap[measure] || measure;
};

// Format geographic mobility
const formatGeographicMobility = (mobility) => {
  if (!mobility) return 'Non spécifiée';
  const mobilityMap = {
    'commune': 'Commune',
    'department': 'Département',
    'region': 'Région',
    'national': 'National',
    'other': 'Autre'
  };
  return mobilityMap[mobility] || mobility;
};

// Get activity sectors helper
const getActivitySectors = (sectorsString) => {
  if (!sectorsString) return [];
  
  try {
    // Si c'est déjà un tableau JSON, le parser
    const parsed = JSON.parse(sectorsString);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, 5); // Limite à 5 secteurs pour l'affichage
    }
  } catch (e) {
    // Si ce n'est pas du JSON valide, traiter comme une chaîne séparée par des virgules
    return sectorsString.split(',').filter(s => s.trim()).slice(0, 5);
  }
  
  return [];
};

// Format project clarity
const formatProjectClarity = (clarity) => {
  const clarityMap = {
    0: 'Aucune clarté',
    1: 'Peu clair',
    2: 'Assez clair',
    3: 'Très clair'
  };
  return clarityMap[clarity] || 'Non évalué';
};

// Format work capacity
const formatWorkCapacity = (capacity) => {
  const capacityMap = {
    0: 'Aucune capacité',
    1: 'Capacité limitée',
    2: 'Capacité modérée',
    3: 'Bonne capacité'
  };
  return capacityMap[capacity] || 'Non évalué';
};

// Format next step
const formatNextStep = (step) => {
  const stepMap = {
    'stage': 'Stage',
    'formation': 'Formation',
    'emploi_accompagne': 'Emploi accompagné',
    'milieu_ordinaire': 'Milieu ordinaire',
    'autre': 'Autre'
  };
  return stepMap[step.trim()] || step.trim();
};

// Computed properties for parsing JSON fields
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

// Formatting helper functions
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

// Format reading skills
const formatReadingSkills = (skills) => {
  if (!skills) return 'Non spécifiées';
  
  const skillsMap = {
    'cannot_read': 'Ne sait pas lire',
    'can_read_letters': 'Reconnaît les lettres',
    'can_read_words': 'Peut lire des mots simples',
    'can_read_sentences': 'Peut lire des phrases',
    'can_read_with_comprehension': 'Peut lire avec compréhension',
    'can_read_complex_texts': 'Peut lire des textes complexes'
  };
  
  return skillsMap[skills] || skills;
};

// Format writing skills
const formatWritingSkills = (skills) => {
  if (!skills) return 'Non spécifiées';
  
  const skillsList = skills.split(',').map(skill => skill.trim());
  const skillsMap = {
    'cannot_write': 'Ne sait pas écrire',
    'can_copy': 'Peut copier',
    'can_write_letters': 'Peut écrire des lettres',
    'can_write_words': 'Peut écrire des mots',
    'can_write_sentences': 'Peut écrire des phrases',
    'can_write_texts': 'Peut écrire des textes'
  };
  
  const formattedSkills = skillsList.map(skill => skillsMap[skill] || skill);
  return formattedSkills.join(', ');
};

// Format calculation skills
const formatCalculationSkills = (skills) => {
  if (!skills) return 'Non spécifiées';
  
  const skillsList = skills.split(',').map(skill => skill.trim());
  const skillsMap = {
    'cannot_count': 'Ne sait pas compter',
    'can_count': 'Peut compter',
    'can_perform_operations': 'Peut effectuer des opérations',
    'can_add': 'Peut additionner',
    'can_subtract': 'Peut soustraire',
    'can_multiply': 'Peut multiplier',
    'can_divide': 'Peut diviser',
    'can_solve_problems': 'Peut résoudre des problèmes'
  };
  
  const formattedSkills = skillsList.map(skill => skillsMap[skill] || skill);
  return formattedSkills.join(', ');
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
    worker.value = data.data || data;
    
  } catch (err) {
    error.value = `Erreur lors du chargement du travailleur: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Grid Pattern Background */
.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: 0 0, 0 0;
  animation: grid-move 20s linear infinite;
}

/* Grid fade overlay */
.grid-fade-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 40%,
    rgba(17, 24, 39, 0.3) 60%,
    rgba(17, 24, 39, 0.7) 80%,
    rgba(17, 24, 39, 0.9) 100%
  );
  pointer-events: none;
}

/* Optional animation for the grid */
@keyframes grid-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(80px, 80px);
  }
}

/* Light Halos */
.light-halo {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.light-halo-1 {
  top: -8%;
  right: -8%;
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.25) 0%,
    rgba(236, 72, 153, 0.15) 30%,
    rgba(236, 72, 153, 0.08) 60%,
    transparent 100%
  );
  filter: blur(60px);
}

.light-halo-2 {
  top: 5%;
  left: 5%;
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.20) 0%,
    rgba(236, 72, 153, 0.12) 30%,
    rgba(236, 72, 153, 0.06) 60%,
    transparent 100%
  );
  filter: blur(50px);
}
</style>
