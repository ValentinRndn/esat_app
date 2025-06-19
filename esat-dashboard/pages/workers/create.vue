<template>
  <div class="min-h-screen main-gradient-bg relative overflow-hidden">
    
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
            <NuxtLink to="/dashboard" class="text-2xl font-semibold text-white hover:text-pink-400 transition-colors duration-200">BAYTH</NuxtLink>
            <span class="ml-4 text-sm text-gray-400">/ Travailleurs / Nouveau</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/workers" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="relative z-10 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Section -->
        <div class="mb-12">
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-orange-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-orange-400">Nouveau</span>
            <span class="text-sm text-gray-300">Ajouter un travailleur</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Nouveau 
            <span class="text-orange-400">travailleur</span>
          </h1>
        </div>

        <!-- Message d'erreur -->
        <div v-if="error" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6 mb-8">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">{{ error }}</span>
          </div>
        </div>
        
        <!-- Message de succès -->
        <div v-if="success" class="bg-pink-500/10 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-6 mb-8">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-pink-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div class="flex-1">
              <span class="text-pink-300">Travailleur créé avec succès !</span>
              <div class="mt-4 flex space-x-3">
                <NuxtLink :to="`/workers/${createdWorkerId}`" class="inline-flex items-center px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-all duration-200 border border-orange-500/20">
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Voir les détails
                </NuxtLink>
                <NuxtLink to="/workers" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 border border-white/20">
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Retour à la liste
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Formulaire de création -->
        <div v-if="!success" class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <!-- En-tête du formulaire -->
          <div class="flex items-center p-8 border-b border-white/10">
            <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-white">Informations du nouveau travailleur</h2>
              <p class="text-gray-400 text-sm">Remplissez les informations ci-dessous</p>
            </div>
          </div>
          
          <!-- Navigation par onglets -->
          <div class="border-b border-white/10">
            <nav class="flex">
              <button 
                type="button"
                @click="activeTab = 'personal'"
                :class="[
                  activeTab === 'personal' 
                    ? 'border-orange-400 text-orange-400 bg-orange-500/10' 
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600',
                  'px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200'
                ]"
              >
                Informations personnelles
              </button>
              <button 
                type="button"
                @click="activeTab = 'professional'"
                :class="[
                  activeTab === 'professional' 
                    ? 'border-orange-400 text-orange-400 bg-orange-500/10' 
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600',
                  'px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200'
                ]"
              >
                Situation professionnelle
              </button>
              <button 
                type="button"
                @click="activeTab = 'skills'"
                :class="[
                  activeTab === 'skills' 
                    ? 'border-orange-400 text-orange-400 bg-orange-500/10' 
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600',
                  'px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200'
                ]"
              >
                Compétences et évaluations
              </button>
              <button 
                type="button"
                @click="activeTab = 'documents'"
                :class="[
                  activeTab === 'documents' 
                    ? 'border-orange-400 text-orange-400 bg-orange-500/10' 
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600',
                  'px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200'
                ]"
              >
                Documents et projet
              </button>
            </nav>
          </div>
          
          <!-- Formulaire -->
          <form @submit.prevent="submitForm" class="p-8">
            <!-- Onglet Informations personnelles -->
            <div v-if="activeTab === 'personal'" class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="first_name" class="block text-sm font-medium text-gray-300 mb-2">Prénom *</label>
                  <input 
                    type="text" 
                    id="first_name" 
                    v-model="formData.first_name" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200" 
                    placeholder="Entrez le prénom"
                    required
                    :disabled="submitting"
                  >
                </div>
                
                <div>
                  <label for="last_name" class="block text-sm font-medium text-gray-300 mb-2">Nom *</label>
                  <input 
                    type="text" 
                    id="last_name" 
                    v-model="formData.last_name" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200" 
                    placeholder="Entrez le nom"
                    required
                    :disabled="submitting"
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="birth_date" class="block text-sm font-medium text-gray-300 mb-2">Date de naissance</label>
                  <input 
                    type="date" 
                    id="birth_date" 
                    v-model="formData.birth_date" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    :disabled="submitting"
                  >
                </div>
                
                <div>
                  <label for="internal_code" class="block text-sm font-medium text-gray-300 mb-2">Code interne ESAT</label>
                  <input 
                    type="text" 
                    id="internal_code" 
                    v-model="formData.internal_code" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Code interne"
                    :disabled="submitting"
                  >
                </div>
              </div>
              
              <div>
                <label for="contact_info" class="block text-sm font-medium text-gray-300 mb-2">Informations de contact</label>
                <input 
                  type="text" 
                  id="contact_info" 
                  v-model="formData.contact_info" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Email, téléphone, etc."
                  :disabled="submitting"
                >
              </div>
              
              <div>
                <label for="protection_measure" class="block text-sm font-medium text-gray-300 mb-2">Mesure de protection</label>
                <select 
                  id="protection_measure" 
                  v-model="formData.protection_measure" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  :disabled="submitting"
                >
                  <option value="">Sélectionner une mesure</option>
                  <option value="pas_de_mesure">Pas de mesure</option>
                  <option value="tutelle">Tutelle</option>
                  <option value="curatelle_simple">Curatelle simple</option>
                  <option value="curatelle_renforcee">Curatelle renforcée</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="legal_guardian" class="block text-sm font-medium text-gray-300 mb-2">Tuteur légal</label>
                  <input 
                    type="text" 
                    id="legal_guardian" 
                    v-model="formData.legal_guardian" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Nom et contact du tuteur"
                    :disabled="submitting"
                  >
                </div>
                
                <div>
                  <label for="emergency_contact" class="block text-sm font-medium text-gray-300 mb-2">Contact d'urgence</label>
                  <input 
                    type="text" 
                    id="emergency_contact" 
                    v-model="formData.emergency_contact" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Personne à contacter en urgence"
                    :disabled="submitting"
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="living_situation" class="block text-sm font-medium text-gray-300 mb-2">Situation de logement</label>
                  <textarea 
                    id="living_situation" 
                    v-model="formData.living_situation" 
                    rows="3"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Décrivez la situation de logement"
                    :disabled="submitting"
                  ></textarea>
                </div>
                
                <div>
                  <label for="mobility_info" class="block text-sm font-medium text-gray-300 mb-2">Informations de mobilité</label>
                  <textarea 
                    id="mobility_info" 
                    v-model="formData.mobility_info" 
                    rows="3"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Transport, autonomie, etc."
                    :disabled="submitting"
                  ></textarea>
                </div>
              </div>
              
              <div>
                <label for="health_info_summary" class="block text-sm font-medium text-gray-300 mb-2">Résumé informations de santé</label>
                <textarea 
                  id="health_info_summary" 
                  v-model="formData.health_info_summary" 
                  rows="3"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Informations médicales pertinentes"
                  :disabled="submitting"
                ></textarea>
              </div>
              
              <div>
                <label for="educational_background" class="block text-sm font-medium text-gray-300 mb-2">Parcours scolaire</label>
                <textarea 
                  id="educational_background" 
                  v-model="formData.educational_background" 
                  rows="3"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Niveau d'études, formations suivies..."
                  :disabled="submitting"
                ></textarea>
              </div>
            </div>
            
            <!-- Onglet Situation professionnelle -->
            <div v-if="activeTab === 'professional'" class="space-y-8">
              <div>
                <label for="esat_id" class="block text-sm font-medium text-gray-300 mb-2">ESAT assigné</label>
                <select 
                  id="esat_id" 
                  v-model="formData.esat_id" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200" 
                  :disabled="submitting || loadingEsats"
                >
                  <option :value="null">Aucun ESAT assigné</option>
                  <option v-if="loadingEsats" disabled>Chargement des ESATs...</option>
                  <option v-for="esatOption in esats" :key="esatOption.id" :value="esatOption.id">
                    {{ esatOption.name }}
                  </option>
                </select>
              </div>
              
              <div>
                <label for="entry_date_esat" class="block text-sm font-medium text-gray-300 mb-2">Date d'entrée ESAT</label>
                <input 
                  type="date" 
                  id="entry_date_esat" 
                  v-model="formData.entry_date_esat" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  :disabled="submitting"
                >
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="work_regime" class="block text-sm font-medium text-gray-300 mb-2">Régime de travail</label>
                  <select 
                    id="work_regime" 
                    v-model="formData.work_regime" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    :disabled="submitting"
                  >
                    <option value="">Sélectionner un régime</option>
                    <option value="full-time">Temps plein</option>
                    <option value="part-time">Temps partiel</option>
                  </select>
                </div>
                
                <div v-if="formData.work_regime === 'part-time'">
                  <label for="part_time_percentage" class="block text-sm font-medium text-gray-300 mb-2">Pourcentage temps partiel (%)</label>
                  <input 
                    type="number" 
                    id="part_time_percentage" 
                    v-model="formData.part_time_percentage" 
                    min="1"
                    max="100"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Ex: 80"
                    :disabled="submitting"
                  >
                </div>
              </div>
              
              <div>
                <label for="work_hours" class="block text-sm font-medium text-gray-300 mb-2">Horaires de travail</label>
                <input 
                  type="text" 
                  id="work_hours" 
                  v-model="formData.work_hours" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Ex: 9h-17h, Lundi-Vendredi"
                  :disabled="submitting"
                >
              </div>
              
              <div>
                <label for="professional_background_summary" class="block text-sm font-medium text-gray-300 mb-2">Résumé du parcours professionnel</label>
                <textarea 
                  id="professional_background_summary" 
                  v-model="formData.professional_background_summary" 
                  rows="4"
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Expériences professionnelles passées, compétences..."
                  :disabled="submitting"
                ></textarea>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="activity_sectors" class="block text-sm font-medium text-gray-300 mb-2">Secteurs d'activité</label>
                  <input 
                    type="text" 
                    id="activity_sectors" 
                    v-model="formData.activity_sectors" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Ex: Espaces verts, Restauration, Mécanique..."
                    :disabled="submitting"
                  >
                  <p class="mt-1 text-xs text-gray-400">Séparez les secteurs par des virgules</p>
                </div>
                
                <div>
                  <label for="activity_sectors_other" class="block text-sm font-medium text-gray-300 mb-2">Autres secteurs</label>
                  <input 
                    type="text" 
                    id="activity_sectors_other" 
                    v-model="formData.activity_sectors_other" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Autres secteurs d'intérêt..."
                    :disabled="submitting"
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="vigilance_points" class="block text-sm font-medium text-gray-300 mb-2">Points de vigilance</label>
                  <textarea 
                    id="vigilance_points" 
                    v-model="formData.vigilance_points" 
                    rows="3"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Points à surveiller, difficultés particulières..."
                    :disabled="submitting"
                  ></textarea>
                </div>
                
                <div>
                  <label for="vigilance_actions" class="block text-sm font-medium text-gray-300 mb-2">Actions de vigilance</label>
                  <textarea 
                    id="vigilance_actions" 
                    v-model="formData.vigilance_actions" 
                    rows="3"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Actions à mettre en place..."
                    :disabled="submitting"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <!-- Onglet Compétences et évaluations -->
            <div v-if="activeTab === 'skills'" class="space-y-8">
              <!-- Compétences de base -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 class="text-lg font-semibold text-white mb-4">Compétences de base</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="reading_skills" class="block text-sm font-medium text-gray-300 mb-2">Compétences en lecture</label>
                    <select 
                      id="reading_skills" 
                      v-model="formData.reading_skills" 
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      :disabled="submitting"
                    >
                      <option value="">Sélectionner un niveau</option>
                      <option value="cannot_read">Ne sait pas lire</option>
                      <option value="can_read_letters">Reconnaît les lettres</option>
                      <option value="can_read_words">Peut lire des mots simples</option>
                      <option value="can_read_sentences">Peut lire des phrases</option>
                      <option value="can_read_with_comprehension">Peut lire avec compréhension</option>
                      <option value="can_read_complex_texts">Peut lire des textes complexes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="writing_skills" class="block text-sm font-medium text-gray-300 mb-2">Compétences en écriture</label>
                    <div class="space-y-2">
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_copy" value="can_copy" v-model="writingSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_copy" class="ml-2 text-sm text-gray-300">Peut copier</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_write_letters" value="can_write_letters" v-model="writingSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_write_letters" class="ml-2 text-sm text-gray-300">Peut écrire des lettres</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_write_words" value="can_write_words" v-model="writingSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_write_words" class="ml-2 text-sm text-gray-300">Peut écrire des mots</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_write_sentences" value="can_write_sentences" v-model="writingSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_write_sentences" class="ml-2 text-sm text-gray-300">Peut écrire des phrases</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_write_texts" value="can_write_texts" v-model="writingSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_write_texts" class="ml-2 text-sm text-gray-300">Peut écrire des textes</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label for="calculation_skills" class="block text-sm font-medium text-gray-300 mb-2">Compétences en calcul</label>
                    <div class="space-y-2">
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_count" value="can_count" v-model="calculationSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_count" class="ml-2 text-sm text-gray-300">Peut compter</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_perform_operations" value="can_perform_operations" v-model="calculationSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_perform_operations" class="ml-2 text-sm text-gray-300">Peut effectuer des opérations</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_add" value="can_add" v-model="calculationSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_add" class="ml-2 text-sm text-gray-300">Peut additionner</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_subtract" value="can_subtract" v-model="calculationSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_subtract" class="ml-2 text-sm text-gray-300">Peut soustraire</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_multiply" value="can_multiply" v-model="calculationSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_multiply" class="ml-2 text-sm text-gray-300">Peut multiplier</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_divide" value="can_divide" v-model="calculationSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_divide" class="ml-2 text-sm text-gray-300">Peut diviser</label>
                      </div>
                      <div class="flex items-center">
                        <input type="checkbox" id="create_can_solve_problems" value="can_solve_problems" v-model="calculationSkillsArray" class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded">
                        <label for="create_can_solve_problems" class="ml-2 text-sm text-gray-300">Peut résoudre des problèmes</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label for="computer_skills" class="block text-sm font-medium text-gray-300 mb-2">Compétences informatiques</label>
                    <input 
                      type="text" 
                      id="computer_skills" 
                      v-model="formData.computer_skills" 
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Ex: Utilisation basique, logiciels..."
                      :disabled="submitting"
                    >
                  </div>
                </div>
                
                <div class="mt-6">
                  <label for="computer_skills_comments" class="block text-sm font-medium text-gray-300 mb-2">Commentaires sur les compétences informatiques</label>
                  <textarea 
                    id="computer_skills_comments" 
                    v-model="formData.computer_skills_comments" 
                    rows="3"
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Détails sur l'utilisation de l'informatique..."
                    :disabled="submitting"
                  ></textarea>
                </div>
              </div>
              
              <!-- Évaluations -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 class="text-lg font-semibold text-white mb-4">Évaluations</h4>
                
                <div class="space-y-6">
                  <div>
                    <label for="professional_evaluation_comments" class="block text-sm font-medium text-gray-300 mb-2">Commentaires évaluation professionnelle</label>
                    <textarea 
                      id="professional_evaluation_comments" 
                      v-model="formData.professional_evaluation_comments" 
                      rows="4"
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Observations sur les capacités professionnelles..."
                      :disabled="submitting"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label for="social_relations_comments" class="block text-sm font-medium text-gray-300 mb-2">Commentaires relations sociales</label>
                    <textarea 
                      id="social_relations_comments" 
                      v-model="formData.social_relations_comments" 
                      rows="4"
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Observations sur les relations avec les collègues, encadrement..."
                      :disabled="submitting"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <!-- Capacités -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 class="text-lg font-semibold text-white mb-4">Capacités et clarté du projet</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="professional_project_clarity" class="block text-sm font-medium text-gray-300 mb-2">Clarté du projet professionnel (1-10)</label>
                    <input 
                      type="number" 
                      id="professional_project_clarity" 
                      v-model="formData.professional_project_clarity" 
                      min="1"
                      max="10"
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Note de 1 à 10"
                      :disabled="submitting"
                    >
                  </div>
                  
                  <div>
                    <label for="ordinary_work_capacity" class="block text-sm font-medium text-gray-300 mb-2">Capacité de travail en milieu ordinaire (1-10)</label>
                    <input 
                      type="number" 
                      id="ordinary_work_capacity" 
                      v-model="formData.ordinary_work_capacity" 
                      min="1"
                      max="10"
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Note de 1 à 10"
                      :disabled="submitting"
                    >
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Onglet Documents et projet -->
            <div v-if="activeTab === 'documents'" class="space-y-8">
              <!-- Upload PDF -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Import automatique depuis PDF (IA)
                </h4>
                
                <div class="space-y-4">
                  <div class="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-400/50 transition-colors duration-200">
                    <input
                      type="file"
                      ref="fileInput"
                      @change="handleFileSelect"
                      accept=".pdf"
                      class="hidden"
                      :disabled="submitting || extracting"
                    />
                    
                    <div v-if="!extracting">
                      <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p class="text-white font-medium mb-2">Cliquez pour sélectionner un fichier PDF</p>
                      <p class="text-gray-400 text-sm">L'IA extraira automatiquement les informations du travailleur</p>
                      <button
                        type="button"
                        @click="$refs.fileInput.click()"
                        class="mt-4 inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200"
                        :disabled="submitting || extracting"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Sélectionner un PDF
                      </button>
                    </div>
                    
                    <!-- Message d'erreur PDF -->
                    <div v-if="pdfError" class="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <div class="flex items-start">
                        <svg class="h-5 w-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-red-300 text-sm">{{ pdfError }}</span>
                      </div>
                    </div>
                    
                    <!-- Message de succès PDF -->
                    <div v-if="pdfSuccess" class="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                      <div class="flex items-start">
                        <svg class="h-5 w-5 text-pink-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-pink-300 text-sm">{{ pdfSuccess }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Documents disponibles -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 class="text-lg font-semibold text-white mb-4">Documents disponibles</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div class="flex items-center">
                      <input 
                        type="checkbox" 
                        id="has_cv" 
                        v-model="formData.has_cv" 
                        class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        :disabled="submitting"
                      >
                      <div class="ml-3">
                        <label for="has_cv" class="text-sm font-medium text-white">CV disponible</label>
                        <p class="text-xs text-gray-400">Curriculum vitae</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div class="flex items-center">
                      <input 
                        type="checkbox" 
                        id="has_motivation_letter" 
                        v-model="formData.has_motivation_letter" 
                        class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        :disabled="submitting"
                      >
                      <div class="ml-3">
                        <label for="has_motivation_letter" class="text-sm font-medium text-white">Lettre de motivation</label>
                        <p class="text-xs text-gray-400">Lettre de candidature</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div class="flex items-center">
                      <input 
                        type="checkbox" 
                        id="has_cpf_account" 
                        v-model="formData.has_cpf_account" 
                        class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        :disabled="submitting"
                      >
                      <div class="ml-3">
                        <label for="has_cpf_account" class="text-sm font-medium text-white">Compte CPF</label>
                        <p class="text-xs text-gray-400">Compte personnel de formation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Projet professionnel -->
              <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 class="text-lg font-semibold text-white mb-4">Projet professionnel</h4>
                
                <div class="space-y-6">
                  <div>
                    <label for="employer_work_willingness" class="block text-sm font-medium text-gray-300 mb-2">Volonté de travail chez un employeur</label>
                    <textarea 
                      id="employer_work_willingness" 
                      v-model="formData.employer_work_willingness" 
                      rows="3"
                      class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                      placeholder="Motivation, objectifs professionnels..."
                      :disabled="submitting"
                    ></textarea>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="desired_job_field" class="block text-sm font-medium text-gray-300 mb-2">Domaine professionnel souhaité</label>
                      <input 
                        type="text" 
                        id="desired_job_field" 
                        v-model="formData.desired_job_field" 
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="Ex: Espaces verts, Cuisine, Mécanique..."
                        :disabled="submitting"
                      >
                    </div>
                    
                    <div>
                      <label for="desired_companies" class="block text-sm font-medium text-gray-300 mb-2">Entreprises souhaitées</label>
                      <input 
                        type="text" 
                        id="desired_companies" 
                        v-model="formData.desired_companies" 
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="Noms d'entreprises cibles..."
                        :disabled="submitting"
                      >
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="geographic_mobility" class="block text-sm font-medium text-gray-300 mb-2">Mobilité géographique</label>
                      <select 
                        id="geographic_mobility" 
                        v-model="formData.geographic_mobility" 
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        :disabled="submitting"
                      >
                        <option value="">Sélectionner</option>
                        <option value="locale">Locale uniquement</option>
                        <option value="departement">À l'échelle du département</option>
                        <option value="region">À l'échelle de la région</option>
                        <option value="nationale">Nationale</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    
                    <div v-if="formData.geographic_mobility === 'autre'">
                      <label for="geographic_mobility_other" class="block text-sm font-medium text-gray-300 mb-2">Préciser la mobilité</label>
                      <input 
                        type="text" 
                        id="geographic_mobility_other" 
                        v-model="formData.geographic_mobility_other" 
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="Précisez..."
                        :disabled="submitting"
                      >
                    </div>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label for="exceptional_experiences" class="block text-sm font-medium text-gray-300 mb-2">Expériences exceptionnelles</label>
                      <textarea 
                        id="exceptional_experiences" 
                        v-model="formData.exceptional_experiences" 
                        rows="3"
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="Expériences marquantes, réussites..."
                        :disabled="submitting"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label for="project_difficulties" class="block text-sm font-medium text-gray-300 mb-2">Difficultés du projet</label>
                      <textarea 
                        id="project_difficulties" 
                        v-model="formData.project_difficulties" 
                        rows="3"
                        class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                        placeholder="Obstacles, défis à surmonter..."
                        :disabled="submitting"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Boutons -->
            <div class="flex justify-end space-x-4 pt-8 border-t border-white/10 mt-8">
              <NuxtLink to="/workers" class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 border border-white/20">
                Annuler
              </NuxtLink>
              <button 
                type="submit" 
                :disabled="submitting"
                class="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="submitting" class="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {{ submitting ? 'Création...' : 'Créer le travailleur' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form state
const formData = ref({
  first_name: '',
  last_name: '',
  birth_date: '',
  internal_code: '',
  contact_info: '',
  living_situation: '',
  medical_info: '',
  esat_id: null,
  entry_date_esat: '',
  work_regime: '',
  part_time_percentage: null,
  work_hours: '',
  mobility_info: '',
  protection_measure: '',
  health_info_summary: '',
  educational_background: '',
  professional_background_summary: '',
  legal_guardian: '',
  emergency_contact: '',
  activity_sectors: '',
  activity_sectors_other: '',
  vigilance_points: '',
  vigilance_actions: '',
  spatial_temporal_orientation: null,
  reading_skills: '',
  writing_skills: '',
  calculation_skills: '',
  computer_skills: '',
  computer_skills_comments: '',
  professional_evaluation: null,
  professional_evaluation_comments: '',
  social_relations: null,
  social_relations_comments: '',
  has_cv: false,
  has_motivation_letter: false,
  has_cpf_account: false,
  employer_work_willingness: '',
  desired_job_field: '',
  desired_companies: '',
  geographic_mobility: '',
  geographic_mobility_other: '',
  professional_experiences: null,
  declined_applications: null,
  exceptional_experiences: '',
  project_difficulties: '',
  professional_project_clarity: null,
  ordinary_work_capacity: null
});

const submitting = ref(false);
const error = ref(null);
const success = ref(false);
const activeTab = ref('personal');
const createdWorkerId = ref(null);

// ESATs loading state
const esats = ref([]);
const loadingEsats = ref(true);

// PDF extraction state
const extracting = ref(false);
const pdfError = ref(null);
const pdfSuccess = ref(null);
const fileInput = ref(null);

// Compétences en tableaux pour les checkboxes
const writingSkillsArray = ref([]);
const calculationSkillsArray = ref([]);

// Watchers pour synchroniser les tableaux avec les champs string
watch(writingSkillsArray, (newVal) => {
  formData.value.writing_skills = newVal.join(',');
}, { deep: true });

watch(calculationSkillsArray, (newVal) => {
  formData.value.calculation_skills = newVal.join(',');
}, { deep: true });

// Load ESATs on mount
onMounted(async () => {
  try {
    const response = await fetch('/api/esats');
    if (response.ok) {
      const data = await response.json();
      esats.value = data.data || data;
    }
  } catch (err) {
    console.error('Erreur lors du chargement des ESATs:', err);
  } finally {
    loadingEsats.value = false;
  }
});

// Submit form
const submitForm = async () => {
  try {
    submitting.value = true;
    error.value = null;
    
    // Copie des données pour éviter de modifier l'original
    const dataToSend = { ...formData.value };
    
    // Conversion explicite des types numériques si nécessaire
    if (dataToSend.esat_id) {
      dataToSend.esat_id = Number(dataToSend.esat_id);
    }
    if (dataToSend.part_time_percentage) {
      dataToSend.part_time_percentage = Number(dataToSend.part_time_percentage);
    }
    
    console.log('Données envoyées:', dataToSend);
    
    const response = await fetch('/api/workers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erreur HTTP: ${response.status} - ${errorData.message || response.statusText}`);
    }
    
    const newWorker = await response.json();
    createdWorkerId.value = newWorker.id || newWorker.data?.id;
    
    success.value = true;
    
  } catch (err) {
    console.error('Erreur lors de la création du travailleur:', err);
    error.value = `Erreur lors de la création: ${err.message}`;
  } finally {
    submitting.value = false;
  }
};

// Handle PDF file selection
const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.type !== 'application/pdf') {
    pdfError.value = 'Veuillez sélectionner un fichier PDF valide.';
    return;
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    pdfError.value = 'Le fichier PDF ne doit pas dépasser 10MB.';
    return;
  }
  
  pdfError.value = null;
  pdfSuccess.value = null;
  
  try {
    await extractPdfData(file);
  } catch (err) {
    console.error('Erreur lors de l\'extraction PDF:', err);
    pdfError.value = `Erreur lors de l'extraction: ${err.message}`;
  }
};

// Extract data from PDF using AI
const extractPdfData = async (file) => {
  extracting.value = true;
  
  try {
    // Convert file to base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // Remove data:application/pdf;base64, prefix
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    
    // Send to extraction API
    const response = await fetch('/api/extract-pdf-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pdfData: base64Data,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    // Apply extracted data to form
    if (result.extractedData) {
      const extractedData = result.extractedData;
      
      // Update form data with extracted information
      Object.keys(extractedData).forEach(key => {
        if (formData.value.hasOwnProperty(key) && extractedData[key] !== undefined && extractedData[key] !== null) {
          formData.value[key] = extractedData[key];
        }
      });
      
      pdfSuccess.value = 'Données extraites avec succès ! Vérifiez et complétez les informations si nécessaire.';
      
      // Switch to first tab to show extracted data
      activeTab.value = 'personal';
    } else {
      pdfError.value = 'Aucune donnée n\'a pu être extraite du PDF.';
    }
    
  } catch (err) {
    console.error('Erreur extraction PDF:', err);
    pdfError.value = `Erreur lors de l'extraction: ${err.message}`;
  } finally {
    extracting.value = false;
  }
};
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
  
  filter: blur(60px);
}

.light-halo-2 {
  top: 5%;
  left: 5%;
  width: 700px;
  height: 700px;
  
  filter: blur(50px);
}
</style>


