<script lang="ts">
	import { Toaster } from 'svelte-french-toast';

	import '../style.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<Toaster />
{@render children?.()}
