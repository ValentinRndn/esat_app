import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';
import { db, UserTable } from '../../utils/db'; // Adjust path for nested directory
import { Selectable } from 'kysely';

// Define the type for the user data we expect to select and return
// Exclude sensitive fields like password_hash
type UserSelectable = Omit<Selectable<UserTable>, 'password_hash'>;

export default defineEventHandler(async (event): Promise<UserSelectable | undefined> => {
  const userIdParam = getRouterParam(event, 'id');
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(userId)) {
    setResponseStatus(event, 400); // Bad Request
    return undefined; // Or throw createError({ statusCode: 400, statusMessage: 'Invalid user ID' });
  }

  try {
    // Fetch the user by ID, excluding the password_hash
    const user = await db
      .selectFrom('users')
      .where('id', '=', userId)
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
      .executeTakeFirst(); // Use executeTakeFirst() for single record

    if (!user) {
      setResponseStatus(event, 404); // Not Found
      return undefined; // Or throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    // Type assertion to ensure the returned data matches UserSelectable
    return user as UserSelectable;
  } catch (error: any) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    // Throw a structured error for Nuxt to handle
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch user with ID ${userId}`,
      message: error.message,
    });
  }
});
