import { db } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  try {
    const esats = await db.selectFrom('esats')
      .selectAll()
      .execute();

    return {
      status: 'success',
      data: esats,
    };
  } catch (error: any) {
    console.error('Error fetching ESATs for debugging:', error);
    setResponseStatus(event, 500);
    return {
      status: 'error',
      message: 'Failed to fetch ESAT data for debugging.',
      error: error.message,
    };
  }
});
