<script lang="ts">
	import type { Pet } from '$db/methods';

	export let name: string;
	export let pets: Pet[];
</script>

<div class="container">
	<div class="name_container">
		{name} Dogs
	</div>
	{#each pets as pet (pet.id)}
		<div class="pet_container">
			{pet.name}
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex: 1;
		flex-direction: row;
		font-size: var(--fs-l);
		font-weight: 500;
		text-transform: capitalize;
		background-color: #0f172a;
		color: white;
	}

	.name_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25%;
	}

	.pet_container {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-left: 1px;
		border-color: #334155;
		border-left-style: solid;
	}
</style>
