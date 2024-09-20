<script>
	import LogText from '$lib/LogText.svelte';
	import PetActivity from '$lib/PetActivity.svelte';
	import RowHeader from '$lib/RowHeader.svelte';

	export let data;
	$: ({ pack } = data);
</script>

<div class="layout">
	<div class="flex-row">
		<RowHeader label="name" />
		{#each pack.pets as pet (pet.id)}
			<div class="pet_container">
				{pet.name}
			</div>
		{/each}
	</div>
	{#each pack.activities as activity (activity.id)}
		<div class="flex-row">
			<RowHeader label={activity.name} />
			{#each activity.pet_activities as pet_activity (pet_activity.id)}
				<div class="log_container">
					{#if pet_activity.tracking}
						<PetActivity activity={pet_activity} />
					{:else}
						<div class="tracking_off">
							<LogText main_text="Tracking" sub_text="off" />
						</div>
					{/if}
				</div>
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

		> div:not(:last-child) {
			border-bottom: var(--border-size);
			border-bottom-color: var(--color-line);
			border-bottom-style: solid;
		}
	}

	.flex-row {
		display: flex;
		flex: 1;
		flex-direction: row;

		> div {
			border-left: var(--border-size);
			border-left-color: var(--color-line);
			border-left-style: solid;
		}
	}

	.pet_container {
		background-color: var(--color-bg);
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: var(--fs-m);
		font-weight: 500;
		text-transform: capitalize;
		color: var(--color-fg);
	}

	.log_container {
		background-color: var(--color-bg);
		color: var(--color-fg);
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: var(--fs-base);
	}

	.tracking_off {
		color: var(--color-disabled);
	}
</style>
