import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const session = await locals.auth();

	if (!session) {
		error(401);
	}

	const user = session.user;

	if (!user?.email) {
		error(500);
	}

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
