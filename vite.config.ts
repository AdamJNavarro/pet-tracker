import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	server: {
		port: 5175,
		strictPort: true,
		open: '/?code=124'
	},
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'momento',
				project: 'pet-tracker'
			}
		}),
		enhancedImages(),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	]
});
