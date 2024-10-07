import { getUserFromLocals } from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';
import omit from 'just-omit';
import { type BookingInput, BookingInputSchema } from '$lib/schemas/input/BookingInputSchema';
import { zfd } from 'zod-form-data';
import type { PrismaClient } from '@prisma/client';
import type { User } from '@auth/sveltekit';

export async function load({ params, locals }) {
	const user = await getUserFromLocals(locals);

	const couch = await locals.prisma.couch.findUnique({
		where: {
			id: params.id
		},
		select: {
			name: true,
			host: true
		}
	});

	if (!couch) {
		error(404);
	}

	return {
		couch: omit(couch, ['host']),
		isOwner: couch.host.email === user.email
	};
}

export const actions = {
	async default({ request, locals, params }) {
		const originalData = await request.formData();
		const bookingInput = zfd.formData(BookingInputSchema).safeParse(originalData);

		if (!bookingInput.success) {
			return {
				status: 400,
				errors: bookingInput.error.format(),
				values: Object.fromEntries(
					originalData.entries().map(([key, value]) => [key, String(value)])
				)
			};
		}

		const isAvailable = await checkAvailability(locals.prisma, params.id, bookingInput.data);

		if (!isAvailable) {
			return {
				status: 409,
				errors: {
					_errors: ['This couch is unavailable for the selected dates.']
				},
				values: Object.fromEntries(
					originalData.entries().map(([key, value]) => [key, String(value)])
				)
			};
		}

		const session = await locals.auth();
		const isOwner = (session && checkOwnership(locals.prisma, session.user, params.id)) ?? false;

		await locals.prisma.booking.create({
			data: {
				...bookingInput.data,
				reason: isOwner ? 'blocked' : 'booked',
				couchId: params.id
			}
		});

		redirect(303, `/app/couches/${params.id}/bookings`);
	}
};

async function checkAvailability(
	prisma: PrismaClient,
	couchId: string,
	{ startDate, endDate }: BookingInput
) {
	const overlappingBooking = await prisma.booking.findFirst({
		where: {
			couchId,
			OR: [
				{
					startDate: {
						lte: startDate
					},
					endDate: {
						gt: startDate
					}
				},
				{
					startDate: {
						lt: endDate
					},
					endDate: {
						gte: endDate
					}
				}
			]
		}
	});

	return !overlappingBooking;
}

async function checkOwnership(prisma: PrismaClient, user: User | undefined, couchId: string) {
	if (!user) {
		return false;
	}

	const couch = await prisma.couch.findFirst({
		where: {
			id: couchId,
			host: {
				email: user.email
			}
		}
	});

	return !!couch;
}
