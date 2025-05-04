import { defineEventHandler } from 'h3';
import { db, WorkerTable } from '../utils/db'; // Import db instance and WorkerTable type
import { Selectable } from 'kysely';

// Define the type for the worker data we expect to select and return
type WorkerSelectable = Selectable<WorkerTable>;

export default defineEventHandler(async (event): Promise<WorkerSelectable[]> => {
  try {
    // Fetch all workers from the database
    const workers = await db
      .selectFrom('workers')
      .selectAll()
      .execute();

    return workers;
  } catch (error: any) {
    console.error('Error fetching workers:', error);
    // Throw a structured error for Nuxt to handle
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch workers',
      message: error.message,
    });
  }
});
