<script lang="ts">
	import { Ban, CalendarCheck } from 'lucide-svelte';
	import Input from '$lib/components/Input.svelte';
	import { getFieldErrors } from '$lib/helpers/form';
	import { enhance } from '$app/forms';
	import FormErrorDisplayer from '$lib/components/FormErrorDisplayer.svelte';

	const todayAsISO = new Date().toISOString().split('T').at(0) ?? '';

	let { data, form } = $props();

	let formHasErrors = $derived(!!form?.errors);
</script>

<article>
	<header>
		<strong>{data.isOwner ? 'Block' : 'Book'} {data.couch.name}</strong>
	</header>
	<FormErrorDisplayer errors={form?.errors} />
	<form method="post" use:enhance>
		<div class="grid">
			<div>
				<label for="startDate">From</label>
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
				<label for="endDate">Until</label>
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
