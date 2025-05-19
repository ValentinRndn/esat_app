import { defineEventHandler, createError } from 'h3';
import { db, WorkerTable, EsatTable, EsatSelectable } from '../../../utils/db';
import { Selectable } from 'kysely';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useRuntimeConfig } from '#imports';

// Define the type for the worker data we will fetch
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig();
    const geminiApiKey = 'AIzaSyA4j8xar5nsXqJ3bSpMyDYntoKqSBRP5To';

    console.log('Nuxt App - Using Gemini API Key from runtimeConfig:', geminiApiKey ? geminiApiKey.substring(0, 5) + '...' : 'Not Set or Empty');

    if (!geminiApiKey) {
      console.error('CRITICAL ERROR in Nuxt App: Gemini API key is not configured in runtimeConfig. Check .env and nuxt.config.ts');
      throw createError({
        statusCode: 500,
        statusMessage: 'Gemini API Key Not Configured',
        message: 'The Gemini API key is not properly configured in the application environment.'
      });
    }

    // Initialize the Gemini client
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    // Vous pouvez maintenant choisir le modèle qui a fonctionné, ou un autre si vous le souhaitez
    const modelName = "gemini-1.5-flash-latest"; // Ou "gemini-pro" si vous voulez retester avec la bonne clé
    console.log(`Nuxt App - Attempting to initialize model: "${modelName}"`);
    const model = genAI.getGenerativeModel({ model: modelName });

    // ... (reste de votre logique pour récupérer workerId, worker, esat, construire le prompt) ...
    // Assurez-vous que les chemins d'importation pour db, WorkerTable, etc., sont corrects.

    const workerId = event.context.params?.id;

    if (!workerId) {
      throw createError({ statusCode: 400, statusMessage: 'Worker ID is required' });
    }

    // 1. Fetch worker data by ID
    const worker = await db
      .selectFrom('workers')
      .selectAll()
      .where('id', '=', parseInt(workerId, 10))
      .executeTakeFirst();

    if (!worker) {
      throw createError({ statusCode: 404, statusMessage: 'Worker not found' });
    }

    // 2. Fetch associated ESAT data
    let esat: EsatSelectable | undefined;
    if (worker.esat_id) {
      esat = await db
        .selectFrom('esats')
        .selectAll()
        .where('id', '=', worker.esat_id)
        .executeTakeFirst();
    }
    
    let prompt = `Idéalement, en considérant le projet individuel de ce travailleur d'ESAT, et les entreprises disponibles aux alentours, fais-moi des propositions d'emplois possibles, en élargissant à d'autres métier comparable. Propose-moi des entreprises locales alignées sur son profil et ses souhaits. Considérant que le travailleur est intéressé par toutes tes suggestions, merci d'affiner tes recommandations et pour aider à contacter les entreprises adaptées.`;

    // Add worker information to the prompt
    prompt += `\n\nInformations sur le travailleur :`;
    prompt += `\n- Nom: ${worker.first_name} ${worker.last_name}`;
    // ... (ajoutez les autres informations du worker comme avant) ...
    // ... (ajoutez les informations de l'ESAT comme avant) ...


    // 4. Call the Gemini API
    try {
      console.log(`Nuxt App - Sending prompt to Gemini API using model "${modelName}".`);
      const aiResult = await model.generateContent(prompt);
      const aiResponse = await aiResult.response;
      const aiText = aiResponse.text();
      console.log('Nuxt App - Received response from Gemini API');

      return {
        status: 'success',
        suggestions: aiText,
      };
    } catch (aiError: any) {
      console.error('Nuxt App - Error calling Gemini API:', aiError);
      let errorMessage = aiError.message || 'Unknown error calling Gemini API';
      let statusCode = 500;
      // ... (votre gestion d'erreur pour aiError) ...
      throw createError({
        statusCode,
        statusMessage: 'Failed to get suggestions from AI',
        message: errorMessage,
      });
    }
  } catch (error: any) {
    console.error('Nuxt App - Error in suggest-jobs handler:', error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to suggest jobs',
      message: error.message || 'Unknown error in suggest-jobs handler',
    });
  }
});
