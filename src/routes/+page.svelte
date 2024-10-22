<script>
	import { MapPin, MessageCircleMore, Star } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<header class="container">
	<nav>
		<ul>
			<li><strong>Couchfinder</strong></li>
		</ul>
	</nav>
</header>

<section class="container">
	<article class="grid hero">
		<div class="intro">
			<h1>Find Your Next Couch Adventure</h1>
			<p>
				Discover unique places to stay, connect with new people, and enjoy amazing experiences – all
				from the comfort of a host&rsquo;s couch.
			</p>
			<SignIn options={{ redirectTo: `${$page.url.origin}/app` }}>
				{#snippet submitButton()}
					<span>Join Couchfinder Today</span>
				{/snippet}
			</SignIn>
		</div>
		<div>
			<img src="/hero.jpg" alt="" />
		</div>
	</article>
</section>

<section id="features" class="container">
	<article>
		<header><strong role="heading" aria-level="2">Why Choose Couchfinder?</strong></header>
		<div class="grid">
			<div>
				<h3>
					<MapPin />
					Explore New Places
				</h3>
				<p>
					Stay with locals and discover hidden gems in cities around the world, without the cost of
					traditional accommodations.
				</p>
			</div>
			<div>
				<h3>
					<MessageCircleMore />
					Connect with Hosts
				</h3>
				<p>
					Message hosts, read reviews, and choose the perfect place to stay based on your
					preferences.
				</p>
			</div>
			<div>
				<h3>
					<Star />
					Ratings & Reviews
				</h3>
				<p>
					Trust the community! See guest and host reviews to find the best matches for your next
					adventure.
				</p>
			</div>
		</div>
	</article>
</section>

<section id="how-it-works" class="container">
	<article>
		<header><strong role="heading" aria-level="2">How Couchfinder Works</strong></header>
		<div class="grid">
			<div>
				<h3>1. Sign Up</h3>
				<p>
					Create your account as a host or guest. Set up your profile with a few clicks and you're
					ready to start!
				</p>
			</div>
			<div>
				<h3>2. Browse Listings</h3>
				<p>
					Search for couches by location, dates, and reviews. Choose a place that fits your vibe.
				</p>
			</div>
			<div>
				<h3>3. Book & Stay</h3>
				<p>
					Send a booking request, get confirmed, and enjoy your stay. Don't forget to leave a
					review!
				</p>
			</div>
		</div>
	</article>
</section>

<footer class="container">
	<small>&copy; 2024 Couchfinder. All rights reserved.</small>
</footer>

<style>
	.hero {
		padding: 0;
	}

	.intro {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
	}

	h3 {
		font-size: 1rem;
		display: flex;
		align-items: center;
		gap: calc(var(--pico-spacing) / 2);
	}

	footer {
		text-align: center;
	}
</style>
