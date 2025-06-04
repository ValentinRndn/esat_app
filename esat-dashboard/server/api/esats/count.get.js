export default defineEventHandler(async (event) => {
  try {
    const { rows } = await event.context.prisma.$queryRaw`
      SELECT COUNT(*) as count FROM "Esat"
    `
    return { count: parseInt(rows[0].count) }
  } catch (error) {
    console.error('Erreur lors du comptage des ESATs:', error)
    throw createError({
      statusCode: 500,
      message: 'Erreur lors du comptage des ESATs'
    })
  }
}) 