import { error, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDbClient } from '$server/db';
import { findOrFail, safeQuery } from '$utils/db';
import { NotFoundError } from '$utils/errors';
import { eq } from 'drizzle-orm';
import { pet_activity, pet_activity_log } from '$server/db/schema';

export const load: PageServerLoad = async ({ depends }) => {
	depends('app:index_page');

	try {
		const db = getDbClient();

		const data = await findOrFail(
			() =>
				db.query.pet.findMany({
					with: {
						activities: {
							where: eq(pet_activity.pack_activity_id, 1),
							with: {
								logs: {
									limit: 10,
									orderBy: (logs, { desc }) => [desc(logs.id)]
								}
							}
						}
					},
					limit: 3
				}),
			'Pet'
		);

		return { pets: data };
	} catch (err) {
		// Handle specific errors
		if (err instanceof NotFoundError) {
			// SvelteKit built-in error handling
			throw error(404, { message: err.message });
		}

		// Other database errors
		console.error('Error loading data:', err);
		throw error(500, { message: 'Failed to load db data' });
	}
};

export const actions: Actions = {
	async auth_blocker() {
		return fail(400, {
			message: 'Only Navarros can update logs.'
		});
	},
	async create_log({ request }) {
		const time_stamp = new Date().toISOString();
		const data = await request.formData();
		const raw_activity_id = data.get('activity_id');
		const raw_pet_id = data.get('pet_id');
		if (raw_activity_id && raw_pet_id) {
			const activity_id = Number.parseInt(raw_activity_id.toString());
			const pet_id = Number.parseInt(raw_pet_id.toString());
			try {
				const db = getDbClient();
				await safeQuery(
					() => db.insert(pet_activity_log).values({ activity_id, time_stamp, pet_id }).returning(),
					'Failed to update pet log'
				);

				return {
					message: 'Pet Log Updated'
				};
			} catch {
				return fail(500, {
					message: 'Update Pet Log Failed'
				});
			}
		}
	}
};
