import { defineEventHandler } from 'h3';
import jwt from 'jsonwebtoken';
import { db, WorkerTable } from '../utils/db'; // Import db instance and WorkerTable type
import { Selectable } from 'kysely';

// Define the type for the worker data we expect to select and return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<WorkerSelectable[]> => {
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

    // Récupérer les informations de l'utilisateur
    const user = await db
      .selectFrom('users')
      .select(['role', 'esat_id', 'is_active'])
      .where('id', '=', decoded.userId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found or inactive'
      });
    }

    // Construire la requête selon les permissions
    let query = db.selectFrom('workers').selectAll();

    // Si l'utilisateur n'est pas super admin, filtrer par ESAT
    if (user.role !== 'super_admin') {
      if (!user.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      // Filtrer seulement les travailleurs de l'ESAT de l'utilisateur
      query = query.where('esat_id', '=', user.esat_id);
    }

    // Exécuter la requête
    const workers = await query.execute();

    console.log(`Successfully fetched ${workers.length} worker records${user.role !== 'super_admin' ? ` for ESAT ${user.esat_id}` : ''}.`);
    return workers;

  } catch (error: any) {
    // Si c'est déjà une erreur createError, la relancer
    if (error.statusCode) {
      throw error;
    }
    
    console.error('Error fetching workers:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch workers',
      message: error.message,
    });
  }
});
