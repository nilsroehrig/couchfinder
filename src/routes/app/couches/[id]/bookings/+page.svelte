<script lang="ts">
	import { Ban, Pen, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	export let data;
</script>

<article>
	<header>
		<strong>Bookings for {data.couch.name}</strong>
	</header>
	<div class="controls">
		<div class="grid page-actions">
			<a href="/app/couches/{$page.params.id}/book" role="button">
				<Ban />
				Add Blocking
			</a>
		</div>
	</div>
	<table>
		<thead>
			<tr>
				<th>From</th>
				<th>Until</th>
				<th>Reason</th>
				<th class="actions"></th>
			</tr>
		</thead>
		<tbody>
			{#each data.couch.bookings as booking (booking.id)}
				<tr>
					<td>{booking.startDate.toLocaleDateString('en-US')}</td>
					<td>{booking.endDate.toLocaleDateString('en-US')}</td>
					<td>{booking.reason}</td>
					<td class="actions">
						<form method="post" use:enhance>
							<div role="group">
								{#if booking.reason === 'blocked'}
									<a
										href="/app/couches/{data.couch.id}/bookings/{booking.id}/edit"
										role="button"
										class="outline secondary"
										data-tooltip="Edit Booking"
									>
										<Pen />
									</a>
								{/if}
								<button
									formaction="/app/couches/{data.couch.id}/bookings/{booking.id}/cancel"
									class="outline secondary"
									data-tooltip="Cancel Booking"
								>
									<X />
								</button>
							</div>
						</form>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4">No bookings found</td>
				</tr>
			{/each}
		</tbody>
	</table>
</article>

<style>
	.controls {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--pico-spacing);
	}

	[role='group'] {
		margin-bottom: 0;
	}

	.actions {
		width: 0;
		text-align: right;
	}

	.page-actions {
		margin-left: auto;
	}
</style>
