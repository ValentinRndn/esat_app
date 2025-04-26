import { db } from '~/server/utils/db'; // Use ~ alias
import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  // 1. Get and validate ID parameter
  const esatIdParam = getRouterParam(event, 'id');
  if (!esatIdParam) {
    setResponseStatus(event, 400); // Bad Request
    return { status: 'error', message: 'Missing ESAT ID parameter.' };
  }

  const esatId = parseInt(esatIdParam, 10);
  if (isNaN(esatId)) {
    setResponseStatus(event, 400); // Bad Request
    return { status: 'error', message: 'Invalid ESAT ID parameter. Must be a number.' };
  }

  // 2. Perform Delete Operation
  try {
    const result = await db.deleteFrom('esats')
      .where('id', '=', esatId)
      .executeTakeFirst(); // Use executeTakeFirst to get affected rows info

    // Check if any row was actually deleted
    // result.numDeletedRows might be BigInt(0) or BigInt(1)
    if (result && Number(result.numDeletedRows) > 0) {
      console.log(`Successfully deleted ESAT with ID ${esatId}.`);
      setResponseStatus(event, 204); // No Content (standard for successful DELETE)
      // Return nothing in the body for 204 response
      return;
      // Alternatively, return 200 OK with a message:
      // return { status: 'success', message: `ESAT with ID ${esatId} deleted successfully.` };
    } else {
      // If no rows were deleted, it likely means the ID didn't exist
      console.warn(`Attempted to delete ESAT with ID ${esatId}, but it was not found.`);
      setResponseStatus(event, 404); // Not Found
      return { status: 'error', message: `ESAT with ID ${esatId} not found.` };
    }

  } catch (error: any) {
    console.error(`Error deleting ESAT with ID ${esatId}:`, error);
    setResponseStatus(event, 500); // Internal Server Error
    // Consider specific error handling, e.g., foreign key constraints
    return {
      status: 'error',
      message: 'Failed to delete ESAT.',
      error: error.message, // Consider more generic message in production
    };
  }
});
