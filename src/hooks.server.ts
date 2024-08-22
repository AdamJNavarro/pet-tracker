import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '$env/dynamic/private';

import * as schema from '$db/schema';
import type { Handle } from '@sveltejs/kit';
import postgres from 'postgres';
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });
export type DrizzleClient = typeof db;

export const handle: Handle = async function ({ event, resolve }) {
	event.locals.db = db;
	const response = await resolve(event);
	return response;
};
