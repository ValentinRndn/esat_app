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
            <span class="ml-4 text-sm text-gray-400">/ Utilisateurs / Détails</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/users" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </NuxtLink>
            
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
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-purple-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-purple-400">Utilisateur</span>
            <span class="text-sm text-gray-300">Détails du profil</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Profil de 
            <span class="text-purple-400">l'utilisateur</span>
          </h1>
        </div>

        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div class="w-12 h-12 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin mb-4"></div>
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
        
        <!-- Message utilisateur non trouvé -->
        <div v-else-if="!user" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">Utilisateur non trouvé.</span>
          </div>
        </div>
        
        <!-- Contenu principal -->
        <div v-else class="space-y-8">
          <!-- En-tête du profil -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div class="p-8">
              <div class="flex items-start space-x-6">
                <!-- Avatar -->
                <div class="w-24 h-24 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span class="text-3xl font-bold text-purple-400">{{ getInitials(user.first_name, user.last_name) }}</span>
                </div>
                
                <!-- Informations principales -->
                <div class="flex-1">
                  <h2 class="text-3xl font-bold text-white mb-2">
                    {{ user.first_name }} {{ user.last_name }}
                  </h2>
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="px-4 py-2 rounded-full text-sm font-semibold" :class="getRoleClass(user.role)">
                      {{ formatRole(user.role) }}
                    </span>
                    <span class="px-4 py-2 rounded-full text-sm font-semibold" :class="user.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                      {{ user.is_active ? 'Actif' : 'Inactif' }}
                    </span>
                    <span class="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      ID: #{{ user.id }}
                    </span>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ user.email || 'Email non spécifié' }}
                    </div>
                    <div class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18l-3-9H6l-3 9z" />
                      </svg>
                      Créé le {{ formatDate(user.created_at) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Grille d'informations -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Informations personnelles -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Informations personnelles</h3>
              </div>
              
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm font-medium text-gray-400 mb-1">Prénom</p>
                    <p class="text-white">{{ user.first_name }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-400 mb-1">Nom</p>
                    <p class="text-white">{{ user.last_name }}</p>
                  </div>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Adresse email</p>
                  <a v-if="user.email" :href="`mailto:${user.email}`" class="text-purple-400 hover:text-purple-300 hover:underline transition-colors duration-200">
                    {{ user.email }}
                  </a>
                  <p v-else class="text-gray-400">Non spécifié</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Rôle</p>
                  <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="getRoleClass(user.role)">
                    {{ formatRole(user.role) }}
                  </span>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Statut du compte</p>
                  <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="user.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                    {{ user.is_active ? 'Compte actif' : 'Compte inactif' }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Informations ESAT -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Informations ESAT</h3>
              </div>
              
              <div class="space-y-6">
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">ESAT assigné</p>
                  <div v-if="loadingEsat" class="flex items-center text-gray-400">
                    <svg class="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement...
                  </div>
                  <div v-else-if="user.esat_id">
                    <NuxtLink 
                      :to="`/esats/${user.esat_id}`" 
                      class="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {{ esatName || `Voir l'ESAT (ID: ${user.esat_id})` }}
                    </NuxtLink>
                  </div>
                  <p v-else class="text-gray-400">Non assigné</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Date de création</p>
                  <p class="text-white">{{ formatDate(user.created_at) }}</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Dernière mise à jour</p>
                  <p class="text-white">{{ formatDate(user.updated_at) }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Actions avancées -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white">Actions avancées</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button class="inline-flex items-center justify-center px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl transition-all duration-200 border border-blue-500/20">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span class="font-medium text-sm">Réinitialiser</span>
              </button>
              
              <button class="inline-flex items-center justify-center px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-xl transition-all duration-200 border border-yellow-500/20">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span class="font-medium text-sm">Permissions</span>
              </button>
              
              <button v-if="!user.is_active" class="inline-flex items-center justify-center px-4 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-all duration-200 border border-green-500/20">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium text-sm">Activer</span>
              </button>
              
              <button v-else class="inline-flex items-center justify-center px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all duration-200 border border-red-500/20">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium text-sm">Désactiver</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);

const user = ref(null);
const loading = ref(true);
const error = ref(null);
const loadingEsat = ref(false);
const esatName = ref(null);

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

// Format role helper
const formatRole = (role) => {
  if (!role) return 'Non spécifié';
  const roleMap = {
    'admin': 'Administrateur',
    'user': 'Utilisateur',
    'moderator': 'Modérateur',
    'superadmin': 'Super Administrateur'
  };
  return roleMap[role] || role;
};

// Get role class
const getRoleClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-green-500/20 text-green-400';
    case 'user':
      return 'bg-blue-500/20 text-blue-400';
    case 'moderator':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'superadmin':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

// Load user data
onMounted(async () => {
  try {
    const response = await fetch(`/api/users/${id.value}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    user.value = data.data || data;
    
    // Load ESAT name if user has an ESAT
    if (user.value.esat_id) {
      loadEsatName(user.value.esat_id);
    }
    
  } catch (err) {
    error.value = `Erreur lors du chargement de l'utilisateur: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Load ESAT name
const loadEsatName = async (esatId) => {
  loadingEsat.value = true;
  try {
    const response = await fetch(`/api/esats/${esatId}`);
    if (response.ok) {
      const data = await response.json();
      const esat = data.data || data;
      esatName.value = esat.name;
    }
  } catch (err) {
    console.error('Error loading ESAT:', err);
  } finally {
    loadingEsat.value = false;
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