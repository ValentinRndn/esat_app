# System Patterns: ESAT Dashboard

## Architecture Overview

The project follows the standard Nuxt 3 architecture, leveraging its file-based routing and server engine capabilities.

*   **Frontend:** Vue 3 components managed by Nuxt within:
    *   `layouts/`: Application layout templates (e.g., `default.vue`)
    *   `pages/`: Route-based views with automatic routing (e.g., `index.vue`, `esats/index.vue`)
    *   `components/`: Reusable UI components (to be created as needed)
*   **Backend API:** Nuxt 3 server routes located in the `server/api/` directory. These handle incoming requests, interact with the database, and return data (typically JSON).
*   **Database Interaction:** Centralized through a utility module (`server/utils/db.ts`) that exports a configured Kysely instance. API routes import and use this instance.
*   **Configuration:** Sensitive data like database credentials are managed via environment variables (`.env` file) and exposed server-side via Nuxt's `runtimeConfig` defined in `nuxt.config.ts`.

## Key Patterns Established

1.  **Server API Routes:** Using Nuxt's built-in server engine (`nitro`) for creating API endpoints directly within the project structure (`server/api/`). This simplifies deployment and development.
    *   **CRUD Pattern:** Implemented standard RESTful CRUD operations for the `esats` resource using the following file structure:
        *   `server/api/esats.get.ts`: List all resources (GET /api/esats)
        *   `server/api/esats.post.ts`: Create a new resource (POST /api/esats)
        *   `server/api/esats/[id].get.ts`: Get a single resource by ID (GET /api/esats/{id})
        *   `server/api/esats/[id].put.ts`: Update a resource by ID (PUT /api/esats/{id})
        *   `server/api/esats/[id].delete.ts`: Delete a resource by ID (DELETE /api/esats/{id})
    *   This pattern is replicated for the `users` resource (`server/api/users/`, `server/api/users/[id]/`) and the `workers` resource (`server/api/workers/`, `server/api/workers/[id]/`).
    *   **Request Handling:** Using `h3` utilities (`defineEventHandler`, `getRouterParam`, `readBody`, `setResponseStatus`, `createError`) within API route handlers.
    *   **Response Filtering:** Sensitive data (e.g., `password_hash`) is explicitly excluded from data returned by API endpoints using Kysely's `.select()` or type definitions (`Omit`).
    *   **Field Validation:** Input validation for required fields and enum values (e.g., `work_regime`, `protection_measure` in worker endpoints).
2.  **Type-Safe Database Access:** Employing Kysely with TypeScript interfaces (`Database`, `EsatTable`, `UserTable`, `WorkerTable`, etc. in `server/utils/db.ts`) to ensure type safety from the database query down to the API response. Includes specific input/output type definitions (e.g., `UserInsertData`, `UserUpdateData`, `UserSelectable`, `WorkerInsertData`, `WorkerUpdateData`, `WorkerSelectable`) in API handlers.
3.  **Password Hashing:** Using `bcrypt` library to securely hash user passwords before storing them in the database (`password_hash` column). Hashing occurs in the POST (`users.post.ts`) and PUT (`users/[id].put.ts`) endpoints.
4.  **Environment Variable Configuration:** Standard practice using `.env` for local development, with server-side variables accessed securely via Nuxt's `runtimeConfig` defined in `nuxt.config.ts`.
5.  **Centralized DB Utility:** Creating a single point of access (`server/utils/db.ts`) for the database instance promotes consistency and simplifies potential future modifications to the database connection logic.

## Frontend Patterns

1.  **Layout Structure:** Using a consistent layout (`layouts/default.vue`) with:
    *   Header with navigation links
    *   Main content area
    *   Footer with copyright information
2.  **Page Organization:** Following a consistent pattern for entity management:
    *   List view (`/entity/`) - Displays all records with actions
    *   Detail view (`/entity/[id]`) - Shows complete information for a single record
    *   Create form (`/entity/create`) - Form for adding new records
    *   Edit form (`/entity/[id]/edit`) - Form for updating existing records
3.  **UI Components:**
    *   Card containers for content sections
    *   Consistent form styling and validation
    *   Modal dialogs for confirmations
    *   Alert messages for success/error feedback
    *   Loading indicators during async operations
4.  **Data Fetching:** Using the Fetch API within `onMounted` lifecycle hooks to retrieve data from the backend API endpoints.
5.  **Form Handling:**
    *   Form submission with `@submit.prevent`
    *   Input validation with required attributes and custom validation
    *   Disabling form controls during submission
    *   Success/error state management
    *   Reset functionality to restore original values
6.  **Responsive Design:** Using CSS Grid and Flexbox for responsive layouts that adapt to different screen sizes.

## Future Considerations

*   **Authentication/Authorization:** Will need a robust pattern for securing API endpoints and managing user roles/permissions.
*   **State Management:** Depending on frontend complexity, a state management library (like Pinia, integrated with Nuxt) might be necessary.
*   **Error Handling:** More sophisticated error handling and logging will be required beyond the basic `try...catch` blocks.
*   **Data Validation:** Input validation (e.g., using `zod`) should be added to API routes to ensure data integrity before database operations.
*   **Component Extraction:** As the UI grows, common patterns should be extracted into reusable components.
*   **Accessibility:** Ensure the application meets accessibility standards (WCAG).
