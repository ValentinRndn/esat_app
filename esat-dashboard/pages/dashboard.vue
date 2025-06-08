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
            <span class="text-2xl font-semibold text-white">BAYTH</span>
            <span class="ml-4 text-sm text-gray-400">Dashboard</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/users/create" class="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ajouter un utilisateur
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="relative z-10 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Section -->
        <div class="mb-12">
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-green-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-green-400">Tableau de bord</span>
            <span class="text-sm text-gray-300">Vue d'ensemble</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Bienvenue dans votre 
            <span class="text-green-400">espace de gestion</span>
          </h1>
          <p class="text-gray-300 text-lg max-w-2xl">
            Gérez efficacement vos travailleurs, ESATs et utilisateurs depuis cette interface centralisée.
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          
          <!-- Travailleurs Card -->
          <div class="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-200">
                <svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-white">{{ workersCount || 0 }}</div>
                <div class="text-sm text-green-400 font-medium">+12% ce mois</div>
              </div>
            </div>
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-white mb-1">Travailleurs</h3>
              <p class="text-gray-400 text-sm">Travailleurs actifs dans le système</p>
            </div>
            <NuxtLink to="/workers" class="inline-flex items-center text-sm text-green-400 hover:text-green-300 font-medium transition-colors duration-200">
              Voir tous les travailleurs
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- ESAT Card -->
          <div class="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-200">
                <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-white">{{ esatsCount || 0 }}</div>
                <div class="text-sm text-blue-400 font-medium">+3 nouveaux</div>
              </div>
            </div>
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-white mb-1">ESATs</h3>
              <p class="text-gray-400 text-sm">Établissements partenaires</p>
            </div>
            <NuxtLink to="/esats" class="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
              Voir tous les ESATs
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Utilisateurs Card -->
          <div class="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-200">
                <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-white">{{ usersCount || 0 }}</div>
                <div class="text-sm text-purple-400 font-medium">5 en ligne</div>
              </div>
            </div>
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-white mb-1">Utilisateurs</h3>
              <p class="text-gray-400 text-sm">Utilisateurs du système</p>
            </div>
            <NuxtLink to="/users" class="inline-flex items-center text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
              Voir tous les utilisateurs
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Suggestions IA Card -->
          <div class="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 group">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors duration-200">
                <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-white">{{ aiSuggestionsCount || 0 }}</div>
                <div class="text-sm text-yellow-400 font-medium">{{ pendingReviewCount }} à réviser</div>
              </div>
            </div>
            <div class="mb-4">
              <h3 class="text-lg font-semibold text-white mb-1">Suggestions IA</h3>
              <p class="text-gray-400 text-sm">Recommandations générées</p>
            </div>
            <button @click="showAiSuggestions = !showAiSuggestions" class="inline-flex items-center text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200">
              {{ showAiSuggestions ? 'Masquer' : 'Voir les suggestions' }}
              <svg class="w-4 h-4 ml-1" :class="{ 'rotate-180': showAiSuggestions }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Suggestions IA Section -->
        <div v-if="showAiSuggestions" class="mt-8">
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-white">Suggestions IA récentes</h2>
              <div class="flex items-center space-x-3">
                <select v-model="selectedStatus" @change="loadAiSuggestions" class="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm">
                  <option value="">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="completed">Terminé</option>
                  <option value="reviewed">Révisé</option>
                  <option value="applied">Appliqué</option>
                  <option value="rejected">Rejeté</option>
                </select>
                <select v-model="selectedType" @change="loadAiSuggestions" class="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm">
                  <option value="">Tous les types</option>
                  <option value="job_recommendation">Recommandation emploi</option>
                  <option value="skills_assessment">Évaluation compétences</option>
                  <option value="training_plan">Plan de formation</option>
                  <option value="career_guidance">Orientation professionnelle</option>
                </select>
              </div>
            </div>
            
            <!-- Loading state -->
            <div v-if="loadingAiSuggestions" class="flex items-center justify-center py-8">
              <div class="w-8 h-8 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin mr-3"></div>
              <p class="text-gray-300">Chargement des suggestions...</p>
            </div>
            
            <!-- Empty state -->
            <div v-else-if="aiSuggestions.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Aucune suggestion trouvée</h4>
              <p class="text-gray-400">Il n'y a pas encore de suggestions d'IA générées</p>
            </div>
            
            <!-- Suggestions list -->
            <div v-else class="space-y-4">
              <div v-for="suggestion in aiSuggestions" :key="suggestion.id" class="bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
                <!-- En-tête de la suggestion -->
                <div class="p-4">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-3 mb-2">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getStatusClass(suggestion.status)">
                          {{ formatStatus(suggestion.status) }}
                        </span>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getTypeClass(suggestion.suggestion_type)">
                          {{ formatType(suggestion.suggestion_type) }}
                        </span>
                        <span v-if="suggestion.confidence_score" class="text-xs text-gray-400">
                          Confiance: {{ suggestion.confidence_score }}%
                        </span>
                      </div>
                      <h4 class="font-medium text-white mb-1">
                        {{ suggestion.worker_first_name }} {{ suggestion.worker_last_name }}
                      </h4>
                      <p class="text-sm text-gray-300 mb-2 line-clamp-2">
                        {{ suggestion.summary || suggestion.prompt.substring(0, 100) + '...' }}
                      </p>
                      <div class="flex items-center justify-between text-xs text-gray-400">
                        <span>Par {{ suggestion.creator_first_name }} {{ suggestion.creator_last_name }}</span>
                        <span>{{ formatDate(suggestion.created_at) }}</span>
                      </div>
                    </div>
                    <div class="ml-4 flex items-center space-x-2">
                      <button @click="updateSuggestionStatus(suggestion.id, 'reviewed')" v-if="suggestion.status === 'completed'" class="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button @click="toggleSuggestionDetails(suggestion.id)" class="text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
                        <svg class="w-4 h-4 transform transition-transform duration-200" :class="{ 'rotate-180': isSuggestionExpanded(suggestion.id) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Détails déroulants -->
                <div v-if="isSuggestionExpanded(suggestion.id)" class="px-4 pb-4 border-t border-white/10">
                  <div class="pt-4 space-y-4">
                    <!-- Prompt -->
                    <div>
                      <h5 class="text-sm font-semibold text-gray-300 mb-2">Question posée :</h5>
                      <div class="bg-white/5 rounded-lg p-3">
                        <p class="text-sm text-gray-200 whitespace-pre-line">{{ suggestion.prompt }}</p>
                      </div>
                    </div>
                    
                    <!-- Réponse complète -->
                    <div>
                      <h5 class="text-sm font-semibold text-gray-300 mb-2">Réponse de l'IA :</h5>
                      <div class="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-500/20">
                        <p class="text-sm text-gray-100 whitespace-pre-line">{{ suggestion.response }}</p>
                      </div>
                    </div>
                    
                    <!-- Tags si disponibles -->
                    <div v-if="suggestion.tags" class="flex flex-wrap gap-2">
                      <span v-for="tag in suggestion.tags.split(',')" :key="tag" class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                        {{ tag.trim() }}
                      </span>
                    </div>
                    
                    <!-- Informations additionnelles -->
                    <div class="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                      <div>
                        <p class="text-xs text-gray-400">Date de création</p>
                        <p class="text-sm text-gray-200">{{ formatDate(suggestion.created_at) }}</p>
                      </div>
                      <div v-if="suggestion.reviewed_at">
                        <p class="text-xs text-gray-400">Date de révision</p>
                        <p class="text-sm text-gray-200">{{ formatDate(suggestion.reviewed_at) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Load more button -->
            <div v-if="aiSuggestionsPagination.hasMore" class="text-center mt-6">
              <button @click="loadMoreAiSuggestions" class="inline-flex items-center px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-all duration-200 border border-yellow-500/20">
                <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Charger plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// États pour les compteurs
const workersCount = ref(0)
const esatsCount = ref(0)
const usersCount = ref(0)
const aiSuggestionsCount = ref(0)
const pendingReviewCount = ref(0)
const showAiSuggestions = ref(false)
const selectedStatus = ref('')
const selectedType = ref('')
const loadingAiSuggestions = ref(false)
const aiSuggestions = ref([])
const aiSuggestionsPagination = ref({})
const expandedSuggestions = ref(new Set()) // Pour gérer les détails déroulants

// Charger les données au montage du composant
onMounted(async () => {
  try {
    // Charger le nombre de travailleurs
    const workersResponse = await fetch('/api/workers/count')
    if (workersResponse.ok) {
      const workersData = await workersResponse.json()
      workersCount.value = workersData.count
    }

    // Charger le nombre d'ESATs
    const esatsResponse = await fetch('/api/esats/count')
    if (esatsResponse.ok) {
      const esatsData = await esatsResponse.json()
      esatsCount.value = esatsData.count
    }

    // Charger le nombre d'utilisateurs
    const usersResponse = await fetch('/api/users/count')
    if (usersResponse.ok) {
      const usersData = await usersResponse.json()
      usersCount.value = usersData.count
    }

    // Charger le nombre de suggestions IA
    const aiSuggestionsResponse = await fetch('/api/ai-suggestions/count')
    if (aiSuggestionsResponse.ok) {
      const aiSuggestionsData = await aiSuggestionsResponse.json()
      aiSuggestionsCount.value = aiSuggestionsData.count
    }

    // Charger le nombre de suggestions IA en attente de révision
    const pendingReviewResponse = await fetch('/api/ai-suggestions/pending-review-count')
    if (pendingReviewResponse.ok) {
      const pendingReviewData = await pendingReviewResponse.json()
      pendingReviewCount.value = pendingReviewData.count
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  }
})

// Fonctions pour formater les données
const formatStatus = (status) => {
  const statusMap = {
    'pending': 'En attente',
    'completed': 'Terminé',
    'reviewed': 'Révisé',
    'applied': 'Appliqué',
    'rejected': 'Rejeté'
  };
  return statusMap[status] || status;
}

const formatType = (type) => {
  const typeMap = {
    'job_recommendation': 'Recommandation emploi',
    'skills_assessment': 'Évaluation compétences',
    'training_plan': 'Plan de formation',
    'career_guidance': 'Orientation professionnelle'
  };
  return typeMap[type] || type;
}

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const getStatusClass = (status) => {
  const statusClasses = {
    'pending': 'bg-orange-500/20 text-orange-400',
    'completed': 'bg-blue-500/20 text-blue-400',
    'reviewed': 'bg-green-500/20 text-green-400',
    'applied': 'bg-purple-500/20 text-purple-400',
    'rejected': 'bg-red-500/20 text-red-400'
  };
  return statusClasses[status] || 'bg-gray-500/20 text-gray-400';
}

const getTypeClass = (type) => {
  const typeClasses = {
    'job_recommendation': 'bg-blue-500/10 text-blue-300',
    'skills_assessment': 'bg-green-500/10 text-green-300',
    'training_plan': 'bg-purple-500/10 text-purple-300',
    'career_guidance': 'bg-yellow-500/10 text-yellow-300'
  };
  return typeClasses[type] || 'bg-gray-500/10 text-gray-300';
}

// Fonction pour charger les suggestions IA
const loadAiSuggestions = async () => {
  if (loadingAiSuggestions.value) return;
  
  loadingAiSuggestions.value = true;
  try {
    const params = new URLSearchParams({
      limit: '10',
      offset: '0'
    });
    
    if (selectedStatus.value) {
      params.append('status', selectedStatus.value);
    }
    
    if (selectedType.value) {
      params.append('suggestion_type', selectedType.value);
    }
    
    const response = await fetch(`/api/ai-suggestions?${params}`);
    if (response.ok) {
      const data = await response.json();
      aiSuggestions.value = data.data || [];
      aiSuggestionsPagination.value = data.pagination || {};
    } else {
      console.error('Erreur lors du chargement des suggestions IA');
      aiSuggestions.value = [];
    }
  } catch (error) {
    console.error('Erreur lors du chargement des suggestions IA:', error);
    aiSuggestions.value = [];
  } finally {
    loadingAiSuggestions.value = false;
  }
}

// Fonction pour mettre à jour le statut d'une suggestion
const updateSuggestionStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`/api/ai-suggestions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    if (response.ok) {
      // Recharger les suggestions pour refléter le changement
      await loadAiSuggestions();
      
      // Mettre à jour les compteurs
      if (newStatus === 'reviewed') {
        pendingReviewCount.value = Math.max(0, pendingReviewCount.value - 1);
      }
    } else {
      console.error('Erreur lors de la mise à jour du statut');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
  }
}

// Fonction pour basculer l'affichage des détails d'une suggestion
const toggleSuggestionDetails = (suggestionId) => {
  const expanded = new Set(expandedSuggestions.value)
  if (expanded.has(suggestionId)) {
    expanded.delete(suggestionId)
  } else {
    expanded.add(suggestionId)
  }
  expandedSuggestions.value = expanded
}

// Vérifier si une suggestion est dépliée
const isSuggestionExpanded = (suggestionId) => {
  return expandedSuggestions.value.has(suggestionId)
}

// Fonction pour charger plus de suggestions IA
const loadMoreAiSuggestions = async () => {
  if (loadingAiSuggestions.value) return;
  
  loadingAiSuggestions.value = true;
  try {
    const currentOffset = aiSuggestionsPagination.value.offset || 0;
    const limit = aiSuggestionsPagination.value.limit || 10;
    const newOffset = currentOffset + limit;
    
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: newOffset.toString()
    });
    
    if (selectedStatus.value) {
      params.append('status', selectedStatus.value);
    }
    
    if (selectedType.value) {
      params.append('suggestion_type', selectedType.value);
    }
    
    const response = await fetch(`/api/ai-suggestions?${params}`);
    if (response.ok) {
      const data = await response.json();
      
      // Ajouter les nouvelles suggestions à la liste existante
      aiSuggestions.value = [...aiSuggestions.value, ...(data.data || [])];
      aiSuggestionsPagination.value = data.pagination || {};
    } else {
      console.error('Erreur lors du chargement de plus de suggestions IA');
    }
  } catch (error) {
    console.error('Erreur lors du chargement de plus de suggestions IA:', error);
  } finally {
    loadingAiSuggestions.value = false;
  }
}

// Watcher pour charger les suggestions quand la section devient visible
watch(showAiSuggestions, (newValue) => {
  if (newValue && aiSuggestions.value.length === 0) {
    loadAiSuggestions();
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
    linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
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
    rgba(34, 197, 94, 0.25) 0%,
    rgba(34, 197, 94, 0.15) 30%,
    rgba(34, 197, 94, 0.08) 60%,
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
    rgba(34, 197, 94, 0.20) 0%,
    rgba(34, 197, 94, 0.12) 30%,
    rgba(34, 197, 94, 0.06) 60%,
    transparent 100%
  );
  filter: blur(50px);
}
</style> 