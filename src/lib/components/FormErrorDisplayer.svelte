<script>
	export let errors;
</script>

{#if errors?._errors?.length}
	<ul class="form-errors">
		{#each errors._errors as error}
			<li>{error}</li>
		{/each}
	</ul>
{/if}
