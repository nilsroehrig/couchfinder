import { zfd } from 'zod-form-data';
import { error, fail, redirect } from '@sveltejs/kit';
import { getUserFromLocals } from '$lib/server/auth';
import { CouchInputSchema } from '$lib/schemas/input/CouchInputSchema';

export async function load({ params, locals }) {
	const user = await getUserFromLocals(locals);
	const couch = await locals.prisma.couch.findUnique({
		where: {
			id: params.id
		},
		select: {
			location: true,
			price: true,
			description: true,
			name: true,
			host: true
		}
	});

	if (!couch) {
		error(404);
	}

	const { host, ...couchData } = couch;

	if (host.email !== user.email) {
		error(403);
	}

	return {
		couch: couchData
	};
}

export const actions = {
	async default({ request, locals, params }) {
		const user = await getUserFromLocals(locals);
		const originalData = await request.formData();

		const couchInput = zfd.formData(CouchInputSchema).safeParse(originalData);
		if (!couchInput.success) {
			return fail(400, {
				errors: couchInput.error.format(),
				values: Object.fromEntries(originalData.entries())
			});
		}

		const prisma = locals.prisma;

		const couch = await prisma.couch.findUnique({
			where: {
				id: params.id
			},
			include: {
				host: true
			}
		});

		if (!couch) {
			error(404);
		}

		if (couch.host.email !== user.email) {
			error(403);
		}

		await prisma.couch.update({
			where: {
				id: params.id
			},
			data: couchInput.data
		});

		redirect(303, '/app');
	}
};
