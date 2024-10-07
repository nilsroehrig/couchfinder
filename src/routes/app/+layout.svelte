<script>
	import { Bed, Sofa } from 'lucide-svelte';
	import { SignOut } from '@auth/sveltekit/components';
</script>

<div class="wrapper">
	<header>
		<nav>
			<ul>
				<li class="brand">
					<Sofa />
					Couchfinder
				</li>
				<li>
					<SignOut />
				</li>
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<aside>
		<nav>
			<ul>
				<li class="section-label">Hosting</li>
				<li>
					<a href="/app" role="button" class="secondary">
						<Bed />
						Manage Couches</a
					>
				</li>
				<li>
					<a href="/app">
						<Bed />
						Manage Bookings</a
					>
				</li>
				<li class="section-label">Guesting</li>
			</ul>
		</nav>
	</aside>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 18rem auto;
		grid-template-rows: min-content auto;
		height: 100vh;
	}

	header {
		padding-left: var(--pico-spacing);
		padding-right: var(--pico-spacing);
		background-color: rgba(255, 255, 255, 0.025);
		grid-column: 1 / -1;
		grid-row: 1;
	}

	header nav ul {
		flex: 100%;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	.brand {
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: calc(var(--pico-spacing) / 2);
		padding-left: 0;
	}

	main {
		overflow-y: auto;
		overflow-x: hidden;
		grid-column: 2 / -1;
		grid-row: 2;
		padding: var(--pico-spacing);
	}

	aside {
		background-color: rgba(255, 255, 255, 0.025);
		grid-column: 1;
		padding: var(--pico-spacing);
	}

	aside a {
		display: flex;
		align-items: center;
		gap: calc(var(--pico-spacing) / 2);
	}

	aside a[role='button'] {
		transform: translateX(calc(var(--pico-spacing) * -0.5));
		width: calc(100% + var(--pico-spacing));
	}

	:global(.signOutButton button) {
		margin: 0;
		padding: calc(var(--pico-nav-link-spacing-vertical) - var(--pico-border-width) * 2)
			var(--pico-nav-link-spacing-horizontal);
	}

	.section-label {
		font-weight: bolder;
		font-size: smaller;
		text-transform: uppercase;
	}

	li + .section-label {
		margin-top: var(--pico-spacing);
	}
</style>
