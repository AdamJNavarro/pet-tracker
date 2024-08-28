import { db } from '../../hooks.server';
import { pack, pack_activity, pet, pet_log } from './schema';

async function seed_db() {
	// Create Pack
	const packs = await db.insert(pack).values({ name: 'navarro' }).returning();
	const pack_id = packs[0].id;

	// Create Pets
	const ace = await db.insert(pet).values({ name: 'ace', pack_id }).returning();
	const ace_id = ace[0].id;
	const cooper = await db.insert(pet).values({ name: 'cooper', pack_id }).returning();
	const cooper_id = cooper[0].id;

	// Create Pack Activities
	const outside_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'outside' })
		.returning();
	const outside_id = outside_activity[0].id;
	const walked_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'walked' })
		.returning();
	const walked_id = walked_activity[0].id;

	const bathed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'bathed' })
		.returning();
	const bathed_id = bathed_activity[0].id;

	const groomed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'groomed' })
		.returning();
	const groomed_id = groomed_activity[0].id;

	// const fed_activity = await db.insert(pack_activity).values({ pack_id, name: 'fed' }).returning();
	// const meds_activity = await db.insert(pack_activity).values({pack_id, name: "meds"}).returning();

	const ace_logs = await db.insert(pet_log).values([
		{ pack_activity_id: outside_id, pet_id: ace_id },
		{ pack_activity_id: walked_id, pet_id: ace_id },
		{ pack_activity_id: bathed_id, pet_id: ace_id },
		{ pack_activity_id: groomed_id, pet_id: ace_id }
	]);

	const cooper_logs = await db.insert(pet_log).values([
		{ pack_activity_id: outside_id, pet_id: cooper_id },
		{ pack_activity_id: walked_id, pet_id: cooper_id },
		{ pack_activity_id: bathed_id, pet_id: cooper_id },
		{ pack_activity_id: groomed_id, pet_id: cooper_id }
	]);
}
