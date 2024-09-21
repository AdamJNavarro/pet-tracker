// See https://kit.svelte.dev/docs/types#app
import 'unplugin-icons/types/svelte';
import type { DrizzleClient } from './hooks.server';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DrizzleClient;
			// form_data: Record<string, unknown>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
