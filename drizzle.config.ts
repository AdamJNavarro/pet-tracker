import { defineConfig } from 'drizzle-kit';
if (!process.env.PROD_DB_URL) throw new Error('PROD DB URL is not set');
if (!process.env.DEV_DB_URL) throw new Error('DEV DB URL is not set');
const is_dev = process.env.DB_ENV === 'dev';
console.log('is_dev', is_dev);
const db_url = is_dev ? process.env.DEV_DB_URL : process.env.PROD_DB_URL;
console.log('db_url', db_url);

export default defineConfig({
	schema: './src/server/db/schema.ts',
	dbCredentials: {
		url: db_url
	},
	out: is_dev ? './src/server/db/migrations/dev' : './src/server/db/migrations/prod',
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
