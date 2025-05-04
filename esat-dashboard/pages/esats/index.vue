<template>
  <div>
    <div class="page-header">
      <h1>Liste des ESATs</h1>
      <NuxtLink to="/esats/create" class="btn">Ajouter un ESAT</NuxtLink>
    </div>
    
    <div v-if="loading" class="loading">
      Chargement des données...
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="esats.length === 0" class="empty-state card">
      <p>Aucun ESAT trouvé. Commencez par en ajouter un.</p>
      <NuxtLink to="/esats/create" class="btn">Ajouter un ESAT</NuxtLink>
    </div>
    
    <div v-else class="card">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Ville</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="esat in esats" :key="esat.id">
            <td>{{ esat.id }}</td>
            <td>{{ esat.name }}</td>
            <td>{{ esat.city || '-' }}</td>
            <td>{{ esat.email || '-' }}</td>
            <td>{{ esat.phone || '-' }}</td>
            <td class="actions">
              <NuxtLink :to="`/esats/${esat.id}`" class="btn btn-sm">Voir</NuxtLink>
              <NuxtLink :to="`/esats/${esat.id}/edit`" class="btn btn-sm">Modifier</NuxtLink>
              <button @click="confirmDelete(esat)" class="btn btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="modal-backdrop">
      <div class="modal-content card">
        <h3>Confirmer la suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer l'ESAT "{{ esatToDelete?.name }}" ?</p>
        <p class="warning">Cette action est irréversible.</p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="btn">Annuler</button>
          <button @click="deleteEsat" class="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const esats = ref([]);
const loading = ref(true);
const error = ref(null);
const showDeleteModal = ref(false);
const esatToDelete = ref(null);

// Fetch ESATs on component mount
onMounted(async () => {
  try {
    const response = await fetch('/api/esats');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    esats.value = await response.json();
  } catch (err) {
    error.value = `Erreur lors du chargement des ESATs: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Delete confirmation
const confirmDelete = (esat) => {
  esatToDelete.value = esat;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
  esatToDelete.value = null;
};

// Delete ESAT
const deleteEsat = async () => {
  if (!esatToDelete.value) return;
  
  try {
    const response = await fetch(`/api/esats/${esatToDelete.value.id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    // Remove from list
    esats.value = esats.value.filter(e => e.id !== esatToDelete.value.id);
    
    // Close modal
    showDeleteModal.value = false;
    esatToDelete.value = null;
    
  } catch (err) {
    error.value = `Erreur lors de la suppression: ${err.message}`;
    console.error(err);
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

.empty-state {
  text-align: center;
  padding: 3rem;
}

.empty-state p {
  margin-bottom: 1rem;
  color: #6c757d;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
}

.modal-content h3 {
  margin-bottom: 1rem;
}

.modal-content .warning {
  color: #e74c3c;
  margin: 1rem 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
