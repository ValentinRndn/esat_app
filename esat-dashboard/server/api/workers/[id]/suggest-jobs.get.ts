import { defineEventHandler, createError, setHeaders } from 'h3';
import { db, WorkerTable, EsatTable, EsatSelectable } from '../../../utils/db';
import { Selectable } from 'kysely';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useRuntimeConfig } from '#imports';

// Define the type for the worker data we will fetch
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event) => {
  // Définir les headers CORS pour la production
  setHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  });

  try {
    const runtimeConfig = useRuntimeConfig();
    // Utiliser la configuration runtime au lieu d'une clé hardcodée
    const geminiApiKey = runtimeConfig.geminiApiKey || process.env.NUXT_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    console.log('Nuxt App - Environment:', process.env.NODE_ENV);
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
    const modelName = "gemini-1.5-flash-latest";
    console.log(`Nuxt App - Attempting to initialize model: "${modelName}"`);
    const model = genAI.getGenerativeModel({ model: modelName });

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
      
    // Format les données JSON pour le prompt
    function formatJsonField<T>(field: any, defaultValue: T): T {
      if (!field) return defaultValue;
      
      try {
        if (typeof field === 'string') {
          return JSON.parse(field);
        }
        return field;
      } catch (e) {
        return field;
      }
    }

    // 2. Utilisez la fonction modifiée avec le type approprié
    let experiencesText = "Non spécifiées";
    const experiences = formatJsonField<any[]>(worker.professional_experiences, []);
    if (Array.isArray(experiences) && experiences.length > 0) {
      experiencesText = experiences.map(exp => 
        `- ${exp.company || 'Entreprise non spécifiée'}: ${exp.missions || 'Missions non spécifiées'}`
      ).join('\n');
    }

    // Construire les compétences à partir des évaluations professionnelles
    let professionalSkills = "Non spécifiées";
    const evaluation = formatJsonField(worker.professional_evaluation, {});
    if (Object.keys(evaluation).length > 0) {
      const skillsList = Object.entries(evaluation).map(([key, value]: [string, any]) => {
        const rating = value.monitor || value.worker || "medium";
        const isStrong = rating === "good";
        return isStrong ? `- ${key.replace(/_/g, ' ')}` : null;
      }).filter(Boolean);
      
      if (skillsList.length > 0) {
        professionalSkills = skillsList.join('\n');
      }
    }

    // Formatter les savoirs de base
    const formatSkill = (skill: string | null | undefined, type: string): string => {
      if (!skill) return `${type}: Non spécifié`;
      return `${type}: ${skill.replace(/_/g, ' ')}`;
    };

    const prompt = `
Tu es un conseiller en insertion professionnelle spécialisé dans l'accompagnement de travailleurs en situation de handicap. 
Ta mission est de suggérer des pistes d'emploi précises et réalistes pour ce travailleur d'ESAT.

PROFIL DU TRAVAILLEUR:
- Nom: ${worker.first_name} ${worker.last_name}
- Âge: ${worker.birth_date ? Math.floor((new Date().getTime() - new Date(worker.birth_date).getTime()) / 31557600000) : 'Non spécifié'} ans
- Formation: ${worker.educational_background || 'Non spécifiée'}
- Parcours professionnel: ${worker.professional_background_summary || 'Non spécifié'}
- Expériences professionnelles:
${experiencesText}

COMPÉTENCES ET APTITUDES:
- Lecture: ${formatSkill(worker.reading_skills, 'Niveau')}
- Écriture: ${worker.writing_skills || 'Non spécifiée'}
- Calcul: ${worker.calculation_skills || 'Non spécifié'}
- Informatique: ${worker.computer_skills || 'Non spécifié'}
${worker.computer_skills_comments ? `  Commentaire: ${worker.computer_skills_comments}` : ''}
- Points forts professionnels:
${professionalSkills}
- Évaluation générale: ${worker.professional_evaluation_comments || 'Non spécifiée'}

PROJET PROFESSIONNEL:
- Clarté du projet: ${worker.professional_project_clarity ? `${worker.professional_project_clarity}/3` : 'Non évaluée'}
- Capacité à travailler en milieu ordinaire: ${worker.ordinary_work_capacity ? `${worker.ordinary_work_capacity}/3` : 'Non évaluée'}
- Volonté de travailler en entreprise: ${worker.employer_work_willingness || 'Non spécifiée'}
- Domaines souhaités: ${worker.desired_job_field || 'Non spécifiés'}
- Entreprises ciblées: ${worker.desired_companies || 'Non spécifiées'}
- Mobilité géographique: ${worker.geographic_mobility || 'Non spécifiée'}
${worker.geographic_mobility === 'other' && worker.geographic_mobility_other ? `  Précision: ${worker.geographic_mobility_other}` : ''}
- Difficultés potentielles: ${worker.project_difficulties || 'Non spécifiées'}
- Points de vigilance: ${worker.vigilance_points || 'Non spécifiés'}

CONTEXTE ESAT:
${esat ? `- Nom de l'ESAT: ${esat.name || 'Non spécifié'}
- Localisation: ${esat.city || 'Non spécifiée'} }` : 'Pas d\'information sur l\'ESAT'}

FORMAT DE RÉPONSE:
Propose 5 à 8 métiers adaptés sous ce format:

1. **[NOM DU MÉTIER]**
   - Description: Brève description du poste (1 ligne max)

   \n   - Adéquation: Pourquoi ce métier convient au profil du travailleur

   \n   - Aménagements: Adaptations potentiellement nécessaires

**Entreprises locales**: 2-3 types d'entreprises qui recrutent

Sois concret, réaliste et tiens compte des limites et points forts du travailleur. Considère à la fois ses aspirations et ses compétences réelles. 
Privilégie les emplois accessibles avec son niveau de qualification.

L'accompagnement par un conseiller Pôle Emploi spécialisé dans le handicap pourra être utile pour faciliter l'intégration en milieu ordinaire et obtenir les aménagements nécessaires.
`;

    // 4. Call the Gemini API
    try {
      console.log(`Nuxt App - Sending prompt to Gemini API using model "${modelName}".`);
      const aiResult = await model.generateContent(prompt);
      const aiResponse = await aiResult.response;
      const aiText = aiResponse.text();
      console.log('Nuxt App - Received response from Gemini API');

      // Return the AI suggestions with Markdown formatting
      return {
        status: 'success',
        suggestions: aiText,
      };
    } catch (aiError: any) {
      console.error('Nuxt App - Error calling Gemini API:', aiError);
      let errorMessage = aiError.message || 'Unknown error calling Gemini API';
      let statusCode = 500;
      
      // Check for specific Gemini API errors
      if (aiError.message?.includes('quota exceeded')) {
        errorMessage = 'Quota API dépassé. Veuillez réessayer plus tard.';
        statusCode = 429;
      } else if (aiError.message?.includes('permission denied')) {
        errorMessage = 'Accès à l\'API refusé. Vérifiez les paramètres d\'authentification.';
        statusCode = 403;
      } else if (aiError.message?.includes('invalid argument')) {
        errorMessage = 'Arguments invalides pour l\'API. Vérifiez les paramètres de requête.';
        statusCode = 400;
      }
      
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