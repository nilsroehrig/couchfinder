import { error } from '@sveltejs/kit';
import { getUserFromLocals } from '$lib/server/auth';

export async function load({ locals }) {
	const user = await getUserFromLocals(locals);

	const prismaUser = await locals.prisma.user.findUnique({
		where: {
			email: user.email
		},
		include: {
			couches: {
				select: {
					id: true,
					location: true,
					price: true,
					description: true,
					_count: {
						select: { bookings: true }
					}
				}
			}
		}
	});

	if (!prismaUser) {
		error(500);
	}

	return {
		couches: prismaUser.couches
	};
}
