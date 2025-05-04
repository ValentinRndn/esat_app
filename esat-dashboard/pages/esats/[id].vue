<template>
  <div>
    <div class="page-header">
      <h1>Détails de l'ESAT</h1>
      <div class="header-actions">
        <NuxtLink :to="`/esats/${id}/edit`" class="btn">Modifier</NuxtLink>
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
    
    <div v-else>
      <div class="card esat-details">
        <h2>{{ esat.name }}</h2>
        
        <div class="detail-section">
          <h3>Informations générales</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-label">ID</div>
              <div class="detail-value">{{ esat.id }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Adresse</div>
              <div class="detail-value">{{ esat.address || 'Non spécifiée' }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Ville</div>
              <div class="detail-value">{{ esat.city || 'Non spécifiée' }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Code Postal</div>
              <div class="detail-value">{{ esat.postal_code || 'Non spécifié' }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Email</div>
              <div class="detail-value">
                <a v-if="esat.email" :href="`mailto:${esat.email}`">{{ esat.email }}</a>
                <span v-else>Non spécifié</span>
              </div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Téléphone</div>
              <div class="detail-value">
                <a v-if="esat.phone" :href="`tel:${esat.phone}`">{{ esat.phone }}</a>
                <span v-else>Non spécifié</span>
              </div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Créé le</div>
              <div class="detail-value">{{ formatDate(esat.created_at) }}</div>
            </div>
            
            <div class="detail-item">
              <div class="detail-label">Dernière mise à jour</div>
              <div class="detail-value">{{ formatDate(esat.updated_at) }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Section pour les utilisateurs associés à cet ESAT -->
      <div class="card related-data">
        <div class="section-header">
          <h3>Utilisateurs associés</h3>
          <NuxtLink to="/users/create" class="btn btn-sm">Ajouter un utilisateur</NuxtLink>
        </div>
        
        <div v-if="loadingUsers" class="loading">
          Chargement des utilisateurs...
        </div>
        
        <div v-else-if="usersError" class="alert alert-danger">
          {{ usersError }}
        </div>
        
        <div v-else-if="users.length === 0" class="empty-state">
          <p>Aucun utilisateur associé à cet ESAT.</p>
        </div>
        
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.email }}</td>
                <td>{{ formatRole(user.role) }}</td>
                <td>
                  <span :class="user.is_active ? 'status-active' : 'status-inactive'">
                    {{ user.is_active ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="actions">
                  <NuxtLink :to="`/users/${user.id}`" class="btn btn-sm">Voir</NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Section pour les travailleurs associés à cet ESAT -->
      <div class="card related-data">
        <div class="section-header">
          <h3>Travailleurs associés</h3>
          <NuxtLink to="/workers/create" class="btn btn-sm">Ajouter un travailleur</NuxtLink>
        </div>
        
        <div v-if="loadingWorkers" class="loading">
          Chargement des travailleurs...
        </div>
        
        <div v-else-if="workersError" class="alert alert-danger">
          {{ workersError }}
        </div>
        
        <div v-else-if="workers.length === 0" class="empty-state">
          <p>Aucun travailleur associé à cet ESAT.</p>
        </div>
        
        <div v-else>
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Régime de travail</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="worker in workers" :key="worker.id">
                <td>{{ worker.id }}</td>
                <td>{{ worker.last_name }}</td>
                <td>{{ worker.first_name }}</td>
                <td>{{ formatWorkRegime(worker.work_regime) }}</td>
                <td class="actions">
                  <NuxtLink :to="`/workers/${worker.id}`" class="btn btn-sm">Voir</NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
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

// ESAT data
const esat = ref(null);
const loading = ref(true);
const error = ref(null);

// Users data
const users = ref([]);
const loadingUsers = ref(true);
const usersError = ref(null);

// Workers data
const workers = ref([]);
const loadingWorkers = ref(true);
const workersError = ref(null);

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format role helper
const formatRole = (role) => {
  const roleMap = {
    'super_admin': 'Super Administrateur',
    'admin_esat': 'Administrateur ESAT',
    'user_esat': 'Utilisateur ESAT'
  };
  
  return roleMap[role] || role;
};

// Format work regime helper
const formatWorkRegime = (regime) => {
  if (!regime) return 'Non spécifié';
  
  const regimeMap = {
    'full-time': 'Temps plein',
    'part-time': 'Temps partiel'
  };
  
  return regimeMap[regime] || regime;
};

// Fetch ESAT data
onMounted(async () => {
  try {
    // Fetch ESAT details
    const response = await fetch(`/api/esats/${id.value}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ESAT non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    esat.value = await response.json();
    
    // After fetching ESAT, fetch related users and workers
    fetchRelatedUsers();
    fetchRelatedWorkers();
    
  } catch (err) {
    error.value = `Erreur lors du chargement de l'ESAT: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Fetch users related to this ESAT
const fetchRelatedUsers = async () => {
  try {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const allUsers = await response.json();
    
    // Filter users by esat_id
    users.value = allUsers.filter(user => user.esat_id === parseInt(id.value));
    
  } catch (err) {
    usersError.value = `Erreur lors du chargement des utilisateurs: ${err.message}`;
    console.error(err);
  } finally {
    loadingUsers.value = false;
  }
};

// Fetch workers related to this ESAT
const fetchRelatedWorkers = async () => {
  try {
    const response = await fetch('/api/workers');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const allWorkers = await response.json();
    
    // Filter workers by esat_id
    workers.value = allWorkers.filter(worker => worker.esat_id === parseInt(id.value));
    
  } catch (err) {
    workersError.value = `Erreur lors du chargement des travailleurs: ${err.message}`;
    console.error(err);
  } finally {
    loadingWorkers.value = false;
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

.esat-details {
  margin-bottom: 2rem;
}

.esat-details h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: #3498db;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.detail-item {
  margin-bottom: 0.5rem;
}

.detail-label {
  font-weight: bold;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.detail-value {
  color: #333;
}

.related-data {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #3498db;
}

.empty-state {
  padding: 1.5rem;
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

.status-active {
  color: #28a745;
  font-weight: bold;
}

.status-inactive {
  color: #dc3545;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>
