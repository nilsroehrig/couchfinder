import { error, redirect } from '@sveltejs/kit';
import pick from 'just-pick';
import { zfd } from 'zod-form-data';
import { BookingInputSchema } from '$lib/schemas/input/BookingInputSchema';

export async function load({ params, locals }) {
	const session = await locals.auth();

	if (!session?.user?.email) {
		error(401);
	}

	const booking = await locals.prisma.booking.findUnique({
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

	return {
		booking: pick(booking, ['id', 'startDate', 'endDate']),
		couch: pick(booking.couch, ['name'])
	};
}

export const actions = {
	async default({ params, locals, request }) {
		const session = await locals.auth();

		if (!session?.user?.email) {
			error(401);
		}

		const booking = await locals.prisma.booking.findUnique({
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

		const parseResult = zfd.formData(BookingInputSchema).safeParse(await request.formData());

		if (!parseResult.success) {
			return {
				status: 400,
				errors: parseResult.error.format()
			};
		}

		await locals.prisma.booking.update({
			where: {
				id: booking.id
			},
			data: parseResult.data
		});

		redirect(303, `/app/couches/${booking.couchId}/bookings`);
	}
};
