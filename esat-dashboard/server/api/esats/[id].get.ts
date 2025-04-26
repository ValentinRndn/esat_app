import { db } from '~/server/utils/db'; // Use ~ alias
import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const esatIdParam = getRouterParam(event, 'id'); // Get the 'id' parameter from the route

  if (!esatIdParam) {
    setResponseStatus(event, 400); // Bad Request
    return { status: 'error', message: 'Missing ESAT ID parameter.' };
  }

  const esatId = parseInt(esatIdParam, 10);

  if (isNaN(esatId)) {
    setResponseStatus(event, 400); // Bad Request
    return { status: 'error', message: 'Invalid ESAT ID parameter. Must be a number.' };
  }

  try {
    const esat = await db.selectFrom('esats')
      .where('id', '=', esatId)
      .selectAll()
      .executeTakeFirst(); // Use executeTakeFirst() to get a single record or undefined

    if (!esat) {
      setResponseStatus(event, 404); // Not Found
      return { status: 'error', message: `ESAT with ID ${esatId} not found.` };
    }

    console.log(`Successfully fetched ESAT with ID ${esatId}.`);
    return {
      status: 'success',
      data: esat,
    };
  } catch (error: any) {
    console.error(`Error fetching ESAT with ID ${esatId}:`, error);
    setResponseStatus(event, 500); // Internal Server Error
    return {
      status: 'error',
      message: 'Failed to fetch ESAT data.',
      error: error.message, // Consider removing in production
    };
  }
});
