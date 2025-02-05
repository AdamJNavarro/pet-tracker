<script lang="ts">
	import { Toaster } from 'svelte-hot-french-toast';

	import '../style.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Toaster />
{@render children?.()}
