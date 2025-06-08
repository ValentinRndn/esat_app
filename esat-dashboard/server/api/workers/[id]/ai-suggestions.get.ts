import { defineEventHandler, getRouterParam, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db, AiSuggestionSelectable } from '../../../utils/db';

export default defineEventHandler(async (event): Promise<AiSuggestionSelectable[]> => {
  const workerIdParam = getRouterParam(event, 'id');
  const workerId = workerIdParam ? parseInt(workerIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(workerId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid worker ID' });
  }

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

    // Vérifier que le worker existe
    const worker = await db
      .selectFrom('workers')
      .select(['id', 'esat_id'])
      .where('id', '=', workerId)
      .executeTakeFirst();

    if (!worker) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Worker not found'
      });
    }

    // Vérifier les permissions d'accès au worker
    if (currentUser.role !== 'super_admin') {
      if (!currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      if (worker.esat_id !== currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Access denied to this worker'
        });
      }
    }

    // Récupérer les suggestions d'IA pour ce worker
    const suggestions = await db
      .selectFrom('ai_suggestions')
      .selectAll()
      .where('worker_id', '=', workerId)
      .orderBy('created_at', 'desc')
      .execute();

    console.log(`Successfully fetched ${suggestions.length} AI suggestions for worker ${workerId}.`);
    return suggestions as AiSuggestionSelectable[];

  } catch (error: any) {
    console.error(`Error fetching AI suggestions for worker ${workerId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || `Failed to fetch AI suggestions for worker ${workerId}`,
      message: error.message,
    });
  }
}); 