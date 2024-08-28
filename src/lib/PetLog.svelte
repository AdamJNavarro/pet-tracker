<script lang="ts">
	import { get_log_breakdown, type LogBreakdown } from '$utils';
	import { onMount } from 'svelte';
	import type { PetLog } from '$db/methods';
	import SettingsIcon from './icons/SettingsIcon.svelte';
	import UndoIcon from './icons/UndoIcon.svelte';
	import { form_action } from './form_action';
	import { enhance } from '$app/forms';

	let breakdown: LogBreakdown | null = null;
	let undo_available = false;
	export let thinking = false;
	export let petLog: PetLog;

	$: ({ completed_at, fallback_timestamp, desired_frequency, updated_at } = petLog);

	$: if (completed_at) {
		breakdown = get_log_breakdown({ completed_at, desired_frequency, updated_at });
		if (fallback_timestamp) {
			if (breakdown.within_undo_period && completed_at !== fallback_timestamp) {
				undo_available = true;
			}
		}
	}

	onMount(() => {
		const my_interval = setInterval(
			() => {
				if (completed_at) {
					breakdown = get_log_breakdown({ completed_at, desired_frequency, updated_at });
				}
			},
			Math.floor(60000 * 5)
		); // time in mins

		return () => {
			clearInterval(my_interval);
		};
	});
</script>

<div class="container" class:needs_completing={breakdown && breakdown.needs_completing}>
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
		class="main_container"
	>
		<button class="timer_button" disabled={thinking} type="submit"
			>{breakdown ? breakdown.ago_str : 'Update Log'}</button
		>
		<div class="ago_container">{breakdown ? 'ago' : ''}</div>
		<input name="log_id" hidden value={petLog.id} />
	</form>

	<div class="sidebar">
		<div class="settings_button">
			<SettingsIcon />
		</div>
		<div class="undo_button" class:undo_available>
			<UndoIcon />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex: 1;
		width: 100%;
		border-top: 0.25px;
		border-color: #cbd5e1;
		border-top-style: solid;
	}

	.container.needs_completing {
		background-color: var(--danger-color);
	}

	.main_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin-inline-start: 50px;
	}

	.timer_button {
		background-color: transparent;
		border: none;
		color: #020617;
		font-size: var(--fs-base);
		font-weight: 500;
	}

	.ago_container {
		margin-top: 4px;
		color: #334155;
		font-size: var(--fs-xs);
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 50px;
		margin-top: 8px;
		margin-bottom: 8px;
	}

	.settings_button {
		visibility: hidden;
	}

	.undo_button {
		visibility: hidden;
	}

	.undo_button.undo_available {
		visibility: hidden;
	}
</style>
