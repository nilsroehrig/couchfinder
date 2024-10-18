<script>
	import { X } from 'lucide-svelte';
</script>

<button on:click type="button" data-tooltip="Cancel" data-placement="bottom" {...$$restProps}>
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
