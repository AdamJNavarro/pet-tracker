import { eq } from 'drizzle-orm';
import { db } from '../../hooks.server';
import { pets } from './schema';

export type Pet = typeof pets.$inferSelect;
export type UpdatePet = typeof pets.$inferInsert;

export async function find_pets(): Promise<Pet[]> {
	const pets = await db.query.pets.findMany({
		orderBy: (pets, { asc }) => [asc(pets.id)]
	});
	// console.log('pets', pets);
	return pets;
}

type UpdateTimeArgs = {
	ids: number[];
	time_stamp: string;
};

export async function update_bathed_at({ ids, time_stamp }: UpdateTimeArgs) {
	for (const pet_id of ids) {
		await db
			.update(pets)
			.set({
				bathed_at: time_stamp
			})
			.where(eq(pets.id, pet_id));
	}
}

export async function update_fed_at({ ids, time_stamp }: UpdateTimeArgs) {
	for (const pet_id of ids) {
		await db
			.update(pets)
			.set({
				fed_at: time_stamp
			})
			.where(eq(pets.id, pet_id));
	}
}

export async function update_groomed_at({ ids, time_stamp }: UpdateTimeArgs) {
	for (const pet_id of ids) {
		await db
			.update(pets)
			.set({
				groomed_at: time_stamp,
				bathed_at: time_stamp
			})
			.where(eq(pets.id, pet_id));
	}
}

export async function update_outside_at({ ids, time_stamp }: UpdateTimeArgs) {
	for (const pet_id of ids) {
		await db
			.update(pets)
			.set({
				outside_at: time_stamp
			})
			.where(eq(pets.id, pet_id));
	}
}

export async function update_walked_at({ ids, time_stamp }: UpdateTimeArgs) {
	for (const pet_id of ids) {
		await db
			.update(pets)
			.set({
				walked_at: time_stamp
			})
			.where(eq(pets.id, pet_id));
	}
}
