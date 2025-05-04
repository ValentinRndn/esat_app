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
    const result = await db
      .insertInto('workers')
      .values(body as Insertable<WorkerTable>) // Cast to ensure type compatibility
      .returning([
        'id',
        'esat_id',
        'first_name',
        'last_name',
        'date_of_birth',
        'contact_info',
        'internal_code',
        'entry_date_esat',
        'work_regime',
        'part_time_percentage',
        'work_hours',
        'living_situation',
        'mobility_info',
        'protection_measure',
        'health_info_summary',
        'educational_background',
        'professional_background_summary',
        'created_at',
        'updated_at'
      ]) // Explicitly list all fields to return
      .executeTakeFirstOrThrow(); // Use OrThrow to ensure a result is returned

    setResponseStatus(event, 201); // Created
    return result;
  } catch (error: any) {
    console.error('Error creating worker:', error);
    // Throw a generic server error for other issues
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create worker',
      message: error.message,
    });
  }
});
