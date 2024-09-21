import { eq, sql } from 'drizzle-orm';
import { db } from '../../hooks.server';
import { pack, pack_activity, pet, pet_activity, pet_activity_log } from './schema';

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

interface FindPetActivitiesArgs {
	pet_id: number;
}

export async function find_pet_activities({ pet_id }: FindPetActivitiesArgs): Promise<FullPet> {
	const data = await db.query.pet.findFirst({
		where: eq(pet.id, pet_id),
		with: {
			activities: {
				orderBy: (activities, { asc }) => [asc(activities.id)],
				with: {
					logs: {
						limit: 10,
						orderBy: (logs, { desc }) => [desc(logs.id)]
					}
				}
			}
		}
	});
	if (!data) throw new Error('Pet Activities not found');
	return data;
}

export async function find_pack(): Promise<FullPack> {
	const data = await db.query.pack.findFirst({
		where: eq(pack.id, 1),
		with: {
			activities: {
				with: {
					pet_activities: {
						orderBy: (pet_activities, { asc }) => [asc(pet_activities.id)],
						with: {
							logs: {
								limit: 10,
								orderBy: (logs, { desc }) => [desc(logs.id)]
							}
						}
					}
				},
				where: eq(pack_activity.tracking, true),
				orderBy: (activities, { asc }) => [asc(activities.ranking)]
			},
			pets: {
				orderBy: (pets, { asc }) => [asc(pets.id)]
			}
		}
	});
	if (!data) throw new Error('Pack not found');
	return data;
}

interface CreatePetActivityLog {
	activity_id: number;
	pet_id: number;
	time_stamp: string;
}

export async function create_pet_activity_log({
	activity_id,
	pet_id,
	time_stamp
}: CreatePetActivityLog) {
	try {
		await db.insert(pet_activity_log).values({ activity_id, time_stamp, pet_id }).returning();
	} catch (e) {
		console.log(' Err', e);
		throw new Error('Create Pet Log Failed');
	}
}

export async function delete_pet_activity_log(log_id: number) {
	try {
		await db.delete(pet_activity_log).where(eq(pet_activity_log.id, log_id)).returning();
	} catch (e) {
		console.log(' Err', e);
		throw new Error('Delete Pet Log Failed');
	}
}
