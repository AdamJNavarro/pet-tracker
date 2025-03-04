<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';

	function run_refresh() {
		invalidateAll();
	}
</script>

<div style="margin-left:48px;margin-top:48px">
	<h1>Whoops!</h1>
	<p>{page.error?.message || 'Something went wrong'}</p>

	<button style="padding:16px;" onclick={run_refresh}>Refresh App</button>
</div>
