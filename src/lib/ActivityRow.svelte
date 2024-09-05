<script lang="ts">
	import type { FullPackActivity } from '$db/methods';
	import ActivityImage from './ActivityImage.svelte';
	import PetActivity from './PetActivity.svelte';

	export let activity: FullPackActivity;
</script>

<div class="container">
	<div class="name_container">
		<ActivityImage name={activity.name} />
	</div>
	{#each activity.pet_activities as pet_activity (pet_activity.id)}
		<div class="log_container">
			<PetActivity activity={pet_activity} />
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex: 1;
		flex-direction: row;
		font-size: var(--fs-base);
		font-weight: 500;
	}

	.name_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: var(--activity-col-width);
		background-color: var(--activity-bg-color);
		border-top: 0.5px;
		border-color: #334155;
		border-top-style: solid;
	}

	.log_container {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-left: 0.5px;
		border-color: #cbd5e1;
		border-left-style: solid;
		border-top: 0.5px;
		border-color: #cbd5e1;
		border-top-style: solid;
	}
</style>
