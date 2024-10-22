<script lang="ts">
	import type { MaybeFieldErrorsRecord } from '$lib/helpers/form';

	interface Props {
		errors: MaybeFieldErrorsRecord;
	}

	let { errors }: Props = $props();

	let fieldErrors = $derived(errors?._errors ?? []);
</script>

{#if fieldErrors.length}
	<small>
		{#each fieldErrors as error}
			{error}<br />
		{/each}
	</small>
{/if}
