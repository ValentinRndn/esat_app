import { db, type Database } from '~/server/utils/db'; // Use ~ alias and import Database type
import { defineEventHandler, getRouterParam, readBody, setResponseStatus } from 'h3';
import type { Updateable } from 'kysely';

// Define the expected input type for updates. All fields should be optional.
// Exclude 'id', 'created_at', 'updated_at' as they shouldn't be updated directly via PUT.
type EsatUpdateData = Partial<Omit<Updateable<Database['esats']>, 'id' | 'created_at' | 'updated_at'>>;

export default defineEventHandler(async (event) => {
  // 1. Get and validate ID parameter
  const esatIdParam = getRouterParam(event, 'id');
  if (!esatIdParam) {
    setResponseStatus(event, 400);
    return { status: 'error', message: 'Missing ESAT ID parameter.' };
  }

  const esatId = parseInt(esatIdParam, 10);
  if (isNaN(esatId)) {
    setResponseStatus(event, 400);
    return { status: 'error', message: 'Invalid ESAT ID parameter. Must be a number.' };
  }

  // 2. Read and validate request body
  let updateData: EsatUpdateData;
  try {
    updateData = await readBody<EsatUpdateData>(event);
  } catch (error: any) {
    console.error(`Error reading request body for updating ESAT ID ${esatId}:`, error);
    setResponseStatus(event, 400);
    return { status: 'error', message: 'Invalid request body.', error: error.message };
  }

  // Ensure there's actually data to update
  if (!updateData || Object.keys(updateData).length === 0) {
    setResponseStatus(event, 400);
    return { status: 'error', message: 'No update data provided.' };
  }

  // Optional: Add specific validation if needed (e.g., prevent setting name to empty string)
  if (updateData.name !== undefined && (typeof updateData.name !== 'string' || updateData.name.trim() === '')) {
      setResponseStatus(event, 400);
      return { status: 'error', message: 'Invalid field: name cannot be empty.' };
  }

  // Remove any potential 'id', 'created_at', 'updated_at' fields sent by the client
  const { id, created_at, updated_at, ...cleanUpdateData } = updateData as any;

  // Ensure we don't try to update with an empty object after cleaning
   if (Object.keys(cleanUpdateData).length === 0) {
    setResponseStatus(event, 400);
    return { status: 'error', message: 'No valid fields provided for update.' };
  }

  // 3. Perform Update Operation
  try {
    // Optionally add 'updated_at: new Date()' if your DB doesn't auto-update it
    const result = await db.updateTable('esats')
      .set(cleanUpdateData) // Pass the cleaned update data
      .where('id', '=', esatId)
      .executeTakeFirst(); // Use executeTakeFirst to get affected rows info

    // Check if any row was actually updated
    // result.numUpdatedRows might be BigInt(0) or BigInt(1) etc.
    if (result && Number(result.numUpdatedRows) > 0) {
      console.log(`Successfully updated ESAT with ID ${esatId}.`);
      // Optionally fetch the updated record to return it
      const updatedEsat = await db.selectFrom('esats').where('id', '=', esatId).selectAll().executeTakeFirst();
      return {
        status: 'success',
        message: 'ESAT updated successfully.',
        data: updatedEsat // Return the full updated record
      };
    } else {
      // If no rows were updated, it likely means the ID didn't exist
      console.warn(`Attempted to update ESAT with ID ${esatId}, but it was not found.`);
      setResponseStatus(event, 404); // Not Found
      return { status: 'error', message: `ESAT with ID ${esatId} not found or no changes detected.` };
    }

  } catch (error: any) {
    console.error(`Error updating ESAT with ID ${esatId}:`, error);
    setResponseStatus(event, 500); // Internal Server Error
    return {
      status: 'error',
      message: 'Failed to update ESAT.',
      error: error.message, // Consider more generic message in production
    };
  }
});
