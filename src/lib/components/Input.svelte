<script lang="ts">
	import FormElementError from '$lib/components/FormElementError.svelte';
	import type { MaybeFieldErrorsRecord } from '$lib/helpers/form';

	interface $$Props extends Partial<HTMLInputElement> {
		formHasErrors: boolean;
		errors: MaybeFieldErrorsRecord;
	}

	export let formHasErrors = false;
	export let errors: MaybeFieldErrorsRecord;
	export let name: string;

	$: isInvalid = !formHasErrors ? null : !!errors;
</script>

<input {...$$restProps} aria-invalid={isInvalid} {name} />
<FormElementError {errors} />
