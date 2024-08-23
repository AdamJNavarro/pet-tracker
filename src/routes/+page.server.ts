import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { find_pack, update_pet_log } from '$db/methods';

export const load: PageServerLoad = async () => {
	const pack = await find_pack();

	return {
		pack
	};
};

export const actions: Actions = {
	async upd_pet_log({ request }) {
		const time_stamp = new Date().toISOString();
		const data = await request.formData();
		const raw_id = data.get('log_id');
		if (raw_id) {
			const log_id = parseInt(raw_id.toString());
			try {
				await update_pet_log({ id: log_id, time_stamp });
				return {
					message: 'Pet Log Updated'
				};
			} catch (error) {
				return fail(400, {
					message: 'Update Pet Log Failed'
				});
			}
		}
	}
};
