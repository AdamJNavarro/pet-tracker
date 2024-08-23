<script lang="ts">
	import type { FullPackActivity } from '$db/methods';
	import PetLog from './PetLog.svelte';

	export let activity: FullPackActivity;
</script>

<div class="container">
	<div class="name_container">
		{activity.name}
	</div>
	{#each activity.logs as log (log.id)}
		<div class="log_container">
			<PetLog petLog={log} />
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
		text-transform: capitalize;
		border-top: 1px;
		border-color: black;
		border-top-style: solid;
	}

	.name_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25%;
	}

	.log_container {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-left: 1px;
		border-color: black;
		border-left-style: solid;
	}
</style>
