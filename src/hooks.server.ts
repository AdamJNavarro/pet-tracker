import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';

import * as schema from '$db/schema';
import type { Handle } from '@sveltejs/kit';
import postgres from 'postgres';

Sentry.init({
	dsn: 'https://b1e08b8b7200dd59df1aea2277a2c37f@o435257.ingest.us.sentry.io/4507822379499520',
	tracesSampleRate: 1
});

if (!env.DB_URL) throw new Error('DB_URL is not set');

const client = postgres(env.DB_URL);

export const db = drizzle(client, { schema });
export type DrizzleClient = typeof db;

export const handle: Handle = sequence(Sentry.sentryHandle(), async function ({ event, resolve }) {
	event.locals.db = db;
	const response = await resolve(event);
	return response;
});
export const handleError = Sentry.handleErrorWithSentry();
