import { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_URL } from '$env/static/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import Auth0 from '@auth/sveltekit/providers/auth0';
import type { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';

export function createSvelteKitAuthConfig(prisma: PrismaClient) {
	return SvelteKitAuth({
		adapter: PrismaAdapter(prisma),
		providers: [
			Auth0({
				clientId: AUTH0_CLIENT_ID,
				clientSecret: AUTH0_CLIENT_SECRET,
				issuer: AUTH0_URL
			})
		]
	});
}
