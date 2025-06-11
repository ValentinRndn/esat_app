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
            <span class="ml-4 text-sm text-gray-400">/ ESATs / Modifier</span>
          </div>
          <div class="flex items-center space-x-3">
            <NuxtLink 
              :to="`/esats/${id}`" 
              class="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Voir les détails
            </NuxtLink>
            
            <div class="flex items-center space-x-4">
              <NuxtLink to="/esats" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200">
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
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header Section -->
        <div class="mb-12">
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-green-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-green-400">ESAT</span>
            <span class="text-sm text-gray-300">Modifier les informations</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Modifier 
            <span class="text-green-400">l'ESAT</span>
          </h1>
        </div>

        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div class="w-12 h-12 border-4 border-white/20 border-t-green-400 rounded-full animate-spin mb-4"></div>
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
        
        <!-- Message ESAT non trouvé -->
        <div v-else-if="!esat" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-2xl p-6">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-red-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300">ESAT non trouvé.</span>
          </div>
        </div>
        
        <!-- Message de succès -->
        <div v-else-if="success" class="bg-green-500/10 backdrop-blur-lg border border-green-500/20 rounded-2xl p-6">
          <div class="flex items-start">
            <svg class="h-6 w-6 text-green-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div class="flex-1">
              <span class="text-green-300">ESAT mis à jour avec succès !</span>
              <div class="mt-4 flex space-x-3">
                <NuxtLink 
                  :to="`/esats/${id}`" 
                  class="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Voir les détails
                </NuxtLink>
                <NuxtLink 
                  to="/esats" 
                  class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200"
                >
                  <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Retour à la liste
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Formulaire -->
        <div v-else class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
          <!-- En-tête du formulaire -->
          <div class="px-8 py-6 border-b border-white/10">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-white">Informations de l'ESAT</h2>
            </div>
          </div>
          
          <form @submit.prevent="submitForm" class="p-8">
            <div class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Nom *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200" 
                  required
                  :disabled="submitting"
                  placeholder="Nom de l'ESAT"
                >
              </div>
              
              <div>
                <label for="address" class="block text-sm font-medium text-gray-300 mb-2">Adresse</label>
                <input 
                  type="text" 
                  id="address" 
                  v-model="formData.address" 
                  class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  :disabled="submitting"
                  placeholder="Adresse complète"
                >
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-300 mb-2">Ville</label>
                  <input 
                    type="text" 
                    id="city" 
                    v-model="formData.city" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    :disabled="submitting"
                    placeholder="Ville"
                  >
                </div>
                
                <div>
                  <label for="postal_code" class="block text-sm font-medium text-gray-300 mb-2">Code Postal</label>
                  <input 
                    type="text" 
                    id="postal_code" 
                    v-model="formData.postal_code" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    :disabled="submitting"
                    placeholder="Code postal"
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    :disabled="submitting"
                    placeholder="email@exemple.fr"
                  >
                </div>
                
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="formData.phone" 
                    class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    :disabled="submitting"
                    placeholder="01 23 45 67 89"
                  >
                </div>
              </div>
            </div>
            
            <!-- Footer du formulaire avec boutons d'action -->
            <div class="mt-8 pt-6 border-t border-white/10 flex items-center justify-end gap-4">
              <button 
                type="button" 
                @click="resetForm" 
                class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200 border border-white/20" 
                :disabled="submitting"
              >
                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Réinitialiser
              </button>
              <button 
                type="submit" 
                class="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl" 
                :disabled="submitting"
              >
                <svg v-if="!submitting" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <svg v-else class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ submitting ? 'Mise à jour en cours...' : 'Mettre à jour l\'ESAT' }}
              </button>
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
  name: '',
  address: null,
  city: null,
  postal_code: null,
  email: null,
  phone: null
});

const originalData = ref(null);
const esat = ref(null);
const loading = ref(true);
const submitting = ref(false);
const error = ref(null);
const success = ref(false);

// Fetch ESAT data
onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetch(`/api/esats/${id.value}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ESAT non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API response:', data); // Log pour diagnostic
    
    // Handle if API returns data wrapped in a data property
    esat.value = data.data || data;
    console.log('Extracted ESAT:', esat.value); // Log pour diagnostic
    
    // Initialize form with ESAT data
    formData.value = {
      name: esat.value.name || '',
      address: esat.value.address || null,
      city: esat.value.city || null,
      postal_code: esat.value.postal_code || null,
      email: esat.value.email || null,
      phone: esat.value.phone || null
    };
    
    console.log('Form data initialized:', formData.value); // Log pour diagnostic
    
    // Save original data for reset
    originalData.value = { ...formData.value };
    
  } catch (err) {
    console.error('Erreur lors du chargement de l\'ESAT:', err);
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
    
    // Convertir les chaînes vides en null
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === '') {
        dataToSend[key] = null;
      }
    });
    
    console.log('Données envoyées:', dataToSend);
    
    const response = await fetch(`/api/esats/${id.value}`, {
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
    
    const updateResponse = await response.json();
    console.log('Update response:', updateResponse); // Log pour diagnostic
    
    // Handle if API returns data wrapped in a data property
    esat.value = updateResponse.data || updateResponse;
    console.log('Updated ESAT:', esat.value); // Log pour diagnostic
    
    // Mettre à jour originalData pour la réinitialisation
    originalData.value = { ...formData.value };
    
    success.value = true;
    
    // Redirection après 2 secondes
    setTimeout(() => {
      success.value = false;
    }, 2000);
    
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'ESAT:', err);
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

<style scoped>
/* Grid Background */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  position: absolute;
  inset: 0;
}

.grid-fade-overlay {
  background: radial-gradient(
    circle at center,
    transparent 0%,
    rgba(17, 24, 39, 0.3) 50%,
    rgba(17, 24, 39, 0.8) 100%
  );
  position: absolute;
  inset: 0;
}

/* Light Halos */
.light-halo {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(60px);
}

.light-halo-1 {
  top: -10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.15) 0%,
    rgba(34, 197, 94, 0.08) 30%,
    rgba(34, 197, 94, 0.03) 60%,
    transparent 100%
  );
}

.light-halo-2 {
  bottom: -15%;
  left: -15%;
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.12) 0%,
    rgba(59, 130, 246, 0.06) 30%,
    rgba(59, 130, 246, 0.02) 60%,
    transparent 100%
  );
}

/* Smooth transitions for form elements */
.form-input {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.1);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style> 