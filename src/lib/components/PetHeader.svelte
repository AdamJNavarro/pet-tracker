<script lang="ts">
	import type { Pet } from '$server/db/schema';

	interface Props {
		pet: Pet;
	}

	let { pet }: Props = $props();
</script>

<div class="container">
	{#if pet.name === 'ace'}
		<enhanced:img src="/static/ace.jpg" alt="Ace." class="pet-avatar" />
	{:else}
		<enhanced:img src="/static/cooper.jpg" alt="Cooper." class="pet-avatar" />
	{/if}
	{pet.name}
</div>

<style lang="postcss">
	.container {
		background-color: var(--color-primary);
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: var(--fs-m);
		text-transform: capitalize;
		color: var(--color-bg);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-elevation-medium);
	}

	.pet-avatar {
		height: 56px;
		width: 56px;
		margin-right: var(--spacing);
		border-radius: 9999px;
		margin-top: 8px;
	}
</style>
