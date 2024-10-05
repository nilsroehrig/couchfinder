<script lang="ts">
	import type { MaybeFieldErrorsRecord } from '$lib/helpers/form';

	export let errors: MaybeFieldErrorsRecord;

	$: fieldErrors = errors?._errors ?? [];
</script>

{#if fieldErrors.length}
	<small>
		{#each fieldErrors as error}
			{error}<br />
		{/each}
	</small>
{/if}
