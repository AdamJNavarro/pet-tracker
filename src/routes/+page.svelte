<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PetActivity from '$lib/components/PetActivity.svelte';
	import PetHeader from '$lib/components/PetHeader.svelte';
	import RowHeader from '$lib/components/RowHeader.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let { pack } = $derived(data);

	onMount(() => {
		const rerun_load_fx = setInterval(
			() => {
				invalidate('app:index_page');
			},
			Math.floor(60000 * 20)
		); // time in mins

		return () => {
			clearInterval(rerun_load_fx);
		};
	});
</script>

<div class="layout">
	{#if pack}
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
						<div class="log-surface tracking-off"></div>
					{/if}
				{/each}
			</div>
		{/each}
	{/if}
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

	.tracking-off {
		background-color: var(--color-surface-placeholder);
		box-shadow: none;
	}
</style>
