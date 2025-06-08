import { defineEventHandler, getCookie, createError } from 'h3';
import { db, UserTable } from '../utils/db'; // Import db instance and UserTable type
import { Selectable } from 'kysely';
import jwt from 'jsonwebtoken';

// Define the type for the user data we expect to select and return
// Exclude sensitive fields like password_hash
type UserSelectable = Omit<Selectable<UserTable>, 'password_hash'>;

export default defineEventHandler(async (event): Promise<UserSelectable[]> => {
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

    // Construire la requête selon les permissions
    let query = db
      .selectFrom('users')
      .select([
        'id',
        'esat_id',
        'email',
        'first_name',
        'last_name',
        'role',
        'is_active',
        'created_at',
        'updated_at',
      ]);

    // Si l'utilisateur n'est pas super admin, filtrer par ESAT
    if (currentUser.role !== 'super_admin') {
      if (currentUser.role !== 'admin_esat') {
        throw createError({
          statusCode: 403,
          statusMessage: 'Insufficient permissions to access users'
        });
      }
      
      if (!currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      // Filtrer seulement les utilisateurs de l'ESAT de l'utilisateur
      query = query.where('esat_id', '=', currentUser.esat_id);
    }

    // Exécuter la requête
    const users = await query.execute();

    console.log(`Successfully fetched ${users.length} user records${currentUser.role !== 'super_admin' ? ` for ESAT ${currentUser.esat_id}` : ''}.`);
    return users as UserSelectable[];

  } catch (error: any) {
    console.error('Error fetching users:', error);
    // Throw a structured error for Nuxt to handle
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch users',
      message: error.message,
    });
  }
});
