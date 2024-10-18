import { error, redirect } from '@sveltejs/kit';

export const actions = {
	async default({ params, locals }) {
		const session = await locals.auth();

		if (!session?.user?.email) {
			error(401);
		}

		const prisma = locals.prisma;

		const booking = await prisma.booking.findUnique({
			where: {
				id: params.bookingId
			},
			include: {
				couch: {
					include: {
						host: true
					}
				},
				guest: true
			}
		});

		if (!booking) {
			error(404);
		}

		if (
			booking.couch.host.email !== session.user.email &&
			booking.guest?.email !== session.user.email
		) {
			error(403);
		}

		await prisma.booking.delete({
			where: {
				id: booking.id
			}
		});
	}
};
