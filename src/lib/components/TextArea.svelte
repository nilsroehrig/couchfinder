<script lang="ts">
	import FormElementError from '$lib/components/FormElementError.svelte';
	import type { MaybeFieldErrorsRecord } from '$lib/helpers/form';

	interface $$Props extends Partial<HTMLTextAreaElement> {
		formHasErrors: boolean;
		errors: MaybeFieldErrorsRecord;
	}

	export let formHasErrors = false;
	export let errors: MaybeFieldErrorsRecord;
	export let name: string;

	$: isInvalid = !formHasErrors ? null : !!errors;
</script>

<textarea {...$$restProps} aria-invalid={isInvalid} {name}></textarea>
<FormElementError {errors} />
