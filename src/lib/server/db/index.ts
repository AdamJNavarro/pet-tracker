import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';
import postgres from 'postgres';
import * as schema from './schema';
import { DatabaseError } from '$utils/errors';

if (!env.DB_URL) throw new Error('DB_URL is not set');

// Create a connection function with retry logic
export function createDbClient() {
	try {
		const client = postgres(env.DB_URL, {
			max: 10,
			idle_timeout: 20,
			connect_timeout: 10
			// Handling connection-level errors
			// onnotice: (notice) => console.warn('Database notice:', notice),
			// onparameter: (param) => console.debug('Database parameter:', param)
		});

		return drizzle(client, { schema });
	} catch (err) {
		console.error('Failed to initialize database client:', err);
		throw new DatabaseError('Database connection failed', err);
	}
}

// Singleton pattern - create once and reuse
let dbClient: ReturnType<typeof createDbClient>;

export function getDbClient() {
	if (!dbClient) {
		dbClient = createDbClient();
	}
	return dbClient;
}
