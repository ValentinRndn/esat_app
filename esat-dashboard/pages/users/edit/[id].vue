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
            <span class="ml-4 text-sm text-gray-400">/ Utilisateurs / Éditer</span>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/users" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200">
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
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-purple-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-purple-400">Édition</span>
            <span class="text-sm text-gray-300">Modifier l'utilisateur</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Éditer 
            <span class="text-purple-400">l'utilisateur</span>
          </h1>
        </div>

        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div class="w-12 h-12 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-300">Chargement des données...</p>
        </div>
        
        <!-- Message d'erreur -->
        <div v-else-if="error" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6 mb-8">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">{{ error }}</span>
          </div>
        </div>
        
        <!-- Message utilisateur non trouvé -->
        <div v-else-if="!user" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6 mb-8">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">Utilisateur non trouvé.</span>
          </div>
        </div>
        
        <!-- Message de succès -->
        <div v-else-if="success" class="bg-green-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6 mb-8">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-green-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div class="flex-1">
              <span class="text-green-300">Utilisateur mis à jour avec succès !</span>
              <div class="mt-4 flex space-x-3">
                <NuxtLink :to="`/users/${id}`" class="inline-flex items-center px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-all duration-200 border border-purple-500/20">
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Voir les détails
                </NuxtLink>
                <NuxtLink to="/users" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 border border-white/20">
                  <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Retour à la liste
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Formulaire d'édition -->
        <div v-else class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <!-- En-tête du formulaire -->
          <div class="flex items-center p-8 border-b border-white/10">
            <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-white">Modifier les informations</h2>
          </div>
          
          <!-- Formulaire -->
          <form @submit.prevent="submitForm" class="p-8">
            <div class="space-y-8">
              <!-- Nom et prénom -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="first_name" class="block text-sm font-medium text-gray-300 mb-2">Prénom *</label>
                  <input 
                    type="text" 
                    id="first_name" 
                    v-model="formData.first_name" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" 
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
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" 
                    placeholder="Entrez le nom"
                    required
                    :disabled="submitting"
                  >
                </div>
              </div>
              
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" 
                  placeholder="exemple@email.com"
                  required
                  :disabled="submitting"
                >
              </div>
              
              <!-- Mot de passe -->
              <div>
                <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Nouveau mot de passe</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="formData.password" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  placeholder="Laisser vide pour ne pas changer"
                  :disabled="submitting"
                >
                <p class="mt-2 text-sm text-gray-400">Si vous remplissez ce champ, le mot de passe de l'utilisateur sera changé.</p>
              </div>
              
              <!-- Rôle et ESAT -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="role" class="block text-sm font-medium text-gray-300 mb-2">Rôle *</label>
                  <select 
                    id="role" 
                    v-model="formData.role" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" 
                    required
                    :disabled="submitting"
                  >
                    <option value="super_admin">Super Administrateur</option>
                    <option value="admin_esat">Administrateur ESAT</option>
                    <option value="user_esat">Utilisateur ESAT</option>
                  </select>
                </div>
                
                <div>
                  <label for="esat_id" class="block text-sm font-medium text-gray-300 mb-2">ESAT (Optionnel)</label>
                  <select 
                    id="esat_id" 
                    v-model="formData.esat_id" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200" 
                    :disabled="submitting || loadingEsats"
                  >
                    <option :value="null">Aucun ESAT assigné</option>
                    <option v-if="loadingEsats" disabled>Chargement des ESATs...</option>
                    <option v-for="esatOption in esats" :key="esatOption.id" :value="esatOption.id">
                      {{ esatOption.name }}
                    </option>
                  </select>
                  <div v-if="esatsError" class="mt-2 text-sm text-red-400">{{ esatsError }}</div>
                  <div v-if="loadingEsats" class="mt-2 text-sm text-gray-400 flex items-center">
                    <svg class="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement des ESATs...
                  </div>
                </div>
              </div>
              
              <!-- Statut actif -->
              <div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="is_active" 
                    v-model="formData.is_active" 
                    class="w-4 h-4 text-purple-600 bg-white/5 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                    :disabled="submitting"
                  >
                  <label for="is_active" class="ml-3 text-sm font-medium text-gray-300">
                    Compte actif
                  </label>
                </div>
                <p class="mt-2 text-sm text-gray-400">Décochez cette case pour désactiver le compte utilisateur.</p>
              </div>
              
              <!-- Boutons -->
              <div class="flex justify-end space-x-4 pt-6">
                <NuxtLink to="/users" class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 border border-white/20">
                  Annuler
                </NuxtLink>
                <button 
                  type="submit" 
                  :disabled="submitting"
                  class="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="submitting" class="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ submitting ? 'Mise à jour...' : 'Mettre à jour' }}
                </button>
              </div>
            </div>
          </form>
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

// Form state
const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  role: 'user_esat',
  esat_id: null,
  is_active: true
});

const user = ref(null);
const originalData = ref(null);
const loading = ref(true);
const submitting = ref(false);
const error = ref(null);
const success = ref(false);

// ESATs loading state
const esats = ref([]);
const loadingEsats = ref(true);
const esatsError = ref(null);

// Fetch user data
onMounted(async () => {
  try {
    loading.value = true;
    
    // Charger les données de l'utilisateur
    const userResponse = await fetch(`/api/users/${id.value}`);
    
    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      throw new Error(`Erreur HTTP: ${userResponse.status}`);
    }
    
    const responseData = await userResponse.json();
    user.value = responseData.data || responseData; // Gérer les deux formats de réponse
    
    // Initialiser le formulaire avec les données de l'utilisateur
    formData.value = {
      first_name: user.value.first_name || '',
      last_name: user.value.last_name || '',
      email: user.value.email || '',
      password: '', // Toujours vide pour des raisons de sécurité
      role: user.value.role || 'user_esat',
      esat_id: user.value.esat_id || null,
      is_active: user.value.is_active !== undefined ? user.value.is_active : true
    };
    
    // Sauvegarder les données originales pour la réinitialisation
    originalData.value = { ...formData.value };
    
    // Charger les ESATs disponibles
    try {
      loadingEsats.value = true;
      const esatsResponse = await fetch('/api/esats');
      
      if (!esatsResponse.ok) {
        throw new Error(`Erreur HTTP: ${esatsResponse.status}`);
      }
      
      const esatsData = await esatsResponse.json();
      esats.value = Array.isArray(esatsData) ? esatsData : (esatsData.data || []);
    } catch (esatsErr) {
      console.error('Erreur lors du chargement des ESATs:', esatsErr);
      esatsError.value = `Erreur lors du chargement des ESATs: ${esatsErr.message}`;
    } finally {
      loadingEsats.value = false;
    }
    
  } catch (err) {
    console.error('Erreur lors du chargement de l\'utilisateur:', err);
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
    
    // Supprimer les champs qui ne doivent pas être envoyés
    if (!dataToSend.password.trim()) {
      delete dataToSend.password;
    }
    
    // Conversion explicite des types numériques si nécessaire
    if (dataToSend.esat_id) {
      dataToSend.esat_id = Number(dataToSend.esat_id);
    }
    
    console.log('Données envoyées:', dataToSend);
    
    const response = await fetch(`/api/users/${id.value}`, {
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
    
    const updatedUser = await response.json();
    user.value = updatedUser;
    
    // Mettre à jour originalData pour la réinitialisation
    originalData.value = { ...formData.value };
    
    success.value = true;
    
    // Redirection après 2 secondes
    setTimeout(() => {
      success.value = false;
    }, 2000);
    
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
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