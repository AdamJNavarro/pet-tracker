import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { find_pack, create_pet_activity_log, delete_pet_activity_log } from '$db/methods';

export const load: PageServerLoad = async () => {
	const pack = await find_pack();

	return {
		pack
	};
};

export const actions: Actions = {
	async create_log({ request }) {
		const time_stamp = new Date().toISOString();
		const data = await request.formData();
		const raw_activity_id = data.get('activity_id');
		const raw_pet_id = data.get('pet_id');
		if (raw_activity_id && raw_pet_id) {
			const activity_id = parseInt(raw_activity_id.toString());
			const pet_id = parseInt(raw_pet_id.toString());
			try {
				await create_pet_activity_log({ activity_id, pet_id, time_stamp });
				return {
					message: 'Pet Log Updated'
				};
			} catch (error) {
				return fail(400, {
					message: 'Update Pet Log Failed'
				});
			}
		}
	},
	async delete_log({ request }) {
		const time_stamp = new Date().toISOString();
		const data = await request.formData();
		const raw_log_id = data.get('log_id');
		if (raw_log_id) {
			const log_id = parseInt(raw_log_id.toString());
			try {
				await delete_pet_activity_log(log_id);
				return {
					message: 'Pet Log Deleted'
				};
			} catch (error) {
				return fail(400, {
					message: 'Delete Pet Log Failed'
				});
			}
		}
	}
};
