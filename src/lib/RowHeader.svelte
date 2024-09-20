<script lang="ts">
	import type { Activity } from '$lib';
	import NameIcon from 'virtual:icons/mdi/dog';
	import MedsIcon from 'virtual:icons/solar/pills-bold';
	import GroomedIcon from 'virtual:icons/mingcute/scissors-line';
	import OutsideIcon from 'virtual:icons/mingcute/grass-line';
	import WalkedIcon from 'virtual:icons/fluent-emoji-high-contrast/paw-prints';
	import BathedIcon from 'virtual:icons/icon-park-outline/soap-bubble';
	import BrushedTeethIcon from 'virtual:icons/game-icons/toothbrush';
	export let label: Activity | 'name';
</script>

<div class="container">
	{#if label === 'name'}
		<NameIcon style="color:var(--color-primary); height:40px; width:40px;" />
	{:else if label === 'meds'}
		<MedsIcon style="color:var(--color-primary); height:40px; width:40px;" />
	{:else if label === 'outside'}
		<OutsideIcon style="color:var(--color-primary); height:40px; width:40px;" />
	{:else if label === 'bathed'}
		<BathedIcon style="color:var(--color-primary); height:40px; width:40px;" />
	{:else if label === 'groomed'}
		<GroomedIcon style="color:var(--color-primary); height:40px; width:40px;" />
	{:else if label === 'walked'}
		<WalkedIcon style="color:var(--color-primary); height:40px; width:40px;" />
	{:else if label === 'brushed teeth'}
		<BrushedTeethIcon style="color:var(--color-primary); height:40px; width:40px;" />
	{/if}
	<div class="label">{label}</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: var(--activity-col-width);
		background-color: var(--color-surface);
	}

	.label {
		font-size: var(--fs-xs);
		color: var(--color-fg-subtle);
		margin-top: 12px;
		text-transform: capitalize;
	}
</style>
