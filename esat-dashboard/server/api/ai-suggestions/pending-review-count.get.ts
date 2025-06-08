import { defineEventHandler, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db } from '../../utils/db';

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification
    const token = getCookie(event, 'auth-token');
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required'
      });
    }

    // Décoder le JWT
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, jwtSecret) as any;

    if (!decoded.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      });
    }

    // Récupérer les informations de l'utilisateur connecté
    const currentUser = await db
      .selectFrom('users')
      .select(['role', 'esat_id', 'is_active'])
      .where('id', '=', decoded.userId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!currentUser) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found or inactive'
      });
    }

    // Construire la requête pour compter les suggestions en attente de révision
    let countQuery = db
      .selectFrom('ai_suggestions')
      .select(db.fn.count('id').as('count'))
      .where('status', '=', 'completed'); // Les suggestions terminées mais pas encore révisées

    // Appliquer les permissions selon le rôle
    if (currentUser.role !== 'super_admin') {
      if (!currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      // Filtrer par ESAT de l'utilisateur
      countQuery = countQuery.where('esat_id', '=', currentUser.esat_id);
    }

    const result = await countQuery.executeTakeFirst();
    const count = Number(result?.count || 0);

    return {
      status: 'success',
      count
    };

  } catch (error: any) {
    console.error('Error counting pending AI suggestions:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to count pending AI suggestions',
      message: error.message,
    });
  }
}); 