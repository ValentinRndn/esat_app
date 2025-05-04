<template>
  <div>
    <div class="page-header">
      <h1>Modifier l'ESAT</h1>
      <div class="header-actions">
        <NuxtLink :to="`/esats/${id}`" class="btn">Voir les détails</NuxtLink>
        <NuxtLink to="/esats" class="btn">Retour à la liste</NuxtLink>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      Chargement des données...
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="!esat" class="alert alert-danger">
      ESAT non trouvé.
    </div>
    
    <div v-else-if="success" class="alert alert-success">
      ESAT mis à jour avec succès !
      <div class="mt-2">
        <NuxtLink :to="`/esats/${id}`" class="btn btn-sm">Voir les détails</NuxtLink>
        <NuxtLink to="/esats" class="btn btn-sm">Retour à la liste</NuxtLink>
      </div>
    </div>
    
    <form v-else @submit.prevent="submitForm" class="card">
      <div class="form-group">
        <label for="name">Nom *</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
          class="form-control" 
          required
          :disabled="submitting"
        >
      </div>
      
      <div class="form-group">
        <label for="address">Adresse</label>
        <input 
          type="text" 
          id="address" 
          v-model="formData.address" 
          class="form-control"
          :disabled="submitting"
        >
      </div>
      
      <div class="form-row">
        <div class="form-group col">
          <label for="city">Ville</label>
          <input 
            type="text" 
            id="city" 
            v-model="formData.city" 
            class="form-control"
            :disabled="submitting"
          >
        </div>
        
        <div class="form-group col">
          <label for="postal_code">Code Postal</label>
          <input 
            type="text" 
            id="postal_code" 
            v-model="formData.postal_code" 
            class="form-control"
            :disabled="submitting"
          >
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group col">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            class="form-control"
            :disabled="submitting"
          >
        </div>
        
        <div class="form-group col">
          <label for="phone">Téléphone</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="formData.phone" 
            class="form-control"
            :disabled="submitting"
          >
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn btn-secondary" :disabled="submitting">
          Réinitialiser
        </button>
        <button type="submit" class="btn" :disabled="submitting">
          {{ submitting ? 'Mise à jour en cours...' : 'Mettre à jour l\'ESAT' }}
        </button>
      </div>
    </form>
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
    const response = await fetch(`/api/esats/${id.value}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ESAT non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    esat.value = await response.json();
    
    // Initialize form with ESAT data
    formData.value = {
      name: esat.value.name,
      address: esat.value.address,
      city: esat.value.city,
      postal_code: esat.value.postal_code,
      email: esat.value.email,
      phone: esat.value.phone
    };
    
    // Store original data for reset functionality
    originalData.value = { ...formData.value };
    
  } catch (err) {
    error.value = `Erreur lors du chargement de l'ESAT: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Reset form to original data
const resetForm = () => {
  if (originalData.value) {
    formData.value = { ...originalData.value };
  }
  error.value = null;
};

// Submit form
const submitForm = async () => {
  // Reset states
  error.value = null;
  submitting.value = true;
  
  try {
    // Clean up form data (convert empty strings to null)
    const cleanedData = { ...formData.value };
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });
    
    // Send request to API
    const response = await fetch(`/api/esats/${id.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cleanedData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || 
        `Erreur HTTP: ${response.status} ${response.statusText}`
      );
    }
    
    // Handle success
    const updatedEsat = await response.json();
    esat.value = updatedEsat;
    
    // Update original data for potential reset
    originalData.value = { ...formData.value };
    
    // Show success message
    success.value = true;
    
  } catch (err) {
    error.value = `Erreur lors de la mise à jour de l'ESAT: ${err.message}`;
    console.error(err);
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>
