<script lang="ts">
	import type { FullPet } from '$server/db/schema';
	import { get_log_breakdown } from '$utils';
	import { enhance } from '$app/forms';

	interface Props {
		pet: FullPet;
	}

	let { pet }: Props = $props();

	// Get the most recent activity log timestamp
	let most_recent_log = $derived(pet.activities[0]?.logs[0]?.time_stamp);

	let time_breakdown = $derived(
		most_recent_log
			? get_log_breakdown({
					time_stamp: most_recent_log,
					desired_frequency: pet.activities[0]?.desired_frequency ?? null
				})
			: null
	);

	// Dynamic background image based on pet name
	let background_image = $derived(
		pet.name.toLowerCase().includes('ace')
			? 'url("/ace-outside.png")'
			: pet.name.toLowerCase().includes('cooper')
				? 'url("/cooper-outside.png")'
				: 'url("/franklin-outside.png")'
	);
</script>

<form method="POST" action="?/create_log" use:enhance>
	<input type="hidden" name="pet_id" value={pet.id} />
	<input type="hidden" name="activity_id" value={pet.activities[0]?.id} />

	<button type="submit" class="pet-tile" style="background-image: {background_image};">
		<div class="pet-name">{pet.name}</div>
		{#if time_breakdown}
			<div class="time-display">
				<div class="time-number">{time_breakdown.ago_str.split(' ')[0]}</div>
				<div class="time-unit">{time_breakdown.ago_str.split(' ').slice(1).join(' ')} ago</div>
			</div>
		{/if}
	</button>
</form>

<style lang="postcss">
	.pet-tile {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: var(--color-surface);
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: var(--border-radius);
		position: relative;
		border: none;
		padding: 0;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		width: 100%;
		height: 100%;
	}

	.pet-tile:hover {
		transform: scale(1.02);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	}

	.pet-tile:active {
		transform: scale(0.98);
	}

	.pet-tile::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
		border-radius: var(--border-radius);
	}

	.pet-name {
		font-size: 2.5rem;
		font-weight: 600;
		position: absolute;
		top: var(--spacing);
		left: 16px;
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
		z-index: 1;
		text-transform: capitalize;
	}

	.time-display {
		position: absolute;
		bottom: var(--spacing);
		right: var(--spacing);
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
		z-index: 1;
		text-align: center;
	}

	.time-number {
		font-size: 3rem;
		font-weight: bold;
		line-height: 1;
	}

	.time-unit {
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 1;
	}
</style>
