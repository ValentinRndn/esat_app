import { defineEventHandler, getRouterParam, readBody, setResponseStatus } from 'h3';
import { db, UserTable } from '../../utils/db'; // Adjust path
import { Updateable, Selectable } from 'kysely';
import bcrypt from 'bcrypt';

// Define the type for the data expected in the request body for updating a user
// All fields are optional. Exclude id, created_at, updated_at, password_hash.
// Include optional plain password for updates.
type UserUpdateData = Partial<Omit<Updateable<UserTable>, 'id' | 'created_at' | 'updated_at' | 'password_hash'>> & {
  password?: string; // Optional new password
};

// Define the type for the user data we expect to return (excluding password hash)
type UserSelectable = Omit<Selectable<UserTable>, 'password_hash'>;

const SALT_ROUNDS = 10; // Standard salt rounds for bcrypt

export default defineEventHandler(async (event): Promise<UserSelectable | undefined> => {
  // 1. Get and validate User ID
  const userIdParam = getRouterParam(event, 'id');
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;
  if (isNaN(userId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user ID' });
  }

  // 2. Read and validate request body
  const body = await readBody<UserUpdateData>(event);
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid or empty request body' });
  }

  // Prevent updating the ID or timestamps directly
  delete (body as any).id;
  delete (body as any).created_at;
  delete (body as any).updated_at;

  // Validate password if provided
  if (body.password && (typeof body.password !== 'string' || body.password.length < 8)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid password format (min 8 characters)' });
  }
  // Validate role if provided
  if (body.role && !['super_admin', 'admin_esat', 'user_esat'].includes(body.role)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid role' });
  }

  try {
    // 3. Prepare update data, separating password handling
    const { password, ...restOfBody } = body; // Destructure password from the rest
    const userDataToUpdate: Partial<Updateable<UserTable>> = { ...restOfBody }; // Initialize with non-password fields

    // 4. Hash password if provided
    if (password) {
      userDataToUpdate.password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    }
    // No need to delete 'password' from userDataToUpdate as it was never added

    // Add updated_at timestamp (assuming DB doesn't auto-update ON UPDATE)
    // If your DB handles this automatically, you can remove this line.
    userDataToUpdate.updated_at = new Date();

    // 5. Execute update query, ensuring we don't try to update with an empty object
    if (Object.keys(userDataToUpdate).length === 0) {
       // If only password was provided and hashed, or if body only contained password
       // We might want to return the existing user data or a specific message
       // For now, let's throw an error indicating no actual fields were updated besides potentially password/timestamp
       // Or fetch and return the current user data if password was the only change
       // Let's proceed with the update, as updated_at is always set.
       // If userDataToUpdate only contains updated_at, the DB call might be unnecessary
       // but Kysely/DB should handle it. A check could be added here if needed.
    }

    const result = await db
      .updateTable('users')
      .set(userDataToUpdate) // Pass the object containing only valid UserTable fields
      .where('id', '=', userId)
      .returning([ // Return updated fields, excluding password_hash
        'id',
        'esat_id',
        'email',
        'role',
        'is_active',
        'created_at',
        'updated_at',
      ])
      .executeTakeFirst(); // Use executeTakeFirst as update might affect 0 or 1 row

    // 6. Handle not found
    if (!result) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    // 7. Return updated user data
    return result as UserSelectable;

  } catch (error: any) {
    // Handle potential duplicate email errors if email is being updated
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.includes('Duplicate entry'))) {
       throw createError({
         statusCode: 409, // Conflict
         statusMessage: 'Email already exists',
         message: 'A user with this email address already exists.',
       });
    }

    // Re-throw known errors (like 404)
    if (error.statusCode) {
        throw error;
    }

    console.error(`Error updating user with ID ${userId}:`, error);
    // Throw a generic server error for other issues
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update user with ID ${userId}`,
      message: error.message,
    });
  }
});
