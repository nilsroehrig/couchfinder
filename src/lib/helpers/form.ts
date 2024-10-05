import { z } from 'zod';

export function getValidationHelpers(form?: unknown) {
	function hasFieldErrors(field: string) {
		if (!isFormWithErrors(form)) {
			return false;
		}

		return Object.hasOwn(form.errors, field);
	}

	function isInvalid(field: string) {
		if (!isFormWithErrors(form)) {
			return null;
		}

		const hasErrors = hasFieldErrors(field);

		if (!hasErrors) {
			return 'false';
		}

		return 'true';
	}

	function getFieldErrors(field: string) {
		if (!isFormWithErrors(form)) {
			return [];
		}
		return form.errors?.[field]?._errors ?? [];
	}

	return {
		hasFieldErrors,
		getFieldErrors,
		isInvalid
	};
}

type FormWithErrors = {
	errors: {
		_errors: string[];
	} & {
		[key: string]: {
			_errors: string[];
		};
	};
};

function isFormWithErrors(form: unknown): form is FormWithErrors {
	return typeof form === 'object' && form !== null && 'errors' in form;
}

export function getFieldErrors(errors: unknown, fieldName: string) {
	const parseResult = z
		.object({
			[fieldName]: z.object({
				_errors: z.array(z.string())
			})
		})
		.safeParse(errors);

	if (!parseResult.success) {
		return;
	}

	return parseResult.data[fieldName];
}

export type MaybeFieldErrorsRecord = ReturnType<typeof getFieldErrors>;
