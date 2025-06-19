export default defineEventHandler(async (event) => {
  // Supprimer le cookie d'authentification
  deleteCookie(event, 'auth-token', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  return {
    success: true,
    message: 'Logout successful'
  };
}); 
