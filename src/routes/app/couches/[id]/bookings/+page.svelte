<script lang="ts">
	import { Pen, PlusCircle, X } from 'lucide-svelte';
	import { page } from '$app/stores';

	let term: string = '';
</script>

<article>
	<header>
		<strong>Bookings for The Fancy One</strong>
	</header>
	<div class="controls">
		<div>
			<input
				name="term"
				type="search"
				placeholder="Filter bookings"
				autocomplete="off"
				bind:value={term}
			/>
		</div>
		<div class="grid page-actions">
			<a href="/app/couches/{$page.params.id}/book" role="button">
				<PlusCircle />
				Add a Booking</a
			>
		</div>
	</div>
	<table>
		<thead>
			<tr>
				<th>Couch</th>
				<th>From</th>
				<th>Until</th>
				<th>Reason</th>
				<th class="actions"></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>The Fancy One</td>
				<td>2021-10-01</td>
				<td>2021-10-03</td>
				<td>Booked</td>
				<td class="actions">
					<form method="post">
						<div role="group">
							<a
								href="/app/bookings/1/edit"
								role="button"
								class="outline secondary"
								data-tooltip="Edit Booking"
							>
								<Pen />
							</a>
							<button
								formaction="/app/bookings/1/cancel"
								class="outline secondary"
								data-tooltip="Cancel Booking"
							>
								<X />
							</button>
						</div>
					</form>
				</td>
			</tr>
		</tbody>
	</table>
</article>

<style>
	.controls {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--pico-spacing);
	}

	.controls [type='search'] {
		margin-bottom: 0;
	}

	[role='group'] {
		margin-bottom: 0;
	}

	.actions {
		width: 0;
		text-align: right;
	}
</style>
