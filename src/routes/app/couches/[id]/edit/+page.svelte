<script lang="ts">
	import { CircleFadingArrowUp } from 'lucide-svelte';
	import Input from '$lib/components/Input.svelte';
	import { getFieldErrors } from '$lib/helpers/form';
	import TextArea from '$lib/components/TextArea.svelte';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let couch = $derived(data.couch);

	let formHasErrors = $derived(!!form?.errors);
</script>

<article>
	<header><strong> Edit Couch at {couch.location} </strong></header>
	{#if form?.errors?._errors?.length}
		<ul class="form-errors">
			{#each form.errors._errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	{/if}
	<form method="post" use:enhance>
		<label for="name">Name</label>
		<Input
			id="name"
			name="name"
			placeholder="The Fancy One"
			value={form?.values.name ?? couch.name}
			errors={getFieldErrors(form?.errors, 'name')}
			{formHasErrors}
		/>

		<label for="location"> Location </label>
		<Input
			id="location"
			name="location"
			placeholder="23783 Norman Station, Revamouth, MO 72247"
			value={form?.values.location ?? couch.location}
			errors={getFieldErrors(form?.errors, 'location')}
			{formHasErrors}
		/>

		<label for="price"> Price per Night (leave empty if free) </label>
		<Input
			name="price"
			type="text"
			placeholder="15.00"
			value={form?.values.price ?? couch.price}
			errors={getFieldErrors(form?.errors, 'price')}
			{formHasErrors}
		/>

		<label for="description"> Description </label>
		<TextArea
			id="description"
			name="description"
			rows={5}
			value={form?.values.description ?? couch.description}
			errors={getFieldErrors(form?.errors, 'description')}
			{formHasErrors}
		/>

		<button type="submit" class="primary">
			<CircleFadingArrowUp />
			Update Couch
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
