// test-gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Remplacez par VOTRE VRAIE CLÉ API
const GEMINI_API_KEY = "AIzaSyA4j8xar5nsXqJ3bSpMyDYntoKqSBRP5To";
// Remplacez par le nom du modèle que vous voulez tester
const MODEL_NAME = "gemini-1.5-flash-latest"; // ou "gemini-pro"

async function runTest() {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "VOTRE_VRAIE_CLE_API_ICI") {
    console.error("ERREUR : Veuillez remplacer VOTRE_VRAIE_CLE_API_ICI par votre clé API réelle.");
    return;
  }
  console.log(`Utilisation de la clé API commençant par: ${GEMINI_API_KEY.substring(0, 5)}...`);
  console.log(`Test avec le modèle: ${MODEL_NAME}`);

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = "Bonjour, qui es-tu ?";
    console.log("Envoi du prompt à l'API Gemini...");

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Réponse de l'API:", text);
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Gemini:", error);
    if (error.cause) {
        console.error("Cause de l'erreur:", error.cause);
    }
  }
}

runTest();