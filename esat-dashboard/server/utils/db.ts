import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2'; // Use mysql2 for the pool
import { useRuntimeConfig } from '#imports'; // Import useRuntimeConfig from Nuxt 3

// Define placeholder interfaces for your database tables.
// You'll need to replace these with the actual column types based on your schema.
// IMPORTANT: These types should match your MySQL schema exactly for type safety.
// Use singular names for table types, plural for the Database interface keys.

interface EsatTable {
  id: number; // Assuming INT AUTO_INCREMENT
  name: string; // VARCHAR(255)
  address: string | null; // VARCHAR(255) NULL
  city: string | null; // VARCHAR(100) NULL
  postal_code: string | null; // VARCHAR(20) NULL
  phone: string | null; // VARCHAR(50) NULL
  email: string | null; // VARCHAR(255) NULL
  created_at: Date; // TIMESTAMP
  updated_at: Date; // TIMESTAMP
}

export interface UserTable { // Added export keyword
  id: number; // INT AUTO_INCREMENT
  esat_id: number | null; // INT NULL (Foreign key) - Use snake_case to match DB
  email: string; // VARCHAR(255) UNIQUE
  password_hash: string; // VARCHAR(255)
  role: 'super_admin' | 'admin_esat' | 'user_esat'; // ENUM
  is_active: boolean; // BOOLEAN
  created_at: Date; // TIMESTAMP
  updated_at: Date; // TIMESTAMP
}

export interface WorkerTable {
  id: number; // INT AUTO_INCREMENT
  esat_id: number; // INT NOT NULL (Foreign key)
  first_name: string; // VARCHAR(100)
  last_name: string; // VARCHAR(100)
  date_of_birth: Date | null; // DATE NULL
  contact_info: string | null; // VARCHAR(255) NULL
  internal_code: string | null; // VARCHAR(50) NULL
  entry_date_esat: Date | null; // DATE NULL
  work_regime: 'full-time' | 'part-time' | null; // ENUM NULL
  part_time_percentage: number | null; // INT NULL
  work_hours: string | null; // VARCHAR(100) NULL
  living_situation: string | null; // TEXT NULL
  mobility_info: string | null; // TEXT NULL
  protection_measure: 'tutelle' | 'curatelle_simple' | 'curatelle_renforcee' | 'pas_de_mesure' | 'autre' | null; // ENUM NULL
  health_info_summary: string | null; // TEXT NULL
  educational_background: string | null; // TEXT NULL
  professional_background_summary: string | null; // TEXT NULL
  created_at: Date; // TIMESTAMP
  updated_at: Date; // TIMESTAMP
}

// TODO: Add interfaces for your other tables (ai_evaluations, ppp_actions, subscription_plans, subscriptions, job_offers, worker_job_offers)
// Example:
// interface AiEvaluationTable { ... }

// Define the main Database interface. Keys are table names (plural), values are the table types.
export interface Database {
  esats: EsatTable;
  users: UserTable;
  workers: WorkerTable;
  // TODO: Add other tables here
  // ai_evaluations: AiEvaluationTable;
  // ...
}

// Access runtime configuration
const runtimeConfig = useRuntimeConfig();

// Check for database configuration variables from runtimeConfig
// Note: useRuntimeConfig() handles loading from .env automatically on the server
const { dbHost, dbPort, dbUser, dbPassword, dbName } = runtimeConfig; // Use camelCase here if defined as such in nuxt.config.ts

// Perform the check using variables from runtimeConfig, allowing empty string for password
if (dbHost === undefined || dbHost === null ||
    dbPort === undefined || dbPort === null ||
    dbUser === undefined || dbUser === null ||
    dbPassword === undefined || dbPassword === null || // Check specifically for undefined/null
    dbName === undefined || dbName === null) {
  // Log the variables to help debug which one is missing or undefined
  console.error('Database config (check failed):', { dbHost, dbPort, dbUser, dbPassword, dbName });
  throw new Error(
    'Missing one or more database configuration variables in runtimeConfig (dbHost, dbPort, dbUser, dbPassword, dbName). Please check your .env file and nuxt.config.ts'
  );
}

// Create the Kysely dialect for MySQL
const dialect = new MysqlDialect({
  pool: createPool({
    host: dbHost,
    port: parseInt(dbPort as string, 10), // Ensure port is a number, cast as string for safety
    user: dbUser,
    password: dbPassword,
    database: dbName,
    connectionLimit: 10, // Example pool configuration
    // You might need additional options like:
    // waitForConnections: true,
    // queueLimit: 0,
  }),
});

// Initialize Kysely with the defined Database interface and the dialect
// We export this instance for use in API routes.
export const db = new Kysely<Database>({ dialect });

console.log('Database connection utility initialized using runtimeConfig.'); // Log initialization success
