<script>
	import ActivityRow from '$lib/ActivityRow.svelte';
	import PackRow from '$lib/PackRow.svelte';

	export let data;
</script>

<div class="layout">
	<PackRow name={data.pack.name} pets={data.pack.pets} />
	{#each data.pack.activities as activity (activity.id)}
		<ActivityRow {activity} />
	{/each}
</div>

<style>
	.layout {
		flex-direction: column;
		display: flex;
		min-height: 100vh;
		max-height: 100vh;
		min-width: 100vw;
		max-width: 100vw;
	}
</style>
