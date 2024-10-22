<script lang="ts">
	import '@picocss/pico';
	import '@picocss/pico/css/pico.indigo.css';
	import '@picocss/pico/css/pico.colors.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}
