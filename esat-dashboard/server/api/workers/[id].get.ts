import { defineEventHandler, getRouterParam, setResponseStatus, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db, WorkerTable } from '../../utils/db';
import { Selectable } from 'kysely';

// Define the type for the worker data we expect to select and return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<{ status: string; data: WorkerSelectable } | undefined> => {
  const workerIdParam = getRouterParam(event, 'id');
  const workerId = workerIdParam ? parseInt(workerIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(workerId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid worker ID' });
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
    let query = db
      .selectFrom('workers')
      .selectAll()
      .where('id', '=', workerId);

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
    const worker = await query.executeTakeFirst();

    if (!worker) {
      throw createError({
        statusCode: 404,
        statusMessage: user.role !== 'super_admin' 
          ? 'Worker not found or not accessible from your ESAT' 
          : 'Worker not found'
      });
    }

    console.log(`Successfully fetched worker with ID ${workerId}${user.role !== 'super_admin' ? ` from ESAT ${user.esat_id}` : ''}.`);
    
    return {
      status: 'success',
      data: worker as WorkerSelectable
    };

  } catch (error: any) {
    // Si c'est déjà une erreur createError, la relancer
    if (error.statusCode) {
      throw error;
    }
    
    console.error(`Error fetching worker with ID ${workerId}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch worker with ID ${workerId}`,
      message: error.message,
    });
  }
});
