import { z } from 'zod';

export const BookingInputSchema = z
	.object({
		startDate: z.string().date().transform(toDateTimeString),
		endDate: z.string().date().transform(toDateTimeString)
	})
	.refine(({ startDate, endDate }) => startDate < endDate, {
		message: 'Start date must be before end date',
		path: ['startDate']
	});

export type BookingInput = z.infer<typeof BookingInputSchema>;

function toDateTimeString(dateString: string) {
	return new Date(dateString).toISOString();
}
