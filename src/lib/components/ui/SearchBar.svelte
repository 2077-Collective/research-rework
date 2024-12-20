<script lang="ts">
	import { Search } from 'lucide-svelte';
	import Badge from './badge/badge.svelte';
	import Input from './input/input.svelte';

	let {
		searchTerm = $bindable(),
		selectedCategory = $bindable(),
		articleCategories
	}: {
		searchTerm: string;
		articleCategories: string[];
		selectedCategory: string;
	} = $props();
</script>

<div class="flex flex-col md:flex-row gap-2 border-y py-4 md:py-6 mb-4">
	<Input class="grow-0" type="text" placeholder="Search" bind:value={searchTerm} variant="small">
		{#snippet icon()}
			<Search class="w-4 h-4" />
		{/snippet}
	</Input>
	<div class="flex flex-wrap gap-2">
		<Badge
			onclick={() => (selectedCategory = '')}
			class="cursor-pointer h-10"
			variant={selectedCategory === '' ? 'default' : 'outline'}>All</Badge
		>
		{#each articleCategories as category}
			<Badge
				onclick={() => (selectedCategory = category)}
				class="cursor-pointer h-10"
				variant={selectedCategory === category ? 'default' : 'outline'}>{category}</Badge
			>
		{/each}
	</div>
</div>
