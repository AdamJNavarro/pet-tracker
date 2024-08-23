<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatDate, get_times_breakdown, type AgoFormat } from '$utils';
	import { onMount } from 'svelte';
	import { form_action } from './form_action';
	import type { PetLog } from '$db/methods';

	export let petLog: PetLog;
	export let thinking = false;
	let ago_format: AgoFormat = 'hrs-ago';

	let formatted_date: string = petLog.completed_at
		? formatDate({ date: petLog.completed_at, format: ago_format })
		: 'N/A';

	const refresh_interval_in_mins = 5;
	onMount(() => {
		const my_interval = setInterval(() => {
			if (petLog.completed_at) {
				formatted_date = formatDate({ date: petLog.completed_at, format: ago_format });
			}
		}, 60000 * refresh_interval_in_mins);

		return () => {
			clearInterval(my_interval);
		};
	});
</script>

<form
	action="?/upd_pet_log"
	method="POST"
	use:enhance={form_action(
		{},
		() => {
			thinking = true;
		},
		() => {
			thinking = false;
		}
	)}
	class="container"
>
	<p>Placeholder</p>
	<!-- <button class="button" disabled={thinking} type="submit">
		<p>{formatted_date}</p>
		<input name="log_id" hidden value={petLog.id} />
	</button> -->
</form>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		border-top: 0.25px;
		border-color: #cbd5e1;
		border-top-style: solid;
	}

	.button {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		justify-content: center;
		border: none;
		font-size: var(--fs-base);
		font-weight: 500;
		background-color: transparent;
	}
</style>
