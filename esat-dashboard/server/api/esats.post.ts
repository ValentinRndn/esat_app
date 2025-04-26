import { db, type Database } from '~/server/utils/db'; // Use ~ alias and import Database type
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import type { Insertable } from 'kysely';

// Define the expected input type, excluding auto-generated fields like 'id', 'created_at', 'updated_at'
// Make fields optional if they are nullable in the DB and not required for creation
type EsatInsertData = Omit<Insertable<Database['esats']>, 'id' | 'created_at' | 'updated_at'> & {
  name: string; // Ensure name is required
};

export default defineEventHandler(async (event) => {
  let esatData: EsatInsertData;

  try {
    esatData = await readBody<EsatInsertData>(event);
  } catch (error: any) {
    console.error('Error reading request body:', error);
    setResponseStatus(event, 400); // Bad Request
    return { status: 'error', message: 'Invalid request body.', error: error.message };
  }

  // Basic validation: Ensure required fields are present
  if (!esatData || typeof esatData.name !== 'string' || esatData.name.trim() === '') {
    setResponseStatus(event, 400); // Bad Request
    return { status: 'error', message: 'Missing or invalid required field: name (must be a non-empty string).' };
  }

  // Remove any potential 'id', 'created_at', 'updated_at' fields sent by the client
  const { id, created_at, updated_at, ...insertData } = esatData as any; // Type assertion needed after destructuring

  try {
    // Kysely handles Date objects for TIMESTAMP/DATETIME columns automatically if provided
    // MySQL will set CURRENT_TIMESTAMP for created_at/updated_at if defined in the schema
    const result = await db.insertInto('esats')
      .values(insertData) // Use the validated and cleaned data
      .executeTakeFirst(); // Use executeTakeFirst to potentially get insertId

    // Check if the insert was successful (result might contain insertId depending on driver/config)
    // For simplicity, we'll assume success if no error is thrown.
    // A more robust check might involve result.numInsertedOrUpdatedRows

    console.log('Successfully created new ESAT:', insertData.name);
    setResponseStatus(event, 201); // Created

    // Optionally, fetch the newly created record to return it fully populated
    // const newEsat = await db.selectFrom('esats').where('id', '=', result.insertId)...
    // For now, just return success status and the data sent (without generated fields)
    return {
      status: 'success',
      message: 'ESAT created successfully.',
      data: insertData, // Return the data that was inserted
      // insertId: result?.insertId // Optionally include insertId if available and needed
    };

  } catch (error: any) {
    console.error('Error creating ESAT:', error);
    setResponseStatus(event, 500); // Internal Server Error
    // Check for specific DB errors like duplicate entry if needed
    // if (error.code === 'ER_DUP_ENTRY') { ... }
    return {
      status: 'error',
      message: 'Failed to create ESAT.',
      error: error.message, // Consider more generic message in production
    };
  }
});
