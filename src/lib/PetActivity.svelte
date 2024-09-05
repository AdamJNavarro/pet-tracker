<script lang="ts">
	// import { get_log_breakdown, type LogBreakdown } from '$utils';
	import type { FullPetActivity } from '$db/methods';
	import SettingsIcon from './icons/SettingsIcon.svelte';
	import { form_action } from './form_action';
	import { enhance } from '$app/forms';

	export let thinking = false;
	export let activity: FullPetActivity;
	let { pet_id, tracking, daily_max, desired_frequency, logs } = activity;
	let newest_log = logs.length > 0 ? logs[0] : null;
</script>

<div class="container">
	<form
		action="?/create_log"
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
			>{thinking ? 'thinking' : 'Create Log'}</button
		>

		<input name="activity_id" hidden value={activity.id} />
		<input name="pet_id" hidden value={pet_id} />
	</form>

	<div class="sidebar">
		<div class="settings_button">
			<SettingsIcon />
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
</style>
