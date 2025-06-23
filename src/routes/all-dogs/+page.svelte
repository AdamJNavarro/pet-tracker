<script lang="ts">
	import PetTile from '$lib/components/PetTile.svelte';

	let { data } = $props();
	let { pets } = $derived(data);
</script>

<div class="layout">
	<div class="pets-grid">
		{#each pets as pet (pet.id)}
			<PetTile {pet} />
		{/each}
	</div>
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
		padding-top: calc(var(--spacing) * 1.5);
		padding-bottom: calc(var(--spacing) * 1.5);
		gap: calc(var(--spacing) * 1.5);
	}

	.pets-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: calc(var(--spacing) * 1.5);
		padding-inline: calc(var(--spacing) * 1.5);
		flex: 1;
	}

	:global(.pets-grid > *:nth-child(3)) {
		grid-column: 1 / -1;
		justify-self: center;
		width: calc(50% - calc(var(--spacing) * 1.5));
	}
</style>
