import { db } from '../../utils/db.ts';

export default defineEventHandler(async (event) => {
  try {
    const result = await db.selectFrom('esats')
      .select(({ fn }) => [
        fn.count('id').as('count')
      ])
      .executeTakeFirst();
    
    return { count: parseInt(result?.count) || 0 };
  } catch (error) {
    console.error('Erreur lors du comptage des ESATs:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors du comptage des ESATs'
    });
  }
}); 