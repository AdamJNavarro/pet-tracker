import { db } from '../../hooks.server';
import { pack, pack_activity, pet, pet_log } from './schema';

const ace_timestamps = {
	outside: '2024-08-29T14:12:26.171Z',
	bathed: '2024-08-27T17:45:09.131Z',
	walked: '2024-08-29T14:12:29.885Z',
	groomed: '2024-08-28T18:09:53.162Z'
};

const cooper_timestamps = {
	outside: '2024-08-29T14:53:23.617Z',
	bathed: '2024-08-21T19:30:09.131Z',
	walked: '2024-03-21T19:30:09.131Z',
	groomed: '2024-08-21T19:30:09.131Z'
};

async function seed_db() {
	// Create Pack
	const packs = await db.insert(pack).values({ name: 'navarro' }).returning();
	const pack_id = packs[0].id;
	console.log('pack_id', pack_id);

	// Create Pets
	const ace = await db.insert(pet).values({ name: 'ace', pack_id }).returning();
	const ace_id = ace[0].id;
	console.log('ace_id', ace_id);
	const cooper = await db.insert(pet).values({ name: 'cooper', pack_id }).returning();
	const cooper_id = cooper[0].id;
	console.log('cooper_id', cooper_id);

	// Create Pack Activities
	const outside_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'outside' })
		.returning();
	const outside_id = outside_activity[0].id;
	console.log('outside_id', outside_id);

	const fed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'fed', tracking: false })
		.returning();
	const fed_id = fed_activity[0].id;
	console.log('fed_id', fed_id);

	const meds_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'meds', tracking: false })
		.returning();
	const meds_id = meds_activity[0].id;
	console.log('meds_id', meds_id);

	const walked_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'walked' })
		.returning();
	const walked_id = walked_activity[0].id;
	console.log('walked_id', walked_id);

	const bathed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'bathed' })
		.returning();
	const bathed_id = bathed_activity[0].id;
	console.log('bathed_id', bathed_id);

	const groomed_activity = await db
		.insert(pack_activity)
		.values({ pack_id, name: 'groomed' })
		.returning();
	const groomed_id = groomed_activity[0].id;
	console.log('groomed_id', groomed_id);

	const ace_logs = await db.insert(pet_log).values([
		{ pack_activity_id: outside_id, pet_id: ace_id, completed_at: ace_timestamps.outside },
		{ pack_activity_id: fed_id, pet_id: ace_id },
		{ pack_activity_id: meds_id, pet_id: ace_id },
		{ pack_activity_id: walked_id, pet_id: ace_id, completed_at: ace_timestamps.walked },
		{ pack_activity_id: bathed_id, pet_id: ace_id, completed_at: ace_timestamps.bathed },
		{ pack_activity_id: groomed_id, pet_id: ace_id, completed_at: ace_timestamps.groomed }
	]);

	const cooper_logs = await db.insert(pet_log).values([
		{ pack_activity_id: outside_id, pet_id: cooper_id, completed_at: cooper_timestamps.outside },
		{ pack_activity_id: fed_id, pet_id: cooper_id },
		{ pack_activity_id: meds_id, pet_id: cooper_id },
		{ pack_activity_id: walked_id, pet_id: cooper_id, completed_at: cooper_timestamps.walked },
		{ pack_activity_id: bathed_id, pet_id: cooper_id, completed_at: cooper_timestamps.bathed },
		{ pack_activity_id: groomed_id, pet_id: cooper_id, completed_at: cooper_timestamps.groomed }
	]);

	return;
}

seed_db();
