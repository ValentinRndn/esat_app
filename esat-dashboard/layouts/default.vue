<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <h1>ESAT Dashboard</h1>
      </div>
      <nav class="main-nav">
        <ul>
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/esats">ESATs</NuxtLink></li>
          <li><NuxtLink to="/users">Utilisateurs</NuxtLink></li>
          <li><NuxtLink to="/workers">Travailleurs</NuxtLink></li>
        </ul>
      </nav>
      <div class="user-menu">
        <!-- Placeholder for user menu (login/logout) -->
        <span>Utilisateur</span>
      </div>
    </header>
    
    <main class="app-content">
      <slot />
    </main>
    
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} ESAT Dashboard</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.main-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav li {
  margin: 0 1rem;
}

.main-nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.main-nav a:hover, .main-nav a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-menu {
  cursor: pointer;
}

.app-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  text-align: center;
  color: #6c757d;
}
</style>
