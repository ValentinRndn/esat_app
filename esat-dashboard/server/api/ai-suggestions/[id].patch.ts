import { defineEventHandler, getRouterParam, readBody, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db } from '../../utils/db';

interface UpdateAiSuggestionRequest {
  status?: 'pending' | 'completed' | 'reviewed' | 'applied' | 'rejected';
  summary?: string;
  tags?: string;
}

export default defineEventHandler(async (event) => {
  const suggestionIdParam = getRouterParam(event, 'id');
  const suggestionId = suggestionIdParam ? parseInt(suggestionIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(suggestionId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid suggestion ID' });
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

    // Vérifier que la suggestion existe
    const suggestion = await db
      .selectFrom('ai_suggestions')
      .select(['id', 'esat_id', 'created_by'])
      .where('id', '=', suggestionId)
      .executeTakeFirst();

    if (!suggestion) {
      throw createError({
        statusCode: 404,
        statusMessage: 'AI suggestion not found'
      });
    }

    // Vérifier les permissions d'accès à la suggestion
    if (currentUser.role !== 'super_admin') {
      if (!currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      if (suggestion.esat_id !== currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Access denied to this suggestion'
        });
      }
    }

    // Lire les données de la requête
    const body: UpdateAiSuggestionRequest = await readBody(event);

    // Préparer les données de mise à jour
    const updateData: any = {
      updated_at: new Date()
    };

    if (body.status !== undefined) {
      updateData.status = body.status;
      
      // Si le statut passe à 'reviewed', enregistrer qui a fait la review
      if (body.status === 'reviewed') {
        updateData.reviewed_by = currentUser.id;
        updateData.reviewed_at = new Date();
      }
    }

    if (body.summary !== undefined) {
      updateData.summary = body.summary;
    }

    if (body.tags !== undefined) {
      updateData.tags = body.tags;
    }

    // Mettre à jour la suggestion
    await db
      .updateTable('ai_suggestions')
      .set(updateData)
      .where('id', '=', suggestionId)
      .execute();

    console.log(`AI suggestion ${suggestionId} updated successfully.`);

    return {
      status: 'success',
      message: 'AI suggestion updated successfully'
    };

  } catch (error: any) {
    console.error(`Error updating AI suggestion ${suggestionId}:`, error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || `Failed to update AI suggestion ${suggestionId}`,
      message: error.message,
    });
  }
}); 