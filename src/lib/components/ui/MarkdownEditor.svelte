<script lang="ts">
	import { MarkdownEditor } from 'carta-md';
	import '$lib/styles/carta-md/math-stack-exchange.css';
	import { carta } from '$lib/utils/carta';

	let {
		value = $bindable(''),
		name
	}: {
		value?: string;
		name?: string;
	} = $props();
</script>

<div class="math-stack-exchange-container">
	<MarkdownEditor {carta} bind:value theme="github" mode="tabs" />
</div>

{#if name}
	<textarea class="hidden" {name} bind:value> </textarea>
{/if}
