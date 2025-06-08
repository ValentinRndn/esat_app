<template>
  <div style="
    min-height: 100vh;
    background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: system-ui, -apple-system, sans-serif;
    position: relative;
  ">
    
    <!-- Logo en haut à gauche -->
    <div style="
      position: absolute;
      top: 24px;
      left: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    ">
      <div style="
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #34d399, #10b981);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      ">
        <span style="color: white; font-weight: bold; font-size: 18px;">B</span>
      </div>
      <div>
        <h1 style="font-size: 20px; font-weight: bold; color: white; margin: 0;">
          <span style="color: #34d399;">BAYTH</span>
        </h1>
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Dashboard ESAT</p>
      </div>
    </div>

    <!-- Boutons de connexion en haut à droite -->
    <div style="
      position: absolute;
      top: 24px;
      right: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
    ">
      <a 
        href="/login" 
        style="
          padding: 8px 16px;
          color: #d1d5db;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s;
        "
        onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'"
        onmouseout="this.style.backgroundColor='transparent'"
      >
        Se connecter
      </a>
      <a 
        href="/login" 
        style="
          padding: 8px 16px;
          background: #10b981;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: all 0.2s;
        "
        onmouseover="this.style.backgroundColor='#059669'"
        onmouseout="this.style.backgroundColor='#10b981'"
      >
        Dashboard
      </a>
    </div>

    <!-- Contenu central -->
    <div style="text-align: center;">
      <div style="
        width: 64px;
        height: 64px;
        border: 4px solid rgba(255,255,255,0.2);
        border-top-color: #10b981;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px auto;
      "></div>
      <p style="color: white; font-size: 18px; margin-bottom: 32px;">Page d'accueil - ESAT Dashboard</p>
      
      <a 
        href="/login" 
        style="
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          background: #10b981;
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          box-shadow: 0 10px 15px rgba(0,0,0,0.1);
          transition: all 0.2s;
        "
        onmouseover="this.style.backgroundColor='#059669'"
        onmouseout="this.style.backgroundColor='#10b981'"
      >
        ✨ Accéder au Dashboard
      </a>
    </div>
  </div>
</template>

<script setup>
// Aucun import, aucun composable - page ultra-simple
</script>

<style>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 