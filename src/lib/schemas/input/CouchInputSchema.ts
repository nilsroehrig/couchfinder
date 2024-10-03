import { z } from 'zod';

export const CouchInputSchema = z.object({
	location: z.string().min(1),
	description: z.string().min(1),
	price: z.coerce.number().nonnegative().finite().safe().optional(),
	name: z.string().min(1)
});

export type CouchInput = z.infer<typeof CouchInputSchema>;
