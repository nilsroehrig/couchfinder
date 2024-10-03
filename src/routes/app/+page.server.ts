import { error } from '@sveltejs/kit';
import { getUserFromLocals } from '$lib/server/auth';

export async function load({ locals }) {
	const user = await getUserFromLocals(locals);

	const prismaUser = await locals.prisma.user.findUnique({
		where: {
			email: user.email
		},
		include: {
			couches: true
		}
	});

	if (!prismaUser) {
		error(500);
	}

	return {
		couches: prismaUser.couches.map(({ id, location, price, description }) => ({
			id,
			location,
			price: price ?? 'free',
			description
		}))
	};
}
