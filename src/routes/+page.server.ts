import {
	find_pets,
	update_bathed_at,
	update_fed_at,
	update_groomed_at,
	update_outside_at,
	update_walked_at
} from '$db/pets';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const pets = await find_pets();

	return {
		pets
	};
};

export const actions: Actions = {
	async update_single_pet({ request }) {
		const time_stamp = new Date().toISOString();
		const data = await request.formData();
		const raw_id = data.get('pet_id');
		const raw_activity = data.get('activity');

		if (raw_id && raw_activity) {
			const pet_id = parseInt(raw_id.toString());
			const ids = [pet_id];
			const activity = raw_activity.toString();
			if (activity === 'bathed') {
				try {
					await update_bathed_at({ ids, time_stamp });
					return {
						message: 'bathed_at Updated'
					};
				} catch (error) {
					return fail(400, {
						message: 'Update bathed_at Failed'
					});
				}
			}

			if (activity === 'fed') {
				try {
					await update_fed_at({ ids, time_stamp });
					return {
						message: 'fed_at Updated'
					};
				} catch (error) {
					return fail(400, {
						message: 'Update fed_at Failed'
					});
				}
			}

			if (activity === 'groomed') {
				try {
					await update_groomed_at({ ids, time_stamp });
					return {
						message: 'groomed_at Updated'
					};
				} catch (error) {
					return fail(400, {
						message: 'Update groomed_at Failed'
					});
				}
			}

			if (activity === 'outside') {
				try {
					await update_outside_at({ ids, time_stamp });
					return {
						message: 'Outside At Updated'
					};
				} catch (error) {
					return fail(400, {
						message: 'Update outside_at Failed'
					});
				}
			}

			if (activity === 'walked') {
				try {
					await update_walked_at({ ids, time_stamp });
					return {
						message: 'walked_at Updated'
					};
				} catch (error) {
					return fail(400, {
						message: 'Update walked_at Failed'
					});
				}
			}
		}
	}
};
