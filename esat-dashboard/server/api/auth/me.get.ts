import jwt from 'jsonwebtoken';
import { db } from '~/server/utils/db';

interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  esat_id: number | null;
  esat_name?: string;
}

export default defineEventHandler(async (event): Promise<AuthUser> => {
  try {
    // Récupérer le token depuis le cookie
    const token = getCookie(event, 'auth-token');
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No authentication token found'
      });
    }

    // Vérifier et décoder le JWT
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, jwtSecret) as any;

    if (!decoded.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      });
    }

    // Récupérer les données utilisateur mises à jour depuis la DB
    const user = await db
      .selectFrom('users')
      .select([
        'id',
        'email',
        'first_name',
        'last_name',
        'role',
        'esat_id',
        'is_active'
      ])
      .where('id', '=', decoded.userId)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found or inactive'
      });
    }

    // Si l'utilisateur a un ESAT, récupérer le nom de l'ESAT
    let esatName = undefined;
    if (user.esat_id) {
      try {
        const esat = await db
          .selectFrom('esats')
          .select(['name'])
          .where('id', '=', user.esat_id)
          .executeTakeFirst();
        
        if (esat) {
          esatName = esat.name;
        }
      } catch (error) {
        console.error('Error fetching ESAT name:', error);
      }
    }

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      esat_id: user.esat_id,
      esat_name: esatName
    };

  } catch (error: any) {
    // Si c'est déjà une erreur createError, la relancer
    if (error.statusCode) {
      throw error;
    }
    
    console.error('Auth verification error:', error);
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed'
    });
  }
}); 
