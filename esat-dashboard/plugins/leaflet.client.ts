export default defineNuxtPlugin(() => {
  // Ce plugin s'assure que Leaflet est chargé côté client uniquement
  if (process.client) {
    // Configuration globale pour Leaflet si nécessaire
    console.log('Leaflet plugin initialized on client side');
  }
}); 