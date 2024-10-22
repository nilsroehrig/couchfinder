<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { X } from 'lucide-svelte';
	/** @type {{ [key: string]: any }} */
	let { ...rest } = $props();
</script>

<button onclick={bubble('click')} type="button" data-tooltip="Cancel" data-placement="bottom" {...rest}>
	<X />
</button>

<style>
	button {
		background: transparent;
		border: none;
		padding: 0;
		margin: 0;
	}
</style>
