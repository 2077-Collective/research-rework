<script lang="ts">
	import PerspectivesHero from '$lib/components/ui/PerspectivesHero.svelte';
	import PerspectivesList from '$lib/components/ui/PerspectivesList.svelte';
	import type { PageData } from '../$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="px-3 md:px-12 flex flex-col gap-10">
	<PerspectivesHero />
	<PerspectivesList articles={data.articles} />
</div>
