<script lang="ts">
	import type { Pet } from '$db/pets';
	import PetActivity from './PetActivity.svelte';

	export let pet: Pet;
</script>

<div class="container">
	<div class="header">{pet.name}</div>
	<PetActivity
		pet_id={pet.id}
		action_path={'?/update_single_pet'}
		activity="outside"
		last_activity_time={pet.outside_at}
		ago_format="hrs-ago"
	/>
	<PetActivity
		pet_id={pet.id}
		action_path={'?/update_single_pet'}
		activity="walked"
		last_activity_time={pet.walked_at}
		ago_format="days-ago"
	/>
	<PetActivity
		pet_id={pet.id}
		action_path={'?/update_single_pet'}
		activity="bathed"
		last_activity_time={pet.bathed_at}
		ago_format="days-ago"
	/>
	<PetActivity
		pet_id={pet.id}
		action_path={'?/update_single_pet'}
		activity="groomed"
		last_activity_time={pet.groomed_at}
		ago_format="days-ago"
	/>
	<!-- <PetActivity
		pet_id={pet.id}
		action_path={'?/update_single_pet'}
		activity="fed"
		last_activity_time={pet.fed_at}
		ago_format="hrs-ago"
	/> -->
</div>

<style>
	.container {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.header {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		align-items: center;
		font-size: var(--fs-l);
		font-weight: 500;
		text-transform: capitalize;
	}
</style>
