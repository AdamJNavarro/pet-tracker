<script lang="ts">
	import PetActivity from '$lib/PetActivity.svelte';
	import PetHeader from '$lib/PetHeader.svelte';
	import RowHeader from '$lib/RowHeader.svelte';

	let { data } = $props();
	let { pack } = $derived(data);
</script>

<div class="layout">
	<div class="flex-row">
		<div class="row-header-placeholder"></div>
		{#each pack.pets as pet (pet.id)}
			<PetHeader {pet} />
		{/each}
	</div>
	{#each pack.activities as activity (activity.id)}
		<div class="flex-row">
			<RowHeader icon_name={activity.icon_name} label={activity.name} />
			{#each activity.pet_activities as pet_activity (pet_activity.id)}
				{#if pet_activity.tracking}
					<PetActivity activity={pet_activity} />
				{:else}
					<div class="log_surface tracking_off"></div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.layout {
		flex-direction: column;
		display: flex;
		min-height: 100dvh;
		max-height: 100dvh;
		min-width: 100dvw;
		max-width: 100dvw;
		background-color: var(--color-bg);
		gap: var(--spacing);
		> div:first-child {
			padding-top: var(--spacing);
		}

		> div:last-child {
			padding-bottom: var(--spacing);
		}
	}

	.flex-row {
		display: flex;
		flex: 1;
		flex-direction: row;
		padding-inline: var(--spacing);
		gap: var(--spacing);
	}

	.row-header-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 200px;
	}
	.tracking_off {
		background-color: var(--color-surface-placeholder);
		box-shadow: none;
	}
</style>
