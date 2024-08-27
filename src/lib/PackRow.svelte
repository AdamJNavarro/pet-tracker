<script lang="ts">
	import PackImage from '$assets/pet-name-card.png';
	import type { Pet } from '$db/methods';

	export let name: string;
	export let pets: Pet[];
</script>

<div class="container">
	<div class="name_container">
		<img width="60" height="60" src={PackImage} alt={`${name} pack`} />
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
	}

	.name_container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: var(--activity-col-width);
		background-color: var(--activity-bg-color);
	}

	.pet_container {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-left: 0.5px;
		border-color: #cbd5e1;
		border-left-style: solid;
	}
</style>
