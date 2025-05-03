import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';
import { db } from '../../utils/db'; // Adjust path

export default defineEventHandler(async (event): Promise<void> => {
  // 1. Get and validate User ID
  const userIdParam = getRouterParam(event, 'id');
  const userId = userIdParam ? parseInt(userIdParam, 10) : NaN;

  if (isNaN(userId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid user ID' });
  }

  try {
    // 2. Execute delete query
    const result = await db
      .deleteFrom('users')
      .where('id', '=', userId)
      .executeTakeFirst(); // executeTakeFirst returns info like numDeletedRows

    // 3. Check if a row was deleted
    // Kysely's DeleteResult typically includes numDeletedRows (or similar) as a bigint
    const numDeletedRows = result?.numDeletedRows ?? BigInt(0);

    if (numDeletedRows === BigInt(0)) {
      // If no rows were deleted, the user was not found
      throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    // 4. Set success status (204 No Content)
    setResponseStatus(event, 204);
    // No body is returned for a 204 response

  } catch (error: any) {
     // Re-throw known errors (like 404)
    if (error.statusCode) {
        throw error;
    }

    console.error(`Error deleting user with ID ${userId}:`, error);
    // Throw a generic server error for other issues
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to delete user with ID ${userId}`,
      message: error.message,
    });
  }
});
