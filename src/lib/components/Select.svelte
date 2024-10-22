<script lang="ts">
	import FormElementError from '$lib/components/FormElementError.svelte';
	import type { MaybeFieldErrorsRecord } from '$lib/helpers/form';

	

	interface Props {
		formHasErrors: boolean;
		errors: MaybeFieldErrorsRecord;
		name: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		formHasErrors = false,
		errors,
		name,
		children,
		...rest
	}: Props = $props();

	let isInvalid = $derived(!formHasErrors ? null : !!errors);
</script>

<select {...rest} aria-invalid={isInvalid} {name}>{@render children?.()}</select>
<FormElementError {errors} />
