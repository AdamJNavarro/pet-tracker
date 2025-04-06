<script lang="ts">
	import type { IconName } from '$lib';
	import DogHeadIcon from 'virtual:icons/mdi/dog';
	import MedsIcon from 'virtual:icons/solar/pills-bold';
	import ScissorsIcon from 'virtual:icons/mingcute/scissors-line';
	import GrassIcon from 'virtual:icons/mingcute/grass-line';
	import PawPrintsIcon from 'virtual:icons/fluent-emoji-high-contrast/paw-prints';
	import BubblesIcon from 'virtual:icons/icon-park-outline/soap-bubble';
	import ToothBrushIcon from 'virtual:icons/game-icons/toothbrush';
	import DogBowlIcon from 'virtual:icons/game-icons/dog-bowl';
	import ClipboardCheckmarkIcon from 'virtual:icons/fluent/clipboard-checkmark-24-regular';
	interface Props {
		icon_name: IconName | null;
		label: string;
	}

	let { icon_name, label }: Props = $props();
	let style_str = 'color:var(--color-on-primary); height:36px; width:36px;';
</script>

<div class="container">
	{#if icon_name === 'dog_head'}
		<DogHeadIcon style={style_str} />
	{:else if icon_name === 'dog_bowl'}
		<DogBowlIcon style={style_str} />
	{:else if icon_name === 'meds'}
		<MedsIcon style={style_str} />
	{:else if icon_name === 'grass'}
		<GrassIcon style={style_str} />
	{:else if icon_name === 'bubbles'}
		<BubblesIcon style={style_str} />
	{:else if icon_name === 'scissors'}
		<ScissorsIcon style={style_str} />
	{:else if icon_name === 'paw_prints'}
		<PawPrintsIcon style={style_str} />
	{:else if icon_name === 'toothbrush'}
		<ToothBrushIcon style={style_str} />
	{:else}
		<ClipboardCheckmarkIcon style={style_str} />
	{/if}
	<div class="label">{label}</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 200px;
		border-radius: var(--border-radius);
		background-color: var(--color-primary);
		box-shadow: var(--shadow-elevation-medium);
	}

	.label {
		font-size: var(--fs-xs);
		letter-spacing: 0.5px;
		color: var(--color-bg);
		margin-top: 8px;
		text-transform: capitalize;
	}
</style>
