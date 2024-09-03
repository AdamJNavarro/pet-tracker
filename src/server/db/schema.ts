import { relations } from 'drizzle-orm';
import { serial, text, pgTable, pgEnum, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const activity_enum = pgEnum('activity', [
	'bathed',
	'fed',
	'groomed',
	'meds',
	'outside',
	'walked'
]);

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
	name: activity_enum('activity').notNull(),
	ranking: serial('ranking').notNull(),
	tracking: boolean('tracking').notNull().default(true)
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
	tracking: boolean('tracking').notNull().default(true),
	completed_at: text('completed_at'),
	fallback_timestamp: text('fallback_timestamp'),
	desired_frequency: integer('desired_frequency'), // in ms
	updated_at: timestamp('updated_at')
		.notNull()
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
