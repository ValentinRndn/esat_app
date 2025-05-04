<template>
  <div>
    <h1 class="page-title">Tableau de Bord ESAT</h1>
    
    <div class="dashboard-stats">
      <div class="stat-card card">
        <h3>ESATs</h3>
        <div class="stat-value">{{ esatCount }}</div>
        <NuxtLink to="/esats" class="btn">Gérer les ESATs</NuxtLink>
      </div>
      
      <div class="stat-card card">
        <h3>Utilisateurs</h3>
        <div class="stat-value">{{ userCount }}</div>
        <NuxtLink to="/users" class="btn">Gérer les Utilisateurs</NuxtLink>
      </div>
      
      <div class="stat-card card">
        <h3>Travailleurs</h3>
        <div class="stat-value">{{ workerCount }}</div>
        <NuxtLink to="/workers" class="btn">Gérer les Travailleurs</NuxtLink>
      </div>
    </div>
    
    <div class="dashboard-actions card">
      <h2>Actions Rapides</h2>
      <div class="action-buttons">
        <NuxtLink to="/esats/create" class="btn">Ajouter un ESAT</NuxtLink>
        <NuxtLink to="/users/create" class="btn">Ajouter un Utilisateur</NuxtLink>
        <NuxtLink to="/workers/create" class="btn">Ajouter un Travailleur</NuxtLink>
      </div>
    </div>
    
    <div class="recent-activity card">
      <h2>Activité Récente</h2>
      <p v-if="recentActivity.length === 0" class="empty-state">
        Aucune activité récente à afficher.
      </p>
      <ul v-else class="activity-list">
        <li v-for="(activity, index) in recentActivity" :key="index" class="activity-item">
          <span class="activity-time">{{ formatDate(activity.timestamp) }}</span>
          <span class="activity-description">{{ activity.description }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Placeholder data - will be replaced with actual API calls
const esatCount = ref(0);
const userCount = ref(0);
const workerCount = ref(0);
const recentActivity = ref([]);

// Format date helper function
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Fetch data on component mount
onMounted(async () => {
  try {
    // Fetch counts from API
    const [esatsResponse, usersResponse, workersResponse] = await Promise.all([
      fetch('/api/esats'),
      fetch('/api/users'),
      fetch('/api/workers')
    ]);
    
    if (esatsResponse.ok) {
      const esatsData = await esatsResponse.json();
      esatCount.value = esatsData.length;
    }
    
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      userCount.value = usersData.length;
    }
    
    if (workersResponse.ok) {
      const workersData = await workersResponse.json();
      workerCount.value = workersData.length;
    }
    
    // Placeholder for recent activity - would come from a dedicated API endpoint in a real app
    recentActivity.value = [
      { timestamp: new Date(Date.now() - 3600000), description: 'Utilisateur "admin" a ajouté un nouvel ESAT' },
      { timestamp: new Date(Date.now() - 7200000), description: 'Travailleur "Jean Dupont" a été mis à jour' },
      { timestamp: new Date(Date.now() - 86400000), description: 'Nouvel utilisateur "support" a été créé' }
    ];
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
});
</script>

<style scoped>
.page-title {
  margin-bottom: 2rem;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
}

.stat-value {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #3498db;
}

.dashboard-actions {
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.recent-activity {
  margin-bottom: 2rem;
}

.empty-state {
  color: #6c757d;
  font-style: italic;
}

.activity-list {
  list-style: none;
}

.activity-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  font-size: 0.85rem;
  color: #6c757d;
  margin-right: 0.5rem;
}

.activity-description {
  color: #333;
}
</style>
