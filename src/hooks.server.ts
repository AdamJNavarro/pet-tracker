import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';

import * as schema from '$db/schema';
import type { Handle } from '@sveltejs/kit';
import postgres from 'postgres';

if (!env.DB_URL) throw new Error('DB_URL is not set');

const client = postgres(env.DB_URL);

export const db = drizzle(client, { schema });
export type DrizzleClient = typeof db;

export const handle: Handle = async function ({ event, resolve }) {
	event.locals.db = db;
	const response = await resolve(event);
	return response;
};
