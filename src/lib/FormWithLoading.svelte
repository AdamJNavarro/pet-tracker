<script lang="ts">
	/* eslint-disable  @typescript-eslint/no-explicit-any */

	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { loading } from '$state/loading';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';

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
					alert(result.data?.message);
				} else if (result.type === 'error') {
					alert(result.error.message);
				} else {
					alert(`Something went wrong. Check the console`);
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
