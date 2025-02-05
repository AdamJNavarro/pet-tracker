import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import {sveltePreprocess} from 'svelte-preprocess';
import postcssPresetEnv from 'postcss-preset-env';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			postcss: {
				plugins: [
					postcssPresetEnv({
						stage: 2,
						features: {
							'nesting-rules': true,
							'custom-media-queries': true,
							'media-query-ranges': true
						}
					})
				]
			}
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$assets: 'src/assets',
			$db: 'src/server/db',
			$state: 'src/state',
			$utils: 'src/utils'
		}
	}
};

export default config;
