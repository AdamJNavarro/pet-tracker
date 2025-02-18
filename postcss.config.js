import postcssPresetEnv from 'postcss-preset-env';

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: [
		postcssPresetEnv({
			stage: 3,
			features: {
				'nesting-rules': true,
				'custom-media-queries': true,
				'media-query-ranges': true,
				'cascade-layers': false
			}
		})
	]
};

export default config;
