<script>
	import { Pen, PlusCircle, Search, Trash } from 'lucide-svelte';

	export let data;
</script>

<article>
	<header><strong>Your Couches</strong></header>
	<div class="search">
		<form>
			<fieldset role="search">
				<input name="term" type="search" placeholder="Search couches" autocomplete="off" />
				<button type="submit" class="secondary">
					<Search />
				</button>
			</fieldset>
		</form>
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
				<th>Price</th>
				<th class="couch-actions"></th>
			</tr>
		</thead>
		<tbody>
			{#each data.couches as couch (couch.id)}
				<tr>
					<td>{couch.location}</td>
					<td>{couch.price !== 'free' ? '$ ' : ''}{couch.price}</td>
					<td class="couch-actions">
						<div role="group">
							<a href="/couches/edit/{couch.id}" role="button" class="outline secondary">
								<Pen />
							</a>
							<a href="/couches/delete/{couch.id}" role="button" class="outline secondary">
								<Trash />
							</a>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</article>

<style>
	.search {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--pico-spacing);
	}

	[role='group'],
	[role='search'] {
		margin-bottom: 0;
	}

	.couch-actions {
		width: 0;
		text-align: right;
	}
</style>
