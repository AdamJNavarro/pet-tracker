<script lang="ts">
	/* eslint-disable  @typescript-eslint/no-explicit-any */

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { loading } from '$state/loading';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-hot-french-toast';

	let form_loading = $state(false);
	interface Props {
		global?: boolean;
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any;
	}

	let { global, children, ...rest }: Props = $props();

	export const form_action = (callback?: (data: any | unknown) => any): SubmitFunction => {
		return function form_enhance() {
			if (global) {
				loading.setLoading(true);
			}
			form_loading = true;
			return async ({ result }: { result: ActionResult<any, any> }) => {
				if (result.type === 'success') {
					// DO NOTHING
				} else if (result.type === 'failure') {
					toast.error(`${result.data?.message}`, { duration: 4000 });
				} else if (result.type === 'error') {
					toast.error(`${result.error.message}`, { duration: 4000 });
				} else {
					toast.error(`Something went wrong. Check the console`);
				}
				await invalidateAll();
				await applyAction(result);
				form_loading = false;
				if (global) {
					loading.setLoading(false);
				}
				if (callback && 'data' in result && result?.data) callback(result.data);
			};
		};
	};
</script>

<form {...rest} use:enhance={form_action()}>
	{@render children?.({ loading: form_loading })}
</form>
