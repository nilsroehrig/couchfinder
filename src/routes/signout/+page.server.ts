export const actions = {
	default(...args) {
		return args[0].locals.sveltekitAuth.signOut(...args);
	}
};
