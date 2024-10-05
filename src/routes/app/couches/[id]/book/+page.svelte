<script lang="ts">
	import { Ban, CalendarCheck } from 'lucide-svelte';
	import Input from '$lib/components/Input.svelte';
	import { getFieldErrors } from '$lib/helpers/form';
	import { enhance } from '$app/forms';

	const todayAsISO = new Date().toISOString().split('T').at(0) ?? '';

	export let data;
	export let form;

	$: formHasErrors = !!form?.errors;
</script>

<article>
	<header>
		<strong>{data.isOwner ? 'Block' : 'Book'} {data.couch.name}</strong>
	</header>
	{#if form?.errors?._errors?.length}
		<ul class="form-errors">
			{#each form.errors._errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	{/if}
	<form method="post" use:enhance>
		<div class="grid">
			<div>
				<label for="startDate">From Date</label>
				<Input
					type="date"
					id="startDate"
					min={todayAsISO}
					value={form?.values?.startDate ?? ''}
					errors={getFieldErrors(form?.errors, 'startDate')}
					name="startDate"
					{formHasErrors}
				/>
			</div>
			<div>
				<label for="endDate">Until Date</label>
				<Input
					type="date"
					id="endDate"
					min={todayAsISO}
					value={form?.values?.endDate ?? ''}
					errors={getFieldErrors(form?.errors, 'endDate')}
					name="endDate"
					{formHasErrors}
				/>
			</div>
		</div>
		<button type="submit">
			{#if data.isOwner}
				<Ban />
				Block
			{:else}
				<CalendarCheck />
				Book
			{/if}
		</button>
	</form>
</article>

<style>
	article {
		max-width: 35rem;
		margin: 0 auto;
	}

	label {
		font-size: 0.875em;
	}

	.form-errors {
		color: var(--pico-del-color);
	}
</style>
