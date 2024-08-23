<script lang="ts">
	import { enhance } from '$app/forms';
	import { form_action } from './form_action';
	export let text: string;
	export let thinking_text: string;
	export let action_path: string;

	let thinking = false;
</script>

<form
	action={action_path}
	method="POST"
	use:enhance={form_action(
		{},
		() => {
			thinking = true;
		},
		() => {
			thinking = false;
		}
	)}
>
	<slot />
	<button class="btn" disabled={thinking} type="submit">{thinking ? thinking_text : text}</button>
</form>

<style>
	/* CSS */
	.btn {
		align-items: center;
		appearance: none;
		background-color: #fcfcfd;
		border-radius: 4px;
		border-width: 0;
		box-shadow:
			rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		box-sizing: border-box;
		color: #36395a;
		cursor: pointer;
		display: inline-flex;
		font-family: 'JetBrains Mono', monospace;
		height: 48px;
		justify-content: center;
		line-height: 1;
		list-style: none;
		overflow: hidden;
		padding-left: 16px;
		padding-right: 16px;
		position: relative;
		text-align: left;
		text-decoration: none;
		transition:
			box-shadow 0.15s,
			transform 0.15s;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		white-space: nowrap;
		will-change: box-shadow, transform;
		font-size: 18px;
	}

	.btn:focus {
		box-shadow:
			#d6d6e7 0 0 0 1.5px inset,
			rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
	}

	.btn:hover {
		box-shadow:
			rgba(45, 35, 66, 0.4) 0 4px 8px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		transform: translateY(-2px);
	}

	.btn:active {
		box-shadow: #d6d6e7 0 3px 7px inset;
		transform: translateY(2px);
	}

	/* .btn.thinking {
		background-color: darkgray;
	} */
</style>
