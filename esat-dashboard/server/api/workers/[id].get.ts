import { defineEventHandler, getRouterParam, setResponseStatus, createError } from 'h3';
import { db, WorkerTable } from '../../utils/db';
import { Selectable } from 'kysely';

// Define the type for the worker data we expect to select and return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<WorkerSelectable | undefined> => {
  const workerIdParam = getRouterParam(event, 'id');
  const workerId = workerIdParam ? parseInt(workerIdParam, 10) : NaN;

  // Validate the ID
  if (isNaN(workerId)) {
    setResponseStatus(event, 400);
    return undefined;
  }

  try {
    // Fetch the worker by ID
    const worker = await db
      .selectFrom('workers')
      .where('id', '=', workerId)
      .selectAll()
      .executeTakeFirst();

    if (!worker) {
      setResponseStatus(event, 404);
      return undefined;
    }

    return worker;
  } catch (error: any) {
    console.error(`Error fetching worker with ID ${workerId}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch worker with ID ${workerId}`,
      message: error.message,
    });
  }
});
