import { db } from '../../hooks.server';
import { pack, pack_activity, pet, pet_activity } from './schema';

const ace_timestamps = {
	outside: '2024-09-21T15:34:49.298Z',
	meds: '2024-09-21T13:12:11.765Z',
	bathed: '2024-09-18T16:45:06.663Z',
	walked: '2024-09-18T13:22:42.816Z',
	groomed: '2024-08-28T18:09:53.162Z'
};

const cooper_timestamps = {
	outside: '2024-09-21T15:34:48.285Z',
	meds: '2024-09-21T09:22:17.190Z',
	bathed: '2024-09-18T16:45:07.375Z',
	groomed: '2024-08-21T19:30:09.131Z'
};

async function seed_db() {
	// Create Pack
	const packs = await db.insert(pack).values({ name: 'navarros' }).returning();
	const pack_id = packs[0].id;

	// Create Pets
	const ace = await db.insert(pet).values({ name: 'ace', pack_id }).returning();
	const ace_id = ace[0].id;
	const cooper = await db.insert(pet).values({ name: 'cooper', pack_id }).returning();
	const cooper_id = cooper[0].id;

	// Create Pack Activities
	const outside_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'outside', icon_name: 'grass' })
		.returning();
	const outside_id = outside_activity[0].id;

	const fed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'fed', icon_name: 'dog_bowl', tracking: false })
		.returning();
	const fed_id = fed_activity[0].id;

	const meds_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'meds', icon_name: 'meds' })
		.returning();
	const meds_id = meds_activity[0].id;

	const walked_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'walked', icon_name: 'paw_prints' })
		.returning();
	const walked_id = walked_activity[0].id;

	const bathed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'bathed', icon_name: 'bubbles' })
		.returning();
	const bathed_id = bathed_activity[0].id;

	const groomed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'groomed', icon_name: 'scissors' })
		.returning();
	const groomed_id = groomed_activity[0].id;

	const brush_teeth_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'brushed teeth', icon_name: 'toothbrush', tracking: false })
		.returning();
	const brush_teeth_id = brush_teeth_activity[0].id;

	const ace_logs = await db
		.insert(pet_activity)
		.values([
			{ pack_activity_id: outside_id, pet_id: ace_id },
			{ pack_activity_id: fed_id, pet_id: ace_id },
			{ pack_activity_id: meds_id, pet_id: ace_id },
			{ pack_activity_id: walked_id, pet_id: ace_id },
			{ pack_activity_id: bathed_id, pet_id: ace_id },
			{ pack_activity_id: groomed_id, pet_id: ace_id },
			{ pack_activity_id: brush_teeth_id, pet_id: ace_id }
		])
		.returning();

	const cooper_logs = await db.insert(pet_activity).values([
		{ pack_activity_id: outside_id, pet_id: cooper_id },
		{ pack_activity_id: fed_id, pet_id: cooper_id },
		{ pack_activity_id: meds_id, pet_id: cooper_id, daily_max: 1 },
		{ pack_activity_id: walked_id, pet_id: cooper_id, tracking: false },
		{ pack_activity_id: bathed_id, pet_id: cooper_id },
		{ pack_activity_id: groomed_id, pet_id: cooper_id },
		{ pack_activity_id: brush_teeth_id, pet_id: cooper_id, tracking: false }
	]);

	return;
}

await seed_db();

process.exit(0);
