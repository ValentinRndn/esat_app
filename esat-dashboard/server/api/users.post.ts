import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { db, UserTable } from '../utils/db'; // Adjust path
import { Insertable, Selectable, sql } from 'kysely';
import bcrypt from 'bcrypt';

// Define the type for the data expected in the request body for creating a user
// Exclude fields that are auto-generated (id, created_at, updated_at)
// Include the plain password for hashing
type UserInsertData = Omit<Insertable<UserTable>, 'id' | 'created_at' | 'updated_at' | 'password_hash'> & {
  password?: string; // Make password optional in input, but we'll validate it
  first_name?: string; // Inclure first_name qui est dans la table
  last_name?: string; // Inclure last_name qui est dans la table
};

// Define the type for the user data we expect to return (excluding password hash)
type UserSelectable = Omit<Selectable<UserTable>, 'password_hash'>;

const SALT_ROUNDS = 10; // Standard salt rounds for bcrypt

export default defineEventHandler(async (event): Promise<UserSelectable> => {
  const body = await readBody<UserInsertData>(event);

  // --- Basic Input Validation ---
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' });
  }
  if (!body.email || typeof body.email !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid email' });
  }
  if (!body.password || typeof body.password !== 'string' || body.password.length < 8) {
    // Add a minimum password length check
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid password (min 8 characters)' });
  }
  if (!body.role || !['super_admin', 'admin_esat', 'user_esat'].includes(body.role)) {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid role' });
  }
  // is_active defaults to true if not provided, esat_id can be null

  try {
    // Hash the password
    const password_hash = await bcrypt.hash(body.password, SALT_ROUNDS);

    // 1. Insérer l'utilisateur
    const insertResult = await db
      .insertInto('users')
      .values({
        first_name: body.first_name ?? '',
        last_name: body.last_name ?? '',
        esat_id: body.esat_id ?? null,
        email: body.email,
        password_hash: password_hash,
        role: body.role,
        is_active: body.is_active ?? true,
      } as Insertable<UserTable>)
      .execute();

    // 2. Récupérer l'ID inséré en utilisant une table fictive comme base
    // Cette méthode est compatible avec le typage de Kysely
    const lastIdResult = await db
      .selectFrom('users') // Table existante comme base
      .select(sql`LAST_INSERT_ID()`.as('id'))
      .limit(1)
      .executeTakeFirstOrThrow();

    const insertedId = Number(lastIdResult.id);

    if (!insertedId) {
      throw new Error('Failed to get inserted ID');
    }

    // 3. Récupérer l'utilisateur nouvellement créé
    const newUser = await db
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
      ])
      .where('id', '=', insertedId)
      .executeTakeFirstOrThrow();

    setResponseStatus(event, 201); // Created
    return newUser as UserSelectable;

  } catch (error: any) {
    // Handle potential duplicate email errors (specific error code might vary by DB driver)
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.includes('Duplicate entry'))) {
       throw createError({
         statusCode: 409, // Conflict
         statusMessage: 'Email already exists',
         message: 'A user with this email address already exists.',
       });
    }

    console.error('Error creating user:', error);
    // Throw a generic server error for other issues
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user',
      message: error.message,
    });
  }
});
