<template>
  <div>
    <div class="page-header">
      <h1>Ajouter un ESAT</h1>
      <NuxtLink to="/esats" class="btn">Retour à la liste</NuxtLink>
    </div>
    
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-if="success" class="alert alert-success">
      ESAT créé avec succès !
      <div class="mt-2">
        <NuxtLink :to="`/esats/${createdEsatId}`" class="btn btn-sm">Voir l'ESAT</NuxtLink>
        <NuxtLink to="/esats" class="btn btn-sm">Retour à la liste</NuxtLink>
      </div>
    </div>
    
    <form v-if="!success" @submit.prevent="submitForm" class="card">
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
          {{ submitting ? 'Création en cours...' : 'Créer l\'ESAT' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Form state
const formData = ref({
  name: '',
  address: null,
  city: null,
  postal_code: null,
  email: null,
  phone: null
});

const submitting = ref(false);
const error = ref(null);
const success = ref(false);
const createdEsatId = ref(null);

// Reset form to initial state
const resetForm = () => {
  formData.value = {
    name: '',
    address: null,
    city: null,
    postal_code: null,
    email: null,
    phone: null
  };
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
    const response = await fetch('/api/esats', {
      method: 'POST',
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
    const newEsat = await response.json();
    createdEsatId.value = newEsat.id;
    success.value = true;
    
  } catch (err) {
    error.value = `Erreur lors de la création de l'ESAT: ${err.message}`;
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
