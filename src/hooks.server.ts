import { createSvelteKitAuthConfig } from '$lib/server/auth';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

let svelteKitAuth: ReturnType<typeof createSvelteKitAuthConfig>;
let prismaClient: PrismaClient;

export async function handle({ event, resolve }) {
	if (!prismaClient) {
		if (event.platform?.env?.DB) {
			const adapter = new PrismaD1(event.platform!.env.DB);
			prismaClient = new PrismaClient({ adapter });
		} else {
			prismaClient = new PrismaClient();
		}
	}

	if (!svelteKitAuth) {
		svelteKitAuth = createSvelteKitAuthConfig(prismaClient);
	}

	const { handle, ...rest } = svelteKitAuth;

	event.locals.sveltekitAuth = rest;
	event.locals.prisma = prismaClient;

	return handle({ event, resolve });
}
