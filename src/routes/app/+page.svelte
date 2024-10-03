<script lang="ts">
	import { Calendar, Pen, PlusCircle, Trash } from 'lucide-svelte';

	export let data;

	let term: string = '';

	$: filteredCouches = applyFilter(term);

	function applyFilter(term: string) {
		return data.couches.filter((couch) =>
			couch.location.toLowerCase().includes(term.toLowerCase())
		);
	}
</script>

<article>
	<header><strong>Your Couches</strong></header>
	<div class="controls">
		<div>
			<input
				name="term"
				type="search"
				placeholder="Filter couches"
				autocomplete="off"
				bind:value={term}
			/>
		</div>
		<div class="grid page-actions">
			<a href="/app/couches/create" role="button">
				<PlusCircle />
				Add a couch</a
			>
		</div>
	</div>
	<table>
		<thead>
			<tr>
				<th>Location</th>
				<th>Price per Night</th>
				<th>Bookings</th>
				<th class="couch-actions"></th>
			</tr>
		</thead>
		<tbody>
			{#each filteredCouches as couch (couch.id)}
				<tr>
					<td>{couch.location}</td>
					<td>$ {couch.price}</td>
					<td>{couch._count.bookings}</td>
					<td class="couch-actions">
						<form method="post">
							<div role="group">
								<a
									href="/app/couches/{couch.id}/edit"
									role="button"
									class="outline secondary"
									data-tooltip="Edit Couch"
								>
									<Pen />
								</a>
								<a
									href="/app/couches/{couch.id}/bookings"
									role="button"
									class="outline secondary"
									data-tooltip="View Bookings"><Calendar /></a
								>
								<button
									formaction="/app/couches/{couch.id}/delete"
									class="outline secondary"
									data-tooltip="Delete Couch"
								>
									<Trash />
								</button>
							</div>
						</form>
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="4">No couches found</td>
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

	.controls [type='search'] {
		margin-bottom: 0;
	}

	[role='group'] {
		margin-bottom: 0;
	}

	.couch-actions {
		width: 0;
		text-align: right;
	}
</style>
