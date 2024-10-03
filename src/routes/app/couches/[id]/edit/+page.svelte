<script lang="ts">
	import { CircleFadingArrowUp } from 'lucide-svelte';

	export let data;
	export let form;

	$: couch = data.couch;

	function hasFieldErrors(field: string) {
		if (!form) {
			return false;
		}

		return Object.hasOwn(form.errors, field);
	}

	function isInvalid(field: string) {
		if (!form) {
			return null;
		}

		const hasErrors = hasFieldErrors(field);

		if (!hasErrors) {
			return 'false';
		}

		return 'true';
	}

	function getFieldErrors(field: string) {
		// @ts-expect-error because the index type is not defined on formatted zod error
		return form?.errors?.[field]?._errors ?? [];
	}
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
	<form method="post">
		<label for="name">Name</label>
		<input
			id="name"
			name="name"
			placeholder="The Fancy One"
			aria-invalid={isInvalid('name')}
			value={form?.values.name ?? couch.name}
		/>
		<label for="location"> Location </label>
		<input
			id="location"
			name="location"
			placeholder="23783 Norman Station, Revamouth, MO 72247"
			aria-invalid={isInvalid('location')}
			value={form?.values.location ?? couch.location}
		/>
		{#if hasFieldErrors('location')}
			<small>
				{#each getFieldErrors('location') as error}
					{error}<br />
				{/each}
			</small>
		{/if}
		<label for="price"> Price per Night (leave empty if free) </label>
		<input
			name="price"
			type="text"
			placeholder="15.00"
			aria-invalid={isInvalid('price')}
			value={form?.values.price ?? couch.price}
		/>
		{#if hasFieldErrors('price')}
			<small>
				{#each getFieldErrors('price') as error}
					{error}<br />
				{/each}
			</small>
		{/if}
		<label for="description"> Description </label>
		<textarea id="description" name="description" aria-invalid={isInvalid('description')} rows="5"
			>{form?.values.description ?? couch.description}</textarea
		>
		{#if hasFieldErrors('description')}
			<small>
				{#each getFieldErrors('description') as error}
					{error}<br />
				{/each}
			</small>
		{/if}

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
