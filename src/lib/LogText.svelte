<script lant="ts">
	export let main_text;
	export let sub_text;
</script>

<div class="container">
	<div class="main_text">{main_text}</div>
	<div class="sub_text">{sub_text}</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.main_text {
		font-size: var(--fs-s);
		color: var(--color-on-surface);
		font-weight: 600;
	}

	.sub_text {
		font-size: var(--fs-xs);
		color: var(--color-on-surface-subtle);
		font-weight: 500;
	}
</style>
