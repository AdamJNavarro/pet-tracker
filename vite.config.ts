import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig, loadEnv } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		server: {
			port: 5175,
			strictPort: true,
			open: `/?code=${env.PUBLIC_AUTH_CODE}`
		},
		plugins: [
			enhancedImages(),
			sveltekit(),
			Icons({
				compiler: 'svelte'
			})
		]
	};
});
