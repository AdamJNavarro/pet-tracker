import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'momento',
				project: 'pet-tracker'
			}
		}),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	]
});
