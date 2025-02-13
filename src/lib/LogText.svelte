<script lang="ts">
	let { main_text, sub_text } = $props();
</script>

<div class="container">
	<div class="main-text">{main_text}</div>
	<div class="sub-text">{sub_text}</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.main-text {
		font-size: var(--fs-s);
		color: var(--color-on-surface);
		font-weight: 600;
	}

	.sub-text {
		font-size: var(--fs-xs);
		color: var(--color-on-surface-subtle);
		font-weight: 500;
	}
</style>
