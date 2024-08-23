import { eq, sql } from 'drizzle-orm';
import { db } from '../../hooks.server';
import { pack, pack_activity, pet, pet_log } from './schema';

export type Pack = typeof pack.$inferSelect;
export type Pet = typeof pet.$inferSelect;
export type PackActivity = typeof pack_activity.$inferSelect;
export type PetLog = typeof pet_log.$inferSelect;

export interface FullPackActivity extends PackActivity {
	logs: PetLog[];
}

export interface FullPack extends Pack {
	activities: FullPackActivity[];
	pets: Pet[];
}

export async function find_pack(): Promise<FullPack> {
	const data = await db.query.pack.findFirst({
		where: eq(pack.id, 1),
		with: {
			activities: {
				with: {
					logs: {
						orderBy: (logs, { asc }) => [asc(logs.id)]
					}
				}
			},
			pets: {
				orderBy: (pets, { asc }) => [asc(pets.id)]
			}
		}
	});
	if (!data) throw new Error('Pack not found');
	return data;
}

interface UpdatePetLogArgs {
	id: number;
	time_stamp: string;
}

export async function update_pet_log({ id, time_stamp }: UpdatePetLogArgs) {
	try {
		await db
			.update(pet_log)
			.set({
				fallback_timestamp: sql`${pet_log.completed_at}`,
				completed_at: time_stamp
			})
			.where(eq(pet_log.id, id));
	} catch (e) {
		console.log('UPL Err', e);
		throw new Error('Update Pet Log Failed');
	}
}
