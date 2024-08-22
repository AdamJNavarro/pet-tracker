<script>
	import PetColumn from '$lib/PetColumn.svelte';
	import TrackerColumn from '$lib/TrackerColumn.svelte';

	export let data;
	// $: ({ pets } = data);
	// console.log('data', data);
</script>

<div class="layout">
	<div class="tracker-container"><TrackerColumn /></div>
	{#each data.pets as pet (pet.id)}
		<div class="pet-container">
			<PetColumn {pet} />
		</div>
	{/each}
</div>

<style>
	.layout {
		flex-direction: row;
		display: flex;
		min-height: 100vh;
		max-height: 100vh;
	}

	.tracker-container {
		display: flex;
		flex: 0.3;
		flex-direction: column;
		background-color: #0f172a;
	}

	.pet-container {
		display: flex;
		flex: 0.35;
		flex-direction: column;
		border-left-width: 0.5px;
		border-left-style: solid;
		border-color: #cbd5e1;
		background-color: #fff;
	}
</style>
