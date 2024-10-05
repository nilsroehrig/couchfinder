<script lang="ts">
	import FormElementError from '$lib/components/FormElementError.svelte';
	import type { MaybeFieldErrorsRecord } from '$lib/helpers/form';

	interface $$Props extends Partial<HTMLSelectElement> {
		formHasErrors: boolean;
		errors: MaybeFieldErrorsRecord;
	}

	export let formHasErrors = false;
	export let errors: MaybeFieldErrorsRecord;
	export let name: string;

	$: isInvalid = !formHasErrors ? null : !!errors;
</script>

<select {...$$restProps} aria-invalid={isInvalid} {name}><slot /></select>
<FormElementError {errors} />
