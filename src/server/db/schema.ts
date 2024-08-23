import { relations } from 'drizzle-orm';
import { serial, text, pgTable, pgEnum, integer, timestamp } from 'drizzle-orm/pg-core';

export const activity_enum = pgEnum('activity', ['bathed', 'fed', 'groomed', 'outside', 'walked']);

export const pack = pgTable('packs', {
	id: serial('id').primaryKey(),
	avatar_url: text('avatar_url'),
	name: text('name').notNull()
});

export const pack_relations = relations(pack, ({ many }) => ({
	activities: many(pack_activity),
	pets: many(pet)
}));

export const pack_activity = pgTable('pack_activities', {
	id: serial('id').primaryKey(),
	pack_id: integer('pack_id')
		.notNull()
		.references(() => pack.id),
	name: activity_enum('activity').notNull()
});

export const pack_activity_relations = relations(pack_activity, ({ one, many }) => ({
	pack: one(pack, {
		fields: [pack_activity.pack_id],
		references: [pack.id]
	}),
	logs: many(pet_log)
}));

export const pet = pgTable('pets', {
	id: serial('id').primaryKey(),
	pack_id: integer('pack_id')
		.notNull()
		.references(() => pack.id),
	avatar_url: text('avatar_url'),
	name: text('name').notNull()
});

export const pet_relations = relations(pet, ({ one, many }) => ({
	pack: one(pack, {
		fields: [pet.pack_id],
		references: [pack.id]
	}),
	logs: many(pet_log)
}));

export const pet_log = pgTable('pet_logs', {
	id: serial('id').primaryKey(),
	pack_activity_id: integer('pack_activity_id')
		.notNull()
		.references(() => pack_activity.id),
	pet_id: integer('pet_id')
		.notNull()
		.references(() => pet.id),
	completed_at: text('completed_at'),
	fallback_timestamp: text('fallback_timestamp'),
	desired_frequency: integer('desired_frequency'), // in ms
	updated_at: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
});

export const pet_log_relations = relations(pet_log, ({ one }) => ({
	pack_activity: one(pack_activity, {
		fields: [pet_log.pack_activity_id],
		references: [pack_activity.id]
	}),
	pet: one(pet, {
		fields: [pet_log.pet_id],
		references: [pet.id]
	})
}));

// bathed_at: timestamp('bathed_at', { mode: 'string' }),
// fed_at: timestamp('fed_at', { mode: 'string' }),
// groomed_at: timestamp('groomed_at', { mode: 'string' }),
// outside_at: timestamp('outside_at', { mode: 'string' }),
// walked_at: timestamp('walked_at', { mode: 'string' })

// import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

// export const pets = pgTable('pets', {
// 	id: serial('id').primaryKey(),
// 	avatar_url: text('avatar_url'),
// 	name: text('name').notNull().unique(),
// 	bathed_at: timestamp('bathed_at', { mode: 'string' }),
// 	fed_at: timestamp('fed_at', { mode: 'string' }),
// 	groomed_at: timestamp('groomed_at', { mode: 'string' }),
// 	outside_at: timestamp('outside_at', { mode: 'string' }),
// 	walked_at: timestamp('walked_at', { mode: 'string' })
// });

// SQL STATEMENTS

// Create pack
// INSERT INTO packs (name) VALUES ('navarro');

// Create Pets
// INSERT INTO pets (name, pack_id) VALUES ('ace', 1);

// Create Pack Activity
// INSERT INTO pack_activities (pack_id, activity) VALUES (1, 'outside');

// Create Pet Logs
// INSERT INTO pet_logs (pack_activity_id, pet_id) VALUES (1, 1);
// INSERT INTO pet_logs (pack_activity_id, pet_id) VALUES (1, 2);
