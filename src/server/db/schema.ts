import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const pets = pgTable('pets', {
	id: serial('id').primaryKey(),
	avatar_url: text('avatar_url'),
	name: text('name').notNull().unique(),
	bathed_at: timestamp('bathed_at', { mode: 'string' }),
	fed_at: timestamp('fed_at', { mode: 'string' }),
	groomed_at: timestamp('groomed_at', { mode: 'string' }),
	outside_at: timestamp('outside_at', { mode: 'string' }),
	walked_at: timestamp('walked_at', { mode: 'string' })
});
