import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '~/server/utils/db';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    esat_id: number | null;
  };
  token: string;
  message?: string;
}

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  const body = await readBody<LoginRequest>(event);

  // Validation des données d'entrée
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' });
  }
  if (!body.email || typeof body.email !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Email required' });
  }
  if (!body.password || typeof body.password !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Password required' });
  }

  try {
    // Rechercher l'utilisateur par email
    const user = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', body.email)
      .where('is_active', '=', true) // Seulement les utilisateurs actifs
      .executeTakeFirst();

    if (!user) {
      throw createError({ 
        statusCode: 401, 
        statusMessage: 'Invalid credentials' 
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(body.password, user.password_hash);
    if (!isPasswordValid) {
      throw createError({ 
        statusCode: 401, 
        statusMessage: 'Invalid credentials' 
      });
    }

    // Générer le JWT
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        esatId: user.esat_id
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Définir le cookie HTTP-only sécurisé
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/'
    });

    // Retourner les données utilisateur (sans le hash du mot de passe)
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        esat_id: user.esat_id
      },
      token, // Optionnel pour le client
      message: 'Login successful'
    };

  } catch (error: any) {
    // Si c'est déjà une erreur createError, la relancer
    if (error.statusCode) {
      throw error;
    }
    
    console.error('Login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
}); 