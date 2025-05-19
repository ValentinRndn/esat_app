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
  id: Generated<number>;
  esat_id: number;
  first_name: string;
  last_name: string;
  birth_date: Date | null;
  contact_info: string | null;
  internal_code: string | null;
  entry_date_esat: Date | null;
  work_regime: 'full-time' | 'part-time' | null;
  part_time_percentage: number | null;
  work_hours: string | null;
  living_situation: string | null;
  mobility_info: string | null;
  protection_measure: 'tutelle' | 'curatelle_simple' | 'curatelle_renforcee' | 'pas_de_mesure' | 'autre' | null;
  health_info_summary: string | null;
  educational_background: string | null;
  professional_background_summary: string | null;
  created_at: Date;
  updated_at: Date;
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
