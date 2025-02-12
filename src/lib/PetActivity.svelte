<script lang="ts">
	/* svelte-disable  svelte/valid-compile */

	import { run } from 'svelte/legacy';

	import { PUBLIC_AUTH_CODE } from '$env/static/public';
	import type { FullPetActivity } from '$db/methods';
	import { get_log_breakdown, type LogBreakdown } from '$utils';
	import { onMount } from 'svelte';
	import { queryParameters } from 'sveltekit-search-params';
	import LogText from './LogText.svelte';
	import FormWithLoading from '$lib/FormWithLoading.svelte';

	const store = queryParameters({
		code: true
	});

	interface Props {
		activity: FullPetActivity;
	}

	let { activity }: Props = $props();

	let breakdown: LogBreakdown | null = $state(null);
	// let should_prompt = $state(false);

	let { pet_id, daily_max, desired_frequency, logs } = $derived(activity);

	let latest_log = $derived(logs.length > 0 ? logs[0] : null);

	run(() => {
		if (latest_log) {
			breakdown = get_log_breakdown({ time_stamp: latest_log.time_stamp, desired_frequency });
		}
	});

	run(() => {
		if (daily_max && logs.length >= daily_max) {
			const current_date = new Date().toISOString();

			const day_substr = current_date.substring(0, current_date.indexOf('T'));

			const times_completed_today = logs.filter((log) =>
				log.time_stamp.startsWith(day_substr)
			).length;

			if (times_completed_today >= daily_max) {
				// should_prompt = true;
			}
		}
	});

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
	<FormWithLoading
		method="POST"
		action={$store.code === PUBLIC_AUTH_CODE ? '?/create_log' : '?/auth_blocker'}
		class="main_container"
	>
		{#snippet children({ loading })}
			<fieldset disabled={loading}>
				<button class="timer_button" type="submit">
					{#if breakdown}
						<LogText main_text={loading ? '< 1 min' : breakdown.ago_str} sub_text="ago" />
					{:else}
						<LogText
							main_text={loading ? '< 1 min' : 'Update'}
							sub_text={loading ? 'ago' : 'log'}
						/>
					{/if}
				</button>

				<input name="activity_id" hidden value={activity.id} />
				<input name="pet_id" hidden value={pet_id} />
			</fieldset>
		{/snippet}
	</FormWithLoading>
</div>

<style lang="postcss">
	fieldset {
		border: none;
		margin: 0;
		padding: 0;
	}
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
