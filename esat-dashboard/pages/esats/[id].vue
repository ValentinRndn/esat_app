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
            <NuxtLink :to="canAccessEsats ? '/esats' : (canAccessDashboard ? '/dashboard' : '/workers')" class="text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-200">BAYTH</NuxtLink>
            <span class="ml-4 text-sm text-gray-400">/ ESATs / Détails</span>
          </div>
          <div class="flex items-center space-x-3">
            <NuxtLink v-if="canEditEsat && esat && esat.id" :to="`/esats/edit/${esat.id}`" class="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Modifier
            </NuxtLink>
            
            <NuxtLink :to="backUrl" class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200">
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
          <div class="inline-flex items-center pl-1 pr-4 py-1 rounded-full bg-blue-500/10 mb-4">
            <span class="text-sm font-semibold text-gray-800 mr-2 rounded-full py-2 px-4 bg-blue-400">ESAT</span>
            <span class="text-sm text-gray-300">Détails de l'établissement</span>
          </div>
          <h1 class="text-4xl font-bold text-white mb-4">
            Profil de 
            <span class="text-blue-400">l'ESAT</span>
          </h1>
        </div>

        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
          <div class="w-12 h-12 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mb-4"></div>
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
        
        <!-- Contenu principal -->
        <div v-else class="space-y-8">
          <!-- En-tête du profil -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div class="p-8">
              <div class="flex items-start space-x-6">
                <!-- Avatar -->
                <div class="w-24 h-24 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span class="text-3xl font-bold text-blue-400">{{ getInitials(esat.name) }}</span>
                </div>
                
                <!-- Informations principales -->
                <div class="flex-1">
                  <h2 class="text-3xl font-bold text-white mb-2">{{ esat.name }}</h2>
                  <div class="flex items-center space-x-4 mb-4">
                    <span class="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      ID: #{{ esat.id }}
                    </span>
                    <span v-if="esat.city" class="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                      📍 {{ esat.city }}
                    </span>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div v-if="esat.email" class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {{ esat.email }}
                    </div>
                    <div v-if="esat.phone" class="flex items-center text-gray-300">
                      <svg class="w-4 h-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {{ esat.phone }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Grille d'informations -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Informations générales -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Informations générales</h3>
              </div>
              
              <div class="space-y-6">
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Nom de l'établissement</p>
                  <p class="text-white">{{ esat.name }}</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Adresse complète</p>
                  <div class="text-white">
                    <p>{{ esat.address || 'Non spécifiée' }}</p>
                    <p>{{ esat.postal_code || '' }} {{ esat.city || '' }}</p>
                  </div>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Email</p>
                  <a v-if="esat.email" :href="`mailto:${esat.email}`" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
                    {{ esat.email }}
                  </a>
                  <p v-else class="text-gray-400">Non spécifié</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Téléphone</p>
                  <a v-if="esat.phone" :href="`tel:${esat.phone}`" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200">
                    {{ esat.phone }}
                  </a>
                  <p v-else class="text-gray-400">Non spécifié</p>
                </div>
              </div>
            </div>
            
            <!-- Informations système -->
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Informations système</h3>
              </div>
              
              <div class="space-y-6">
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Date de création</p>
                  <p class="text-white">{{ formatDate(esat.created_at) }}</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Dernière mise à jour</p>
                  <p class="text-white">{{ formatDate(esat.updated_at) }}</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-400 mb-1">Statistiques</p>
                  <div class="grid grid-cols-2 gap-4 mt-2">
                    <div class="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                      <p class="text-purple-400 text-2xl font-bold">{{ users.length }}</p>
                      <p class="text-gray-300 text-sm">Utilisateurs</p>
                    </div>
                    <div class="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                      <p class="text-orange-400 text-2xl font-bold">{{ workers.length }}</p>
                      <p class="text-gray-300 text-sm">Travailleurs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section Utilisateurs associés -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 011 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Utilisateurs associés</h3>
              </div>
              <NuxtLink to="/users/create" class="inline-flex items-center px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-all duration-200 border border-purple-500/20">
                <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter
              </NuxtLink>
            </div>
            
            <!-- État de chargement utilisateurs -->
            <div v-if="loadingUsers" class="flex items-center justify-center py-8">
              <div class="w-8 h-8 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin mr-3"></div>
              <p class="text-gray-300">Chargement des utilisateurs...</p>
            </div>
            
            <!-- Message d'erreur utilisateurs -->
            <div v-else-if="usersError" class="bg-red-500/10 rounded-lg border border-red-500/20 p-4">
              <div class="flex items-start">
                <svg class="h-5 w-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-red-300">{{ usersError }}</span>
              </div>
            </div>
            
            <!-- État vide utilisateurs -->
            <div v-else-if="users.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Aucun utilisateur associé</h4>
              <p class="text-gray-400 mb-4">Il n'y a pas encore d'utilisateurs liés à cet ESAT</p>
              <NuxtLink to="/users/create" class="inline-flex items-center px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-all duration-200 border border-purple-500/20">
                <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter un utilisateur
              </NuxtLink>
            </div>
            
            <!-- Liste des utilisateurs -->
            <div v-else class="space-y-3">
              <div v-for="user in users" :key="user.id" class="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span class="text-sm font-bold text-purple-400">{{ getUserInitials(user.first_name, user.last_name) }}</span>
                    </div>
                    <div>
                      <h4 class="font-medium text-white">{{ user.first_name }} {{ user.last_name }}</h4>
                      <p class="text-sm text-gray-400">{{ user.email || 'Email non spécifié' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="getRoleClass(user.role)">
                      {{ formatRole(user.role) }}
                    </span>
                    <span class="px-3 py-1 rounded-full text-xs font-semibold" :class="user.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                      {{ user.is_active ? 'Actif' : 'Inactif' }}
                    </span>
                    <NuxtLink :to="`/users/${user.id}`" class="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section Travailleurs associés -->
          <div class="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
                  <svg class="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-white">Travailleurs associés</h3>
              </div>
              <NuxtLink to="/workers/create" class="inline-flex items-center px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-all duration-200 border border-orange-500/20">
                <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter
              </NuxtLink>
            </div>
            
            <!-- État de chargement travailleurs -->
            <div v-if="loadingWorkers" class="flex items-center justify-center py-8">
              <div class="w-8 h-8 border-4 border-white/20 border-t-orange-400 rounded-full animate-spin mr-3"></div>
              <p class="text-gray-300">Chargement des travailleurs...</p>
            </div>
            
            <!-- Message d'erreur travailleurs -->
            <div v-else-if="workersError" class="bg-red-500/10 rounded-lg border border-red-500/20 p-4">
              <div class="flex items-start">
                <svg class="h-5 w-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-red-300">{{ workersError }}</span>
              </div>
            </div>
            
            <!-- État vide travailleurs -->
            <div v-else-if="workers.length === 0" class="text-center py-8">
              <div class="w-16 h-16 mx-auto text-gray-400 mb-4">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Aucun travailleur associé</h4>
              <p class="text-gray-400 mb-4">Il n'y a pas encore de travailleurs liés à cet ESAT</p>
              <NuxtLink to="/workers/create" class="inline-flex items-center px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg transition-all duration-200 border border-orange-500/20">
                <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Ajouter un travailleur
              </NuxtLink>
            </div>
            
            <!-- Liste des travailleurs -->
            <div v-else class="space-y-3">
              <div v-for="worker in workers" :key="worker.id" class="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span class="text-sm font-bold text-orange-400">{{ getUserInitials(worker.first_name, worker.last_name) }}</span>
                    </div>
                    <div>
                      <h4 class="font-medium text-white">{{ worker.first_name }} {{ worker.last_name }}</h4>
                      <p class="text-sm text-gray-400">{{ formatDate(worker.birth_date) || 'Date de naissance non spécifiée' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <span v-if="worker.work_regime" class="px-3 py-1 rounded-full text-xs font-semibold" 
                          :class="worker.work_regime === 'full-time' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'">
                      {{ worker.work_regime === 'full-time' ? 'Temps plein' : 'Temps partiel' }}
                    </span>
                    <span v-if="worker.internal_code" class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400">
                      {{ worker.internal_code }}
                    </span>
                    <NuxtLink :to="`/workers/${worker.id}`" class="text-orange-400 hover:text-orange-300 transition-colors duration-200">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

// Récupérer les permissions et utilisateur
const { user } = useAuth();
const { canAccessEsats, isSuperAdmin, isAdminEsat, canAccessDashboard } = usePermissions();

const esat = ref(null);
const loading = ref(true);
const error = ref(null);

const users = ref([]);
const loadingUsers = ref(false);
const usersError = ref(null);

const workers = ref([]);
const loadingWorkers = ref(false);
const workersError = ref(null);

// Computed pour déterminer où rediriger le bouton retour
const backUrl = computed(() => {
  // Si l'utilisateur peut accéder à la liste des ESATs, rediriger vers /esats
  // Sinon, rediriger vers /workers
  return canAccessEsats.value ? '/esats' : '/workers';
});

// Computed pour déterminer si l'utilisateur peut éditer cet ESAT
const canEditEsat = computed(() => {
  // Seuls les super admins et les admins ESAT peuvent éditer
  return isSuperAdmin.value || isAdminEsat.value;
});

// Get initials helper - version pour nom unique (ESATs)
const getInitials = (name) => {
  if (!name) return '?';
  const words = name.split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
};

// Get initials helper - version pour prénom/nom (Utilisateurs et Travailleurs)
const getUserInitials = (firstName, lastName) => {
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

// Load ESAT data
onMounted(async () => {
  try {
    const response = await fetch(`/api/esats/${id.value}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('ESAT non trouvé');
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    esat.value = data.data || data;
    
    // Load associated users and workers
    await Promise.all([
      loadUsers(),
      loadWorkers()
    ]);
    
  } catch (err) {
    error.value = `Erreur lors du chargement de l'ESAT: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// Load associated users
const loadUsers = async () => {
  loadingUsers.value = true;
  try {
    const response = await fetch(`/api/esats/${id.value}/users`);
    if (response.ok) {
      const data = await response.json();
      users.value = data.data || data;
    }
  } catch (err) {
    usersError.value = `Erreur lors du chargement des utilisateurs: ${err.message}`;
    console.error(err);
  } finally {
    loadingUsers.value = false;
  }
};

// Load associated workers
const loadWorkers = async () => {
  loadingWorkers.value = true;
  try {
    const response = await fetch(`/api/esats/${id.value}/workers`);
    if (response.ok) {
      const data = await response.json();
      workers.value = data.data || data;
    }
  } catch (err) {
    workersError.value = `Erreur lors du chargement des travailleurs: ${err.message}`;
    console.error(err);
  } finally {
    loadingWorkers.value = false;
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
  background: radial-gradient(
    circle,
    rgba(236, 72, 153, 0.25) 0%,
    rgba(236, 72, 153, 0.15) 30%,
    rgba(236, 72, 153, 0.08) 60%,
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
    rgba(236, 72, 153, 0.20) 0%,
    rgba(236, 72, 153, 0.12) 30%,
    rgba(236, 72, 153, 0.06) 60%,
    transparent 100%
  );
  filter: blur(50px);
}
</style>