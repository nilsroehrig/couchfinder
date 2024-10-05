import { zfd } from 'zod-form-data';
import { error, fail, redirect } from '@sveltejs/kit';
import { getUserFromLocals } from '$lib/server/auth';
import { CouchInputSchema } from '$lib/schemas/input/CouchInputSchema';

export const actions = {
	async default({ request, locals }) {
		const user = await getUserFromLocals(locals);
		const originalData = await request.formData();

		const couchInput = zfd.formData(CouchInputSchema).safeParse(originalData);
		if (!couchInput.success) {
			return fail(400, {
				errors: couchInput.error.format(),
				values: Object.fromEntries(
					originalData.entries().map(([key, value]) => [key, String(value)])
				)
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
