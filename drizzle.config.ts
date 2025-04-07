import { defineConfig } from 'drizzle-kit';
if (!process.env.PROD_DB_URL) throw new Error('PROD DB URL is not set');
if (!process.env.DEV_DB_URL) throw new Error('DEV DB URL is not set');
const is_dev = process.env.DB_ENV === 'dev';
const db_url = is_dev ? process.env.DEV_DB_URL : process.env.PROD_DB_URL;

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: {
		url: db_url
	},
	out: is_dev ? './src/lib/server/db/migrations/dev' : './src/lib/server/db/migrations/prod',
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
