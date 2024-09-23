import { applyAction } from '$app/forms';
import { invalidateAll } from '$app/navigation';
import { loading } from '$state/loading';
import type { ActionResult } from '@sveltejs/kit';
import toast from 'svelte-french-toast';

type FormActionMessage = {
	message?: string;
};

export const form_action = (
	opts?: FormActionMessage,
	pre?: (data?: any | unknown) => any,
	callback?: (data?: any | unknown) => any
) => {
	return function form_enhance() {
		if (pre) pre();
		loading.setLoading(true);
		return async ({ result }: { result: ActionResult<{ message: string }> }) => {
			console.log(result);
			if (result.type === 'success') {
				console.log(result);
			} else if (result.type === 'failure') {
				console.log(result);
				toast.error(`${result.data?.message}`, { duration: 4000 });
			} else {
				console.log(result);
			}
			await invalidateAll();
			await applyAction(result);
			loading.setLoading(false);
			if (callback && 'data' in result && result?.data) callback(result.data);
		};
	};
};
