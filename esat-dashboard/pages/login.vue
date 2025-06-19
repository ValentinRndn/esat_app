<template>
  <div class="min-h-screen main-gradient-bg relative overflow-hidden flex items-center justify-center">
    
    <!-- Grid Background with fade effect -->
    <div class="absolute inset-0 z-0">
      <div class="grid-pattern"></div>
      <div class="grid-fade-overlay"></div>
      
      <!-- Light Halos -->
      <div class="light-halo light-halo-1"></div>
      <div class="light-halo light-halo-2"></div>
    </div>

    <!-- Login Container -->
    <div class="relative z-10 w-full max-w-md px-4">
      
      <!-- Header with logo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">
          <span class="text-pink-400">BAYTH</span>
        </h1>
        <p class="text-gray-400">Dashboard ESAT</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-white text-center">Connexion</h2>
          <p class="text-gray-400 text-center mt-2">Connectez-vous � votre espace</p>
        </div>

        <!-- Message d'erreur -->
        <div v-if="error" class="bg-red-500/10 backdrop-blur-lg border border-red-500/20 rounded-lg p-4 mb-6">
          <div class="flex items-start">
            <svg class="h-5 w-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-red-300 text-sm">{{ error }}</span>
          </div>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200" 
              placeholder="votre@email.com"
              required
              :disabled="loading"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              class="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              placeholder="Votre mot de passe"
              required
              :disabled="loading"
            >
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full inline-flex items-center justify-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <svg v-if="loading" class="animate-spin w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Informations de test (� supprimer en production) -->
        <div v-if="showTestInfo" class="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 class="text-blue-400 font-medium mb-2">Comptes de test</h4>
          <div class="text-sm text-blue-300 space-y-1">
            <p><strong>Super Admin:</strong> admin@test.com / password123</p>
            <p><strong>User ESAT:</strong> user@esat1.com / password123</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-gray-400 text-sm">
        <p>&copy; 2024 BAYTH Dashboard. Tous droits r�serv�s.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: false, // Pas de layout pour la page de connexion
  auth: false    // Pas d'authentification requise pour cette page
});

const router = useRouter();

const form = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref(null);
const showTestInfo = ref(process.env.NODE_ENV === 'development');

const login = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password
      }
    });

    if (response.success) {
      // Redirection selon le r�le
      if (response.user.role === 'super_admin') {
        await router.push('/dashboard');
      } else {
        await router.push('/workers'); // Les users ESAT vont directement aux travailleurs
      }
    }

  } catch (err) {
    console.error('Erreur de connexion:', err);
    error.value = err.data?.message || 'Erreur de connexion. V�rifiez vos identifiants.';
  } finally {
    loading.value = false;
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


