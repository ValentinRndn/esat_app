import { defineEventHandler, getRouterParam, readBody, setResponseStatus, createError } from 'h3';
import { db, WorkerTable, sanitizeDbInput } from '../../utils/db'; // Adjust path
import { Updateable, Selectable } from 'kysely';
import { sanitizeDates } from '../../utils/date-helpers';

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

  try {
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

    // Validation et nettoyage spécifique pour activity_sectors
    if (body.activity_sectors !== undefined && body.activity_sectors !== null) {
      // Si c'est une chaîne simple (séparée par des virgules), la convertir en JSON
      if (typeof body.activity_sectors === 'string') {
        try {
          // Vérifier si c'est déjà du JSON valide
          JSON.parse(body.activity_sectors);
          // Si c'est du JSON valide, ne rien faire
        } catch (e) {
          // Si ce n'est pas du JSON, transformer en tableau JSON
          const sectors = body.activity_sectors.split(',').map(s => s.trim()).filter(s => s);
          body.activity_sectors = JSON.stringify(sectors);
        }
      } else if (Array.isArray(body.activity_sectors)) {
        // Si c'est un tableau, le convertir en JSON
        body.activity_sectors = JSON.stringify(body.activity_sectors);
      } else {
        // Autres cas, mettre un tableau vide en JSON
        body.activity_sectors = '[]';
      }
    }

    // 3. Sanitize dates in the request body
    const datesSanitized = sanitizeDates(body);
    
    // 4. Sanitize all input data to prevent SQL issues
    const sanitizedData = sanitizeDbInput(datesSanitized);

    // 5. Prepare update data
    const workerDataToUpdate: Partial<Updateable<WorkerTable>> = { ...sanitizedData };

    // Add updated_at timestamp
    workerDataToUpdate.updated_at = new Date();

    console.log('Updating worker with data:', workerDataToUpdate);

    // 6. Execute update query with only fields that have values (excluding undefined/null)
    const filteredData: Record<string, any> = {};
    for (const [key, value] of Object.entries(workerDataToUpdate)) {
      if (value !== undefined) {
        filteredData[key] = value;
      }
    }

    // Juste avant d'exécuter la requête d'update, ajoutons des logs de débogage
    console.log('Type de activity_sectors:', typeof filteredData.activity_sectors);
    console.log('Valeur de activity_sectors:', filteredData.activity_sectors);

    // Si social_relations est présent, s'assurer qu'il est au bon format
    if (filteredData.social_relations) {
      try {
        // S'assurer que c'est une chaîne JSON valide
        if (typeof filteredData.social_relations === 'object') {
          filteredData.social_relations = JSON.stringify(filteredData.social_relations);
        }
        // Vérifier si c'est un JSON valide
        JSON.parse(filteredData.social_relations as string);
      } catch (e) {
        console.error('Erreur avec social_relations, valeur supprimée:', e);
        delete filteredData.social_relations;
      }
    }

    // Modifier la requête pour supprimer returningAll() qui n'est pas compatible avec MySQL
    const updateResult = await db
      .updateTable('workers')
      .set(filteredData)
      .where('id', '=', workerId)
      .executeTakeFirst();

    // Vérifier si la mise à jour a affecté une ligne
    if (!updateResult || Number(updateResult.numUpdatedRows) === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Worker not found' });
    }

    // 7. Récupérer les données mises à jour avec une requête séparée
    const result = await db
      .selectFrom('workers')
      .where('id', '=', workerId)
      .selectAll()
      .executeTakeFirst();

    // 8. Handle not found (par sécurité, au cas où la ligne aurait été supprimée entre-temps)
    if (!result) {
      throw createError({ statusCode: 404, statusMessage: 'Worker not found' });
    }

    // 9. Return updated worker data
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
