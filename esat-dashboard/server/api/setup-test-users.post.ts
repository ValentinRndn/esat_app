import bcrypt from 'bcrypt';
import { db } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  // Cette API ne doit être utilisée qu'en développement
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Not available in production'
    });
  }

  try {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();

    // Vérifier si les utilisateurs existent déjà
    const existingUsers = await db
      .selectFrom('users')
      .select(['email'])
      .where('email', 'in', ['admin@test.com', 'user@esat1.com'])
      .execute();

    if (existingUsers.length > 0) {
      return {
        success: true,
        message: 'Test users already exist',
        users: existingUsers
      };
    }

    // Créer un super admin
    await db
      .insertInto('users')
      .values({
        first_name: 'Super',
        last_name: 'Admin',
        email: 'admin@test.com',
        password_hash: hashedPassword,
        role: 'super_admin',
        esat_id: null,
        is_active: true,
        created_at: now,
        updated_at: now
      })
      .execute();

    // Créer un utilisateur ESAT (assigné à l'ESAT 1)
    await db
      .insertInto('users')
      .values({
        first_name: 'User',
        last_name: 'ESAT',
        email: 'user@esat1.com',
        password_hash: hashedPassword,
        role: 'admin_esat',
        esat_id: 1, // Assigné à l'ESAT avec ID 1
        is_active: true,
        created_at: now,
        updated_at: now
      })
      .execute();

    return {
      success: true,
      message: 'Test users created successfully',
      users: [
        {
          email: 'admin@test.com',
          password: 'password123',
          role: 'super_admin',
          description: 'Super administrateur - accès complet'
        },
        {
          email: 'user@esat1.com',
          password: 'password123',
          role: 'admin_esat',
          esat_id: 1,
          description: 'Admin ESAT - accès aux travailleurs de l\'ESAT 1'
        }
      ]
    };

  } catch (error: any) {
    console.error('Error creating test users:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create test users',
      message: error.message
    });
  }
}); 