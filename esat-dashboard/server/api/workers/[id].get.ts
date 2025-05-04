import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3';
import { db, WorkerTable } from '../../utils/db'; // Adjust path for nested directory
import { Selectable } from 'kysely';

// Define the type for the worker data we expect to select and return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<WorkerSelectable | undefined> => {
  const workerIdParam = getRouterParam(event, 'id');
  const workerId = workerIdParam ? parseInt(workerIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(workerId)) {
    setResponseStatus(event, 400); // Bad Request
    return undefined; // Or throw createError({ statusCode: 400, statusMessage: 'Invalid worker ID' });
  }

  try {
    // Fetch the worker by ID
    const worker = await db
      .selectFrom('workers')
      .where('id', '=', workerId)
      .selectAll()
      .executeTakeFirst(); // Use executeTakeFirst() for single record

    if (!worker) {
      setResponseStatus(event, 404); // Not Found
      return undefined; // Or throw createError({ statusCode: 404, statusMessage: 'Worker not found' });
    }

    return worker;
  } catch (error: any) {
    console.error(`Error fetching worker with ID ${workerId}:`, error);
    // Throw a structured error for Nuxt to handle
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch worker with ID ${workerId}`,
      message: error.message,
    });
  }
});
