# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Fonctionnalité d'extraction de données PDF

Cette application dispose d'une fonctionnalité permettant d'extraire automatiquement des informations de fichiers PDF pour le formulaire de création de travailleurs. Cette fonctionnalité utilise l'API Gemini de Google pour analyser les documents.

### Configuration de l'API Gemini

Pour utiliser cette fonctionnalité, vous devez :

1. Obtenir une clé API Gemini sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créer un fichier `.env` à la racine du projet avec le contenu suivant :
   ```
   GEMINI_API_KEY=votre_clé_api_ici
   ```
3. Redémarrer le serveur de développement

### Utilisation

Lors de la création d'un nouveau travailleur, vous verrez une section "Importation depuis un PDF" en haut du formulaire. Vous pourrez y déposer un fichier PDF contenant des informations sur le travailleur. L'API Gemini analysera le document et remplira automatiquement les champs du formulaire avec les informations extraites.
