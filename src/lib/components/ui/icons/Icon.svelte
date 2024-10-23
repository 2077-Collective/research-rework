<script lang="ts">
	import X from './X.svelte';
	import Discord from './Discord.svelte';
	import Farcaster from './Farcaster.svelte';

	const { name, size = '24px' }: { name: string; size?: string } = $props();
</script>

{#if name === 'x'}
	<X {size} />
{:else if name === 'discord'}
	<Discord {size} />
{:else if name === 'farcaster'}
	<Farcaster {size} />
{/if}
