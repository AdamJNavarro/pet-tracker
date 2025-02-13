<script lang="ts">
	import { PUBLIC_AUTH_CODE } from '$env/static/public';
	import type { FullPetActivity } from '$db/methods';
	import { get_log_breakdown, type LogBreakdown } from '$utils';
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

	let { pet_id, desired_frequency, logs } = $derived(activity);

	let latest_log = $derived(logs.length > 0 ? logs[0] : null);

	let breakdown: LogBreakdown | null = $derived.by(() => {
		if (latest_log) {
			return get_log_breakdown({ time_stamp: latest_log.time_stamp, desired_frequency });
		}

		return null;
	});
</script>

<div
	class="log-surface"
	class:needs-completing={breakdown && breakdown.needs_completing}
	class:past-due={breakdown && breakdown.past_due}
>
	<FormWithLoading
		method="POST"
		action={$store.code === PUBLIC_AUTH_CODE ? '?/create_log' : '?/auth_blocker'}
		class="main-container"
	>
		{#snippet children({ loading })}
			<fieldset disabled={loading}>
				<button class="timer-button" type="submit">
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

	.needs-completing {
		background-color: var(--color-warning-subtle);
	}

	.past-due {
		background-color: var(--color-danger-subtle);
	}

	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.timer-button {
		background-color: transparent;
		border: none;
	}
</style>
