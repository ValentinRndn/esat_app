export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // Ici, vous pouvez ajouter la logique pour envoyer l'email
    // Par exemple, en utilisant nodemailer ou un service d'email
    
    // Pour l'exemple, on simule juste un succès
    return {
      status: 'success',
      message: 'Message envoyé avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de l\'envoi du message'
    });
  }
}); 
