import { defineEventHandler, getRouterParam, readBody, setResponseStatus, createError } from 'h3';
import { db, WorkerTable } from '../../utils/db'; // Adjust path
import { Updateable, Selectable } from 'kysely';

// Define the type for the data expected in the request body for updating a worker
// All fields are optional. Exclude id, created_at, updated_at.
type WorkerUpdateData = Partial<Omit<Updateable<WorkerTable>, 'id' | 'created_at' | 'updated_at'>>;

// Define the type for the worker data we expect to return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<WorkerSelectable | undefined> => {
  // 1. Get and validate Worker ID
  const workerIdParam = getRouterParam(event, 'id');
  const workerId = workerIdParam ? parseInt(workerIdParam, 10) : NaN;
  if (isNaN(workerId)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid worker ID' });
  }

  // 2. Read and validate request body
  const body = await readBody<WorkerUpdateData>(event);
  if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid or empty request body' });
  }

  // Prevent updating the ID or timestamps directly
  delete (body as any).id;
  delete (body as any).created_at;
  delete (body as any).updated_at;

  // Validate enum values if provided
  if (body.work_regime && !['full-time', 'part-time', null].includes(body.work_regime)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid work_regime value' });
  }
  if (body.protection_measure && 
      !['tutelle', 'curatelle_simple', 'curatelle_renforcee', 'pas_de_mesure', 'autre', null].includes(body.protection_measure)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid protection_measure value' });
  }

  try {
    // 3. Prepare update data
    const workerDataToUpdate: Partial<Updateable<WorkerTable>> = { ...body };

    // Add updated_at timestamp (assuming DB doesn't auto-update ON UPDATE)
    // If your DB handles this automatically, you can remove this line.
    workerDataToUpdate.updated_at = new Date();

    // 4. Execute update query
    const result = await db
      .updateTable('workers')
      .set(workerDataToUpdate)
      .where('id', '=', workerId)
      .returningAll()
      .executeTakeFirst(); // Use executeTakeFirst as update might affect 0 or 1 row

    // 5. Handle not found
    if (!result) {
      throw createError({ statusCode: 404, statusMessage: 'Worker not found' });
    }

    // 6. Return updated worker data
    return result;

  } catch (error: any) {
    // Re-throw known errors (like 404)
    if (error.statusCode) {
        throw error;
    }

    console.error(`Error updating worker with ID ${workerId}:`, error);
    // Throw a generic server error for other issues
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update worker with ID ${workerId}`,
      message: error.message,
    });
  }
});
