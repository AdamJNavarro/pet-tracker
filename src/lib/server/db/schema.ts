import { relations } from 'drizzle-orm';
import {
	serial,
	text,
	pgTable,
	pgEnum,
	integer,
	timestamp,
	boolean,
	index
} from 'drizzle-orm/pg-core';

export const icon_name_enum = pgEnum('icon_name', [
	'bubbles',
	'dog_bowl',
	'dog_head',
	'grass',
	'meds',
	'paw_prints',
	'scissors',
	'toothbrush'
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
	name: text('name').notNull(),
	icon_name: icon_name_enum('icon_name'),
	ranking: serial('ranking').notNull(),
	tracking: boolean('tracking').notNull().default(true)
	// is_frequent: boolean('is_frequent').notNull().default(false) -- could be used to sort
});

export const pack_activity_relations = relations(pack_activity, ({ one, many }) => ({
	pack: one(pack, {
		fields: [pack_activity.pack_id],
		references: [pack.id]
	}),
	pet_activities: many(pet_activity)
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
	activities: many(pet_activity),
	logs: many(pet_activity_log)
}));

export const pet_activity = pgTable('pet_activities', {
	id: serial('id').primaryKey(),
	pack_activity_id: integer('pack_activity_id')
		.notNull()
		.references(() => pack_activity.id),
	pet_id: integer('pet_id')
		.notNull()
		.references(() => pet.id),
	tracking: boolean('tracking').notNull().default(true),
	desired_frequency: integer('desired_frequency'), // in ms
	daily_max: integer('daily_max')
});

export const pet_activity_relations = relations(pet_activity, ({ one, many }) => ({
	pack_activity: one(pack_activity, {
		fields: [pet_activity.pack_activity_id],
		references: [pack_activity.id]
	}),
	pet: one(pet, {
		fields: [pet_activity.pet_id],
		references: [pet.id]
	}),
	logs: many(pet_activity_log)
}));

export const pet_activity_log = pgTable(
	'pet_activity_logs',
	{
		id: serial('id').primaryKey(),
		activity_id: integer('activity_id')
			.notNull()
			.references(() => pet_activity.id),
		pet_id: integer('pet_id')
			.notNull()
			.references(() => pet.id),
		time_stamp: text('time_stamp').notNull(),
		created_at: timestamp('created_at').defaultNow()
	},
	(table) => {
		return {
			log_idx: index('pet_activity_log_idx').on(table.id)
		};
	}
);

export const pet_activity_log_relations = relations(pet_activity_log, ({ one }) => ({
	activity: one(pet_activity, {
		fields: [pet_activity_log.activity_id],
		references: [pet_activity.id]
	}),
	pet: one(pet, {
		fields: [pet_activity_log.pet_id],
		references: [pet.id]
	})
}));

export type Pack = typeof pack.$inferSelect;
export type Pet = typeof pet.$inferSelect;
export type PackActivity = typeof pack_activity.$inferSelect;
export type PetActivity = typeof pet_activity.$inferSelect;
export type PetActivityLog = typeof pet_activity_log.$inferSelect;

export interface FullPet extends Pet {
	activities: FullPetActivity[];
}

export interface FullPetActivity extends PetActivity {
	logs: PetActivityLog[];
}
export interface FullPackActivity extends PackActivity {
	pet_activities: FullPetActivity[];
}

export interface FullPack extends Pack {
	activities: FullPackActivity[];
	pets: Pet[];
}
