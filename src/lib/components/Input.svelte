<script lang="ts">
	import FormElementError from '$lib/components/FormElementError.svelte';
	import type { MaybeFieldErrorsRecord } from '$lib/helpers/form';

	

	interface Props {
		formHasErrors: boolean;
		errors: MaybeFieldErrorsRecord;
		name: string;
		[key: string]: any
	}

	let { formHasErrors = false, errors, name, ...rest }: Props = $props();

	let isInvalid = $derived(!formHasErrors ? null : !!errors);
</script>

<input {...rest} aria-invalid={isInvalid} {name} />
<FormElementError {errors} />
