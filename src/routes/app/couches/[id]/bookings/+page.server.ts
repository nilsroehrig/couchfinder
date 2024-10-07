import { error } from '@sveltejs/kit';
import pick from 'just-pick';

export async function load({ params, locals }) {
	const couch = await locals.prisma.couch.findUnique({
		where: {
			id: params.id
		},
		select: {
			name: true,
			host: {
				select: {
					email: true
				}
			},
			bookings: {
				select: {
					id: true,
					startDate: true,
					endDate: true,
					reason: true
				},
				orderBy: {
					startDate: 'asc'
				}
			}
		}
	});

	if (!couch) {
		error(404);
	}

	const session = await locals.auth();

	if (couch.host.email !== session?.user?.email) {
		error(403);
	}

	return {
		couch: pick(couch, ['name', 'bookings'])
	};
}
