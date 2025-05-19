import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { db, WorkerTable } from '../utils/db'; // Adjust path
import { Insertable, Selectable } from 'kysely';

// Define the type for the data expected in the request body for creating a worker
// Exclude fields that are auto-generated (id, created_at, updated_at)
type WorkerInsertData = Omit<Insertable<WorkerTable>, 'id' | 'created_at' | 'updated_at'>;

// Define the type for the worker data we expect to return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<WorkerSelectable> => {
  const body = await readBody<WorkerInsertData>(event);

  // --- Basic Input Validation ---
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' });
  }
  
  // Required fields validation
  if (!body.esat_id || typeof body.esat_id !== 'number') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid esat_id' });
  }
  if (!body.first_name || typeof body.first_name !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid first_name' });
  }
  if (!body.last_name || typeof body.last_name !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid last_name' });
  }

  // Validate enum values if provided
  if (body.work_regime && !['full-time', 'part-time', null].includes(body.work_regime)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid work_regime value' });
  }
  if (body.protection_measure && 
      !['tutelle', 'curatelle_simple', 'curatelle_renforcee', 'pas_de_mesure', 'autre', null].includes(body.protection_measure)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid protection_measure value' });
  }

  try {
    // Insert the new worker into the database
    // MySQL does not support the RETURNING clause directly in INSERT statements.
    // Kysely's executeTakeFirstOrThrow() might still return the insertId for MySQL.
    const result = await db
      .insertInto('workers')
      .values(body as Insertable<WorkerTable>) // Cast to ensure type compatibility
      // Removed .returning() as it's not supported by MySQL
      .executeTakeFirstOrThrow(); // Use OrThrow to ensure a result is returned

    // For MySQL, result.insertId should contain the ID of the newly inserted row.
    // We need to return an object that matches the expected WorkerSelectable type,
    // which includes the ID. We can construct a basic object with the ID.
    // A more robust solution might involve a separate SELECT query after the INSERT
    // to fetch the complete inserted row, especially if default values or triggers
    // modify the data upon insertion. For now, we'll return a minimal object with the ID.
    const newWorkerId = Number(result.insertId); // Get the insertId

    // Return a minimal object with the ID, as the frontend expects an object with an 'id'
    const newWorker = { id: newWorkerId } as WorkerSelectable; // Cast to the expected type

    setResponseStatus(event, 201); // Created
    return newWorker; // Return the object with the new ID
  } catch (error: any) {
    console.error('Error creating worker:', error);
    // Throw a generic server error for other issues
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create worker',
      message: error.message, // Include error message for debugging (consider removing in production)
    });
  }
});
// Note: If you need to return the full inserted row, you would typically
// perform a SELECT query immediately after the INSERT using the newWorkerId.
// Example:
// const fullNewWorker = await db.selectFrom('workers').selectAll().where('id', '=', newWorkerId).executeTakeFirstOrThrow();
// return fullNewWorker;
