import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	async create({ request, locals }) {
		const user = (await locals.auth())?.user;

		if (!user?.email) {
			error(401);
		}

		const originalData = await request.formData();

		const couchInput = zfd.formData(CouchInputSchema).safeParse(originalData);
		if (!couchInput.success) {
			return fail(400, {
				errors: couchInput.error.format(),
				values: Object.fromEntries(originalData.entries())
			});
		}

		const prisma = locals.prisma;

		const prismaUser = await prisma.user.findUnique({
			where: {
				email: user.email
			}
		});

		if (!prismaUser) {
			error(500);
		}

		await locals.prisma.couch.create({
			data: {
				...couchInput.data,
				hostId: prismaUser.id
			}
		});

		redirect(303, '/app');
	}
};

const CouchInputSchema = z.object({
	location: z.string().min(1),
	description: z.string().min(1),
	price: z.coerce.number().nonnegative().finite().safe().optional()
});
