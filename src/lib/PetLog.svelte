<script lang="ts">
	import { formatDate, type AgoFormat } from '$utils';
	import { onMount } from 'svelte';
	import type { PetLog } from '$db/methods';
	import FormButton from './FormButton.svelte';
	import SettingsIcon from './icons/SettingsIcon.svelte';
	import UndoIcon from './icons/UndoIcon.svelte';

	export let petLog: PetLog;
	let ago_format: AgoFormat = 'hrs-ago';

	$: formatted_date = petLog.completed_at
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

<div class="container">
	<div class="main_container">
		<FormButton text={formatted_date} thinking_text="Updating..." action_path="?/upd_pet_log">
			<input name="log_id" hidden value={petLog.id} />
		</FormButton>
	</div>
	<div class="sidebar">
		<div class="settings_button">
			<SettingsIcon />
		</div>
		<div class="undo_button">
			<UndoIcon />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		/* flex-direction: column; */
		/* align-items: center;
		justify-content: center; */
		flex: 1;
		width: 100%;
		border-top: 0.25px;
		border-color: #cbd5e1;
		border-top-style: solid;
		/* background-color: darkblue; */
	}

	.main_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		margin-inline-start: 50px;
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
</style>
