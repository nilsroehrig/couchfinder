import { getUserFromLocals } from '$lib/server/auth';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	async default({ locals, params }) {
		const user = await getUserFromLocals(locals);

		const couch = await locals.prisma.couch.findUnique({
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

		await locals.prisma.couch.delete({
			where: {
				id: couch.id
			}
		});

		redirect(303, '/app');
	}
};
