import { z } from 'zod';

export const CouchInputSchema = z.object({
	location: z.string().min(1),
	description: z.string().min(1),
	price: z.coerce.number().nonnegative().finite().safe().optional()
});

export type CouchInput = z.infer<typeof CouchInputSchema>;
