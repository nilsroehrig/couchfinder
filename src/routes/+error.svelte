<script>
	import { page } from '$app/stores';
	import { Home } from 'lucide-svelte';
</script>

<div>
    <article>
        <header><strong>{$page.status}</strong></header>
        <p>Oh no, something went wrong: {$page.error?.message}.</p>
        <a href="/" role="button" class="outline secondary"><Home /> Return to home</a>
    </article>
</div>

<style>
    div {
        width: 100vw;
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
</style>