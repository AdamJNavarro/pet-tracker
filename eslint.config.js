import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteParser from 'svelte-eslint-parser';

const git_ignore_path = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(git_ignore_path),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		files: ['**/*.{js,ts,svelte}'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parser: ts.parser,
			parserOptions: {
				extraFileExtensions: ['.svelte']
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser
			}
		}
	}
);
