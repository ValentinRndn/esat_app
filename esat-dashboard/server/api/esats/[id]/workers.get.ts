import { defineEventHandler, getRouterParam, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db, WorkerTable } from '../../../utils/db';
import { Selectable } from 'kysely';

// Define the type for the worker data we expect to select and return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<WorkerSelectable[]> => {
  const esatIdParam = getRouterParam(event, 'id');
  const esatId = esatIdParam ? parseInt(esatIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(esatId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ESAT ID' });
  }

  try {
    // Récupérer et vérifier l'authentification
    const token = getCookie(event, 'auth-token');
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required'
      });
    }

    // Décoder le JWT pour obtenir les infos utilisateur
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

    // Vérifier les permissions d'accès à cet ESAT
    if (currentUser.role !== 'super_admin') {
      if (currentUser.role !== 'admin_esat' && currentUser.role !== 'user_esat') {
        throw createError({
          statusCode: 403,
          statusMessage: 'Insufficient permissions to access workers'
        });
      }
      
      if (!currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      // Vérifier que l'utilisateur peut accéder à cet ESAT
      if (currentUser.esat_id !== esatId) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Access denied to this ESAT'
        });
      }
    }

    // Récupérer les travailleurs associés à l'ESAT
    const workers = await db
      .selectFrom('workers')
      .selectAll()
      .where('esat_id', '=', esatId)
      .execute();

    console.log(`Successfully fetched ${workers.length} workers for ESAT ${esatId}.`);
    return workers as WorkerSelectable[];

  } catch (error: any) {
    console.error(`Error fetching workers for ESAT ${esatId}:`, error);
    // Throw a structured error for Nuxt to handle
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || `Failed to fetch workers for ESAT ${esatId}`,
      message: error.message,
    });
  }
}); 