<script lang="ts">
	import { enhance } from '$app/forms';
	import { dateToISODate } from '$lib/helpers/date';
	import { CircleFadingArrowUp } from 'lucide-svelte';
	import CancelButton from '$lib/components/CancelButton.svelte';
	import FormErrorDisplayer from '$lib/components/FormErrorDisplayer.svelte';
	import Input from '$lib/components/Input.svelte';
	import { getFieldErrors } from '$lib/helpers/form';

	export let data;
	export let form;

	$: formHasErrors = !!form?.errors;
</script>

<article>
	<header>
		<strong>Edit Booking of {data.couch.name}</strong>
		<CancelButton on:click={() => window.history.back()} />
	</header>
	<form method="post" use:enhance>
		<FormErrorDisplayer errors={form?.errors} />
		<div class="grid">
			<div>
				<label for="startDate">From</label>
				<Input
					type="date"
					name="startDate"
					id="startDate"
					value={dateToISODate(data.booking.startDate)}
					errors={getFieldErrors(form?.errors, 'startDate')}
					{formHasErrors}
				/>
			</div>
			<div>
				<label for="endDate">Until</label>
				<Input
					type="date"
					name="endDate"
					id="endDate"
					value={dateToISODate(data.booking.endDate)}
					errors={getFieldErrors(form?.errors, 'endDate')}
					{formHasErrors}
				/>
			</div>
		</div>
		<button type="submit">
			<CircleFadingArrowUp />
			Update Booking
		</button>
	</form>
</article>

<style>
	article {
		max-width: 35rem;
		margin: 0 auto;
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	button {
		margin-bottom: 0;
	}
</style>
