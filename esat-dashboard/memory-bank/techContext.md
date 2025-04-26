# Technical Context: ESAT Dashboard

## Core Technologies

*   **Framework:** [Nuxt 3](https://nuxt.com/) (Vue 3 based full-stack framework)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) (Superset of JavaScript adding static types)
*   **Database:** [MySQL](https://www.mysql.com/) (Relational Database Management System)
*   **ORM/Query Builder:** [Kysely](https://kysely.dev/) (Type-safe SQL query builder for TypeScript)
*   **Database Driver:** [mysql2](https://github.com/sidorares/node-mysql2) (Node.js MySQL client)
*   **Package Manager:** [npm](https://www.npmjs.com/) (Selected during project initialization)
*   **Runtime Environment:** [Node.js](https://nodejs.org/) (Required by Nuxt)

## Development Setup

*   **Project Initialization:** Created using `npx nuxi init esat-dashboard`.
*   **Dependencies:** Managed via `package.json` and installed using `npm install`.
*   **Environment Variables:** Stored in `.env` at the project root for database configuration (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) and Nuxt config (`NUXT_PUBLIC_API_BASE`).
*   **Development Server:** Run using `npm run dev`.

## Key Files/Modules Established

*   `nuxt.config.ts`: Main Nuxt configuration file.
*   `.env`: Environment variables (placeholders initially).
*   `package.json`: Project dependencies and scripts.
*   `server/utils/db.ts`: Kysely instance initialization and database type definitions.
*   `server/api/esats.get.ts`: Example API route for fetching ESAT data.

## Tool Usage Patterns

*   **Database Queries:** Performed using the exported `db` instance from `server/utils/db.ts` within `server/api/` routes.
*   **Environment Variables:** Accessed via `process.env` within server-side code (like `db.ts`). Nuxt handles loading `.env`. Public variables (prefixed with `NUXT_PUBLIC_`) are also available client-side via `useRuntimeConfig`.
