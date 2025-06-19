# Guide de Déploiement - ESAT Dashboard

## 🚨 Problèmes résolus en production

### 1. **Suggestion IA ne fonctionne pas**
**Cause** : Clé API Gemini hardcodée dans le code au lieu d'utiliser les variables d'environnement.

**Solution** : 
- ✅ Modifié le code pour utiliser `runtimeConfig.geminiApiKey`
- ✅ Ajouté une gestion d'erreur robuste
- ✅ Ajouté des logs de débogage

### 2. **Icônes de carte affichent "Mark"**
**Cause** : Les icônes par défaut de Leaflet ne sont pas disponibles en production.

**Solution** :
- ✅ Configuré les URLs des icônes Leaflet pour utiliser un CDN
- ✅ Ajouté la configuration manuelle des icônes dans `initializeMap()`

### 3. **Bouton "Rechercher entreprises" ne fonctionne pas**
**Cause** : Problème lié aux icônes de carte et possibles erreurs CORS.

**Solution** :
- ✅ Ajouté les headers CORS appropriés
- ✅ Corrigé les icônes de carte

## 📋 Variables d'environnement requises

### Variables **OBLIGATOIRES** pour la production :

```bash
# API Gemini (CRITIQUE - Sans cette clé, les suggestions IA ne fonctionneront pas)
NUXT_GEMINI_API_KEY=AIzaSyA4j8xar5nsXqJ3bSpMyDYntoKqSBRP5To

# Base de données
DB_HOST=your_db_host
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Configuration application
NODE_ENV=production
APP_URL=https://your-domain.com
```

### Variables optionnelles :
```bash
# Stripe (pour les paiements)
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key

# API publique
NUXT_PUBLIC_API_BASE=/api
```

## 🔧 Étapes de déploiement

### 1. **Vérifier la configuration**
Accédez à : `https://votre-domaine.com/api/debug/env`

Vous devriez voir :
```json
{
  "environment": "production",
  "hasGeminiApiKey": true,
  "geminiApiKeyLength": 39,
  "geminiApiKeyPrefix": "AIzaS..."
}
```

### 2. **Construire l'application**
```bash
npm run build
```

### 3. **Déployer**
```bash
# Selon votre plateforme (Vercel, Netlify, etc.)
npm run deploy
```

## 🐛 Débogage

### Si les suggestions IA ne fonctionnent toujours pas :

1. **Vérifiez les logs serveur** pour les erreurs Gemini API
2. **Testez l'endpoint de debug** : `/api/debug/env`
3. **Vérifiez la console navigateur** pour les erreurs CORS
4. **Testez directement l'API** : `/api/workers/[id]/suggest-jobs`

### Si les icônes de carte ne s'affichent pas :

1. **Vérifiez la console navigateur** pour les erreurs 404 sur les images
2. **Testez la connectivité** vers les CDN Leaflet
3. **Vérifiez la configuration CSP** si vous en avez une

## ⚠️ Sécurité

- **Supprimez l'endpoint de debug** en production : `server/api/debug/env.get.ts`
- **Vérifiez que la clé API** n'est pas exposée côté client
- **Utilisez HTTPS** en production

## 🔍 Monitoring

Surveillez ces métriques :
- Erreurs 500 sur `/api/workers/[id]/suggest-jobs`
- Temps de réponse API Gemini
- Erreurs de chargement des icônes Leaflet 