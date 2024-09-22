// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Action } from '@sveltejs/kit';

declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Locals {
			sveltekitAuth: {
				signIn: Action;
				signOut: Action;
			};
		}
	}
}

export {};
