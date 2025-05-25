// utils/db.ts
import { Kysely, MysqlDialect, type Selectable, type Generated } from 'kysely'; // AJOUTEZ Selectable et Generated ici
import { createPool } from 'mysql2';
import { useRuntimeConfig } from '#imports';

// --- Interfaces des Tables ---

export interface EsatTable {
  id: Generated<number>; // Utilisez Generated<number> si 'id' est AUTO_INCREMENT
  name: string;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
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
  
  // Ajoutez tous les nouveaux champs ici
  legal_guardian: string | null;
  emergency_contact: string | null;
  activity_sectors: string | null;
  activity_sectors_other: string | null;
  vigilance_points: string | null;
  vigilance_actions: string | null;
  spatial_temporal_orientation: string | null;
  reading_skills: string | null;
  writing_skills: string | null;
  calculation_skills: string | null;
  computer_skills: string | null;
  computer_skills_comments: string | null;
  professional_evaluation: string | null;
  professional_evaluation_comments: string | null;
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
  professional_experiences: string | null;
  declined_applications: string | null;
  exceptional_experiences: string | null;
  project_difficulties: string | null;
  professional_project_clarity: number | null;
  ordinary_work_capacity: number | null;
  monitor_assessment: string | null;
  next_steps: string | null;
  information_sharing_consent: boolean | null;
  signature_name: string | null;
  professional_project_2_years: string | null;
  social_life_project: string | null;
  training_project: string | null;
  employment_insertion_project: string | null;
}
export type WorkerSelectable = Selectable<WorkerTable>;

// TODO: Ajoutez les interfaces ET les types Selectable pour vos autres tables

// --- Interface Database ---
export interface Database {
  esats: EsatTable;
  users: UserTable;
  workers: WorkerTable;
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
