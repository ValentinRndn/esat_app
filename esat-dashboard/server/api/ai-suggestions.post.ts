import { defineEventHandler, readBody, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db } from '../utils/db';

interface CreateAiSuggestionRequest {
  worker_id: number;
  suggestion_type: string;
  prompt: string;
  response: string;
  summary?: string;
  confidence_score?: number;
  tags?: string;
}

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
      .select(['id', 'role', 'esat_id', 'is_active'])
      .where('id', '=', decoded.userId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!currentUser) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found or inactive'
      });
    }

    // Lire les données de la requête
    const body: CreateAiSuggestionRequest = await readBody(event);

    if (!body.worker_id || !body.suggestion_type || !body.prompt || !body.response) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: worker_id, suggestion_type, prompt, response'
      });
    }

    // Vérifier que le worker existe et que l'utilisateur y a accès
    const worker = await db
      .selectFrom('workers')
      .select(['id', 'esat_id'])
      .where('id', '=', body.worker_id)
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

    // Créer la suggestion d'IA
    const result = await db
      .insertInto('ai_suggestions')
      .values({
        worker_id: body.worker_id,
        esat_id: worker.esat_id || currentUser.esat_id || 1, // Fallback au cas où
        suggestion_type: body.suggestion_type,
        prompt: body.prompt,
        response: body.response,
        summary: body.summary || null,
        confidence_score: body.confidence_score || null,
        status: 'completed',
        tags: body.tags || null,
        created_by: currentUser.id,
        created_at: new Date(),
        updated_at: new Date()
      })
      .executeTakeFirst();

    console.log(`AI suggestion created with ID: ${result.insertId}`);

    return {
      status: 'success',
      data: {
        id: result.insertId,
        message: 'AI suggestion created successfully'
      }
    };

  } catch (error: any) {
    console.error('Error creating AI suggestion:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create AI suggestion',
      message: error.message,
    });
  }
}); 