import { defineEventHandler, readBody } from 'h3';
import { useRuntimeConfig } from '#imports';

/**
 * Endpoint pour extraire les données d'un PDF en utilisant l'API Gemini
 * Reçoit les données du PDF en base64 et retourne les informations structurées extraites
 */
export default defineEventHandler(async (event) => {
  try {
    // Récupérer les données du corps de la requête
    const body = await readBody(event);
    const { pdfData } = body;
    
    if (!pdfData) {
      return {
        statusCode: 400,
        error: 'Données PDF manquantes'
      };
    }
    
    // Configuration de l'API Gemini
    const config = useRuntimeConfig();
    const GEMINI_API_KEY = config.geminiApiKey;
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
    
    if (!GEMINI_API_KEY) {
      console.error('Clé API Gemini non configurée');
      return {
        statusCode: 500,
        error: 'Service d\'extraction non configuré. Veuillez configurer la clé API Gemini dans le fichier .env'
      };
    }
    
    // Préparer les données pour l'API Gemini
    const requestData = {
      contents: [
        {
          parts: [
            {
              text: `Tu es un assistant spécialisé dans l'extraction d'informations de documents PDF.

TÂCHE: Extrait les informations d'un travailleur ESAT depuis le PDF fourni et retourne un objet JSON.

FORMAT DE SORTIE:
{
  "first_name": "Prénom du travailleur",
  "last_name": "Nom du travailleur",
  "birth_date": "YYYY-MM-DD",
  "contact_info": "Téléphone/email",
  "internal_code": "Code interne ESAT",
  "entry_date_esat": "YYYY-MM-DD",
  "work_regime": "full-time ou part-time",
  "part_time_percentage": 80,
  "work_hours": "Horaires de travail",
  "living_situation": "Situation de logement",
  "mobility_info": "Informations de mobilité",
  "protection_measure": "tutelle/curatelle_simple/curatelle_renforcee/pas_de_mesure/autre",
  "health_info_summary": "Informations santé",
  "educational_background": "Parcours scolaire",
  "professional_background_summary": "Parcours professionnel",
  "legal_guardian": "Tuteur légal",
  "emergency_contact": "Contact d'urgence",
  "vigilance_points": "Points d'attention"
}

INSTRUCTIONS:
- Inclure uniquement les champs pour lesquels tu trouves une information claire dans le document
- Omettre les champs pour lesquels tu ne trouves pas d'information
- Convertir les dates au format YYYY-MM-DD
- Réponds UNIQUEMENT avec l'objet JSON, sans texte avant ou après`
            },
            {
              inline_data: {
                mime_type: "application/pdf",
                data: pdfData
              }
            }
          ]
        }
      ],
      generation_config: {
        temperature: 0.2,
        top_p: 0.95,
        top_k: 40,
        max_output_tokens: 2048,
      },
      safety_settings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE"
        }
      ]
    };
    
    // Appel à l'API Gemini
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur Gemini API:', errorData);
      
      // Créer un message d'erreur plus informatif
      let errorMessage = 'Erreur lors de l\'extraction des données';
      if (errorData.error) {
        if (errorData.error.message) {
          errorMessage = `Erreur API Gemini: ${errorData.error.message}`;
        }
        if (errorData.error.code) {
          errorMessage += ` (Code: ${errorData.error.code})`;
        }
      }
      
      return {
        statusCode: response.status,
        error: errorMessage,
        details: errorData
      };
    }
    
    // Traiter la réponse de Gemini
    const geminiResponse = await response.json();
    console.log('Réponse Gemini:', geminiResponse);
    
    // Vérifier la structure de la réponse et extraire le texte
    let responseText = '';
    
    if (geminiResponse.candidates && geminiResponse.candidates.length > 0) {
      // Format de l'API v1
      if (geminiResponse.candidates[0].content && 
          geminiResponse.candidates[0].content.parts && 
          geminiResponse.candidates[0].content.parts.length > 0) {
        responseText = geminiResponse.candidates[0].content.parts[0].text || '';
      }
      // Autre format possible
      else if (geminiResponse.candidates[0].text) {
        responseText = geminiResponse.candidates[0].text;
      }
    } else if (geminiResponse.text) {
      // Format simplifié possible
      responseText = geminiResponse.text;
    }
    
    console.log('Texte extrait de la réponse:', responseText);
    
    if (!responseText) {
      console.error('Aucun texte trouvé dans la réponse:', geminiResponse);
      return {
        statusCode: 422,
        error: 'Format de réponse Gemini non reconnu',
        rawResponse: geminiResponse
      };
    }
    
    // Extraire et parser le JSON de la réponse
    let extractedData;
    try {
      // Chercher le premier objet JSON valide dans la réponse
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0]);
      } else {
        // Si aucun objet JSON n'est trouvé, essayer de parser toute la réponse
        extractedData = JSON.parse(responseText);
      }
    } catch (err) {
      console.error('Erreur lors du parsing JSON:', err);
      console.log('Texte brut:', responseText);
      return {
        statusCode: 422,
        error: 'Impossible de parser les données extraites',
        rawText: responseText
      };
    }
    
    return {
      statusCode: 200,
      extractedData
    };
    
  } catch (error: any) {
    console.error('Erreur lors de l\'extraction des données du PDF:', error);
    return {
      statusCode: 500,
      error: `Erreur lors de l'extraction des données: ${error.message || 'Erreur inconnue'}`
    };
  }
}); 
