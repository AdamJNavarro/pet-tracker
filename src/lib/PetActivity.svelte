<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Activity } from '$lib';
	import { formatDate, type AgoFormat } from '$utils';
	import { onMount } from 'svelte';
	import { form_action } from './form_action';

	export let action_path: string;
	export let activity: Activity;
	export let pet_id: number;
	export let last_activity_time: string | null;
	export let ago_format: AgoFormat;
	export let thinking = false;

	let formatted_date: string = last_activity_time
		? formatDate({ date: last_activity_time, format: ago_format })
		: 'N/A';

	const refresh_interval_in_mins = 5;

	onMount(() => {
		const my_interval = setInterval(() => {
			if (last_activity_time) {
				formatted_date = formatDate({ date: last_activity_time, format: ago_format });
			}
		}, 60000 * refresh_interval_in_mins);

		return () => {
			clearInterval(my_interval);
		};
	});
</script>

<form
	action={action_path}
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
	<button class="button" disabled={thinking} type="submit">
		<p>{formatted_date}</p>

		<input name="pet_id" hidden value={pet_id} />
		<input name="activity" hidden value={activity} />
	</button>
</form>

<style>
	.container {
		display: flex;
		flex-direction: column;
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
