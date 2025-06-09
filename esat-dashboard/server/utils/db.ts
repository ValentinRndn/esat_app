// utils/db.ts
import { Kysely, MysqlDialect, type Selectable, type Generated } from 'kysely'; // AJOUTEZ Selectable et Generated ici
import { createPool } from 'mysql2';
import { useRuntimeConfig } from '#imports';

// --- Helpers pour les champs spéciaux ---

/**
 * Nettoie les données avant de les envoyer à la base de données
 * Prévient les erreurs SQL et les injections
 */
export function sanitizeDbInput<T extends Record<string, any>>(input: T): Record<string, any> {
  const result: Record<string, any> = { ...input };

  // Liste des champs à traiter avec soin
  const commaListFields = [
    'reading_skills', 'writing_skills', 
    'calculation_skills', 'next_steps'
  ];
  
  const jsonFields = [
    'activity_sectors',
    'professional_evaluation', 'social_relations', 'spatial_temporal_orientation',
    'professional_experiences', 'declined_applications',
    'professional_project_2_years', 'social_life_project', 'training_project', 
    'employment_insertion_project'
  ];

  // Nettoyer les champs de liste (ne pas les convertir en JSON, mais s'assurer qu'ils sont bien formatés)
  for (const field of commaListFields) {
    if (field in result && result[field] !== null && result[field] !== undefined) {
      // Si c'est un tableau, le convertir en chaîne
      if (Array.isArray(result[field])) {
        result[field] = result[field].join(',');
      }
      
      // S'assurer que c'est une chaîne et supprimer les caractères qui pourraient causer des problèmes
      if (typeof result[field] === 'string') {
        result[field] = result[field].replace(/['"`]/g, '');
      }
    }
  }

  // Traiter les champs JSON
  for (const field of jsonFields) {
    if (field in result && result[field] !== null && result[field] !== undefined) {
      // Si c'est déjà un objet, le convertir en chaîne JSON
      if (typeof result[field] === 'object') {
        try {
          result[field] = JSON.stringify(result[field]);
        } catch (e) {
          console.error(`Erreur lors de la conversion en JSON pour ${field}:`, e);
          result[field] = null;
        }
      } 
      // Si c'est une chaîne, s'assurer qu'elle est au format JSON valide
      else if (typeof result[field] === 'string') {
        const trimmed = result[field].trim();
        if (trimmed === '') {
          result[field] = null;
        } else if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) {
          // Si ce n'est pas déjà du JSON (ne commence pas par { ou [)
          try {
            // Essayer de le convertir en JSON
            result[field] = JSON.stringify(trimmed);
          } catch (e) {
            console.error(`Erreur lors de la conversion en JSON pour ${field}:`, e);
            result[field] = null;
          }
        } else {
          // Vérifier si c'est un JSON valide
          try {
            JSON.parse(trimmed);
            // Si ça passe, c'est déjà un JSON valide, on garde tel quel
          } catch (e) {
            // Si ce n'est pas un JSON valide, mettre à null
            console.error(`Chaîne JSON invalide pour ${field}:`, e);
            result[field] = null;
          }
        }
      }
    }
  }

  // Pour les champs booléens, s'assurer qu'ils sont bien convertis
  const booleanFields = ['has_cv', 'has_motivation_letter', 'has_cpf_account', 'information_sharing_consent'];
  for (const field of booleanFields) {
    if (field in result) {
      // Convertir en vrai booléen
      if (result[field] === 1 || result[field] === '1' || result[field] === 'true' || result[field] === true) {
        result[field] = true;
      } else if (result[field] === 0 || result[field] === '0' || result[field] === 'false' || result[field] === false) {
        result[field] = false;
      } else {
        result[field] = null;
      }
    }
  }

  return result as T;
}

// --- Interfaces des Tables ---

export interface EsatTable {
  id: Generated<number>; // Utilisez Generated<number> si 'id' est AUTO_INCREMENT
  name: string;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  latitude: number | null; // Coordonnée latitude pour la localisation
  longitude: number | null; // Coordonnée longitude pour la localisation
  created_at: Date; // Kysely gère bien les objets Date pour les TIMESTAMPS
  updated_at: Date;
}
export type EsatSelectable = Selectable<EsatTable>;

export interface UserTable {
  id: Generated<number>;
  esat_id: number | null;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: 'super_admin' | 'admin_esat' | 'user_esat';
  is_active: boolean; // MySQL utilise TINYINT(1) pour BOOLEAN, Kysely le gère
  created_at: Date;
  updated_at: Date;
}
export type UserSelectable = Selectable<UserTable>;

export interface WorkerTable {
  id: number;
  esat_id: number | null;
  first_name: string;
  last_name: string;
  birth_date: Date | null;
  contact_info: string | null;
  internal_code: string | null;
  entry_date_esat: Date | null;
  work_regime: string | null;
  part_time_percentage: number | null;
  work_hours: string | null;
  living_situation: string | null;
  mobility_info: string | null;
  protection_measure: string | null;
  health_info_summary: string | null;
  educational_background: string | null;
  professional_background_summary: string | null;
  created_at: Date;
  updated_at: Date;
  
  // Champs texte simples
  legal_guardian: string | null;
  emergency_contact: string | null;
  // Liste séparée par des virgules (pas un JSON)
  activity_sectors: string | null;
  activity_sectors_other: string | null;
  vigilance_points: string | null;
  vigilance_actions: string | null;
  // JSON
  spatial_temporal_orientation: string | null;
  // Listes séparées par des virgules (pas JSON)
  reading_skills: string | null;
  writing_skills: string | null;
  calculation_skills: string | null;
  computer_skills: string | null;
  computer_skills_comments: string | null;
  // JSON
  professional_evaluation: string | null;
  professional_evaluation_comments: string | null;
  // JSON
  social_relations: string | null;
  social_relations_comments: string | null;
  has_cv: boolean | null;
  has_motivation_letter: boolean | null;
  has_cpf_account: boolean | null;
  employer_work_willingness: string | null;
  desired_job_field: string | null;
  desired_companies: string | null;
  geographic_mobility: string | null;
  geographic_mobility_other: string | null;
  // JSON
  professional_experiences: string | null;
  // JSON
  declined_applications: string | null;
  exceptional_experiences: string | null;
  project_difficulties: string | null;
  professional_project_clarity: number | null;
  ordinary_work_capacity: number | null;
  monitor_assessment: string | null;
  // Liste séparée par des virgules
  next_steps: string | null;
  information_sharing_consent: boolean | null;
  signature_name: string | null;
  // JSON
  professional_project_2_years: string | null;
  // JSON
  social_life_project: string | null;
  // JSON
  training_project: string | null;
  // JSON
  employment_insertion_project: string | null;
}
export type WorkerSelectable = Selectable<WorkerTable>;

export interface AiSuggestionTable {
  id: Generated<number>;
  worker_id: number; // Foreign key vers WorkerTable
  esat_id: number; // Pour la sécurité et les requêtes optimisées
  suggestion_type: string; // Type de suggestion (ex: "job_recommendation", "skills_assessment", "training_plan")
  prompt: string; // La question/prompt envoyée à l'IA
  response: string; // La réponse complète de l'IA
  summary: string | null; // Un résumé optionnel de la suggestion
  confidence_score: number | null; // Score de confiance de 0 à 100
  status: 'pending' | 'completed' | 'reviewed' | 'applied' | 'rejected'; // Statut de la suggestion
  tags: string | null; // Tags séparés par des virgules pour faciliter la recherche
  created_by: number; // ID de l'utilisateur qui a créé la suggestion
  reviewed_by: number | null; // ID de l'utilisateur qui a reviewé la suggestion
  reviewed_at: Date | null; // Date de review
  created_at: Date;
  updated_at: Date;
}
export type AiSuggestionSelectable = Selectable<AiSuggestionTable>;

// TODO: Ajoutez les interfaces ET les types Selectable pour vos autres tables

// --- Interface Database ---
export interface Database {
  esats: EsatTable;
  users: UserTable;
  workers: WorkerTable;
  ai_suggestions: AiSuggestionTable;
  // TODO: Ajoutez d'autres tables ici
}

// --- Configuration Kysely ---
const runtimeConfig = useRuntimeConfig();
const { dbHost, dbPort, dbUser, dbPassword, dbName } = runtimeConfig;

if (
    dbHost === undefined || dbHost === null ||
    dbPort === undefined || dbPort === null ||
    dbUser === undefined || dbUser === null ||
    dbPassword === undefined || dbPassword === null ||
    dbName === undefined || dbName === null
  ) {
  console.error('Database config (check failed):', { dbHost, dbPort, dbUser, dbPassword, dbName });
  throw new Error(
    'Missing one or more database configuration variables in runtimeConfig. Check .env and nuxt.config.ts'
  );
}

const dialect = new MysqlDialect({
  pool: createPool({
    host: dbHost as string, // Cast direct si vous êtes sûr du type après la vérification
    port: parseInt(dbPort as string, 10),
    user: dbUser as string,
    password: dbPassword as string, // Le mot de passe peut être une chaîne vide
    database: dbName as string,
    connectionLimit: 10,
    dateStrings: true, // Important pour que MySQL retourne les dates comme chaînes
                       // Kysely les convertira ensuite en objets Date si nécessaire
                       // ou vous pouvez les manipuler comme chaînes si vous préférez.
  }),
});

export const db = new Kysely<Database>({ dialect });

console.log('Database connection utility initialized using runtimeConfig.');
