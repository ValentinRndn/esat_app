import { defineEventHandler } from 'h3';
import { db, UserTable } from '../utils/db'; // Import db instance and UserTable type
import { Selectable } from 'kysely';

// Define the type for the user data we expect to select and return
// Exclude sensitive fields like password_hash
type UserSelectable = Omit<Selectable<UserTable>, 'password_hash'>;

export default defineEventHandler(async (event): Promise<UserSelectable[]> => {
  try {
    // Fetch all users from the database, excluding the password_hash
    const users = await db
      .selectFrom('users')
      .selectAll()
      // Explicitly list fields to select, excluding password_hash
      .select([
        'id',
        'esat_id',
        'email',
        'role',
        'is_active',
        'created_at',
        'updated_at',
      ])
      .execute();

    // Type assertion to ensure the returned data matches UserSelectable
    return users as UserSelectable[];
  } catch (error: any) {
    console.error('Error fetching users:', error);
    // Throw a structured error for Nuxt to handle
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users',
      message: error.message,
    });
  }
});
