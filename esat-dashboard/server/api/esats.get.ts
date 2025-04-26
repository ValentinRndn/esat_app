import { db } from '~/server/utils/db' // Use ~ alias for project root in server routes

export default defineEventHandler(async (event) => {
  try {
    // Use the imported 'db' instance to query the 'esats' table
    const esats = await db.selectFrom('esats')
      .selectAll() // Select all columns
      .execute() // Execute the query

    console.log(`Successfully fetched ${esats.length} ESAT records.`) // Optional: Log success
    return {
      status: 'success',
      data: esats,
    }
  } catch (error: any) {
    console.error('Error fetching ESATs:', error)

    // Set the response status code to 500 (Internal Server Error)
    // Nuxt 3 uses setResponseStatus helper
    setResponseStatus(event, 500)

    return {
      status: 'error',
      message: 'Failed to fetch ESAT data.',
      error: error.message, // Include error message for debugging (consider removing in production)
    }
  }
})
