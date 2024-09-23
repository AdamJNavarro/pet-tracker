<script lang="ts">
	import type { FullPetActivity } from '$db/methods';
	import { form_action } from './form_action';
	import { enhance } from '$app/forms';
	import { get_log_breakdown, type LogBreakdown } from '$utils';
	import { onMount } from 'svelte';
	import LogText from './LogText.svelte';

	export let thinking = false;
	export let activity: FullPetActivity;

	let breakdown: LogBreakdown | null = null;
	let should_prompt = false;

	$: ({ pet_id, daily_max, desired_frequency, logs } = activity);

	$: latest_log = logs.length > 0 ? logs[0] : null;

	$: if (latest_log) {
		breakdown = get_log_breakdown({ time_stamp: latest_log.time_stamp, desired_frequency });
	}

	$: if (daily_max && logs.length >= daily_max) {
		let current_date = new Date().toISOString();

		let day_substr = current_date.substring(0, current_date.indexOf('T'));

		let times_completed_today = logs.filter((log) => log.time_stamp.startsWith(day_substr)).length;

		if (times_completed_today >= daily_max) {
			should_prompt = true;
		}
	}

	onMount(() => {
		const rerun_breakdown_interval = setInterval(
			() => {
				if (latest_log) {
					breakdown = get_log_breakdown({ time_stamp: latest_log.time_stamp, desired_frequency });
				}
			},
			Math.floor(60000 * 5)
		); // time in mins

		return () => {
			clearInterval(rerun_breakdown_interval);
		};
	});
</script>

<div
	class="log_surface"
	class:needs_completing={breakdown && breakdown.needs_completing}
	class:past_due={breakdown && breakdown.past_due}
>
	<form
		action={'?/create_log'}
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
		class="main_container"
	>
		<button class="timer_button" disabled={thinking} type="submit">
			{#if breakdown}
				<LogText main_text={thinking ? '< 1 min' : breakdown.ago_str} sub_text="ago" />
			{:else}
				<LogText main_text={thinking ? '< 1 min' : 'Update'} sub_text={thinking ? 'ago' : 'log'} />
			{/if}
		</button>

		<input name="activity_id" hidden value={activity.id} />
		<input name="pet_id" hidden value={pet_id} />
	</form>
</div>

<style>
	.needs_completing {
		background-color: var(--color-warning-subtle);
	}

	.past_due {
		background-color: var(--color-danger-subtle);
	}

	.main_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.timer_button {
		background-color: transparent;
		border: none;
	}
</style>
