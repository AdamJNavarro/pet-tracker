import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const is_dev = process.env.DB_ENV === 'dev';

export default defineConfig({
	schema: './src/server/db/schema.ts',
	dbCredentials: {
		url: process.env.DATABASE_URL
	},
	out: is_dev ? './src/server/db/migrations/dev' : './src/server/db/migrations/prod',
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
