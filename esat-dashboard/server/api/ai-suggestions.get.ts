import { defineEventHandler, getQuery, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db } from '../utils/db';

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

    // Récupérer les paramètres de requête pour les filtres
    const query = getQuery(event);
    const limit = parseInt(query.limit as string) || 50;
    const offset = parseInt(query.offset as string) || 0;
    const status = query.status as string;
    const suggestion_type = query.suggestion_type as string;

    // Construire la requête avec jointure pour récupérer les informations du worker
    let dbQuery = db
      .selectFrom('ai_suggestions')
      .leftJoin('workers', 'ai_suggestions.worker_id', 'workers.id')
      .leftJoin('users as creator', 'ai_suggestions.created_by', 'creator.id')
      .select([
        'ai_suggestions.id',
        'ai_suggestions.worker_id',
        'ai_suggestions.esat_id',
        'ai_suggestions.suggestion_type',
        'ai_suggestions.prompt',
        'ai_suggestions.response',
        'ai_suggestions.summary',
        'ai_suggestions.confidence_score',
        'ai_suggestions.status',
        'ai_suggestions.tags',
        'ai_suggestions.created_by',
        'ai_suggestions.reviewed_by',
        'ai_suggestions.reviewed_at',
        'ai_suggestions.created_at',
        'ai_suggestions.updated_at',
        'workers.first_name as worker_first_name',
        'workers.last_name as worker_last_name',
        'creator.first_name as creator_first_name',
        'creator.last_name as creator_last_name'
      ]);

    // Appliquer les permissions selon le rôle
    if (currentUser.role !== 'super_admin') {
      if (!currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      // Filtrer par ESAT de l'utilisateur
      dbQuery = dbQuery.where('ai_suggestions.esat_id', '=', currentUser.esat_id);
    }

    // Appliquer les filtres optionnels
    if (status) {
      dbQuery = dbQuery.where('ai_suggestions.status', '=', status as 'pending' | 'completed' | 'reviewed' | 'applied' | 'rejected');
    }
    
    if (suggestion_type) {
      dbQuery = dbQuery.where('ai_suggestions.suggestion_type', '=', suggestion_type);
    }

    // Ordonner par date de création décroissante et appliquer la pagination
    const suggestions = await dbQuery
      .orderBy('ai_suggestions.created_at', 'desc')
      .limit(limit)
      .offset(offset)
      .execute();

    // Compter le total pour la pagination
    let countQuery = db
      .selectFrom('ai_suggestions')
      .select(db.fn.count('id').as('count'));

    if (currentUser.role !== 'super_admin' && currentUser.esat_id) {
      countQuery = countQuery.where('esat_id', '=', currentUser.esat_id);
    }

    if (status) {
      countQuery = countQuery.where('status', '=', status as 'pending' | 'completed' | 'reviewed' | 'applied' | 'rejected');
    }
    
    if (suggestion_type) {
      countQuery = countQuery.where('suggestion_type', '=', suggestion_type);
    }

    const countResult = await countQuery.executeTakeFirst();
    const total = Number(countResult?.count || 0);

    console.log(`Successfully fetched ${suggestions.length} AI suggestions (${offset}-${offset + suggestions.length} of ${total}).`);

    return {
      status: 'success',
      data: suggestions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + suggestions.length < total
      }
    };

  } catch (error: any) {
    console.error('Error fetching AI suggestions:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch AI suggestions',
      message: error.message,
    });
  }
}); 
