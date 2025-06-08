import { defineEventHandler, getRouterParam, setResponseStatus, getCookie, createError } from 'h3';
import { db, UserTable } from '../../utils/db'; // Adjust path for nested directory
import { Selectable } from 'kysely';
import jwt from 'jsonwebtoken';

// Define the type for the user data we expect to select and return
// Exclude sensitive fields like password_hash
type UserSelectable = Omit<Selectable<UserTable>, 'password_hash'>;

export default defineEventHandler(async (event): Promise<{ status: string; data: UserSelectable } | undefined> => {
  const userIdParam = getRouterParam(event, 'id');
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(userId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user ID' });
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

    // Construire la requête selon les permissions
    let query = db
      .selectFrom('users')
      .where('id', '=', userId)
      .select([
        'id',
        'esat_id',
        'first_name',
        'last_name',
        'email',
        'role',
        'is_active',
        'created_at',
        'updated_at',
      ]);

    // Si l'utilisateur n'est pas super admin, vérifier les permissions
    if (currentUser.role !== 'super_admin') {
      if (currentUser.role !== 'admin_esat') {
        throw createError({
          statusCode: 403,
          statusMessage: 'Insufficient permissions to access this user'
        });
      }
      
      if (!currentUser.esat_id) {
        throw createError({
          statusCode: 403,
          statusMessage: 'No ESAT assigned to user'
        });
      }
      
      // Ajouter la condition pour filtrer par ESAT
      query = query.where('esat_id', '=', currentUser.esat_id);
    }

    // Exécuter la requête
    const user = await query.executeTakeFirst();

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found or access denied' });
    }

    return {
      status: 'success',
      data: user as UserSelectable
    };

  } catch (error: any) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    // Throw a structured error for Nuxt to handle
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || `Failed to fetch user with ID ${userId}`,
      message: error.message,
    });
  }
});
