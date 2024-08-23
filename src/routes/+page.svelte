<script>
	import ActivityRow from '$lib/ActivityRow.svelte';
	import PackRow from '$lib/PackRow.svelte';

	export let data;
	$: ({ pack } = data);
</script>

<div class="layout">
	<PackRow name={pack.name} pets={pack.pets} />
	{#each pack.activities as activity (activity.id)}
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
