<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import AutoScroll from 'embla-carousel-auto-scroll';
	import Icon from './icons/Icon.svelte';

	interface Testimonial {
		text: string;
		author: string;
		link: string;
		platform: 'x' | 'discord' | 'farcaster';
		avatar: string;
		company?: string;
	}

	const upperRow: Testimonial[] = [
		{
			text: '<p>Very well written explanation of the topic.</p>',
			author: 'Akaki Mamageishvili',
			link: 'https://x.com/kakia1989/status/1830642446885359937?t=hN9TWvlpkNKKUvcfwre0Aw&s=19',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1821936982248828928/1bpDPzMf_400x400.jpg',
			company: 'Offchain Labs'
		},
		{
			text: '<p>Excellent, important thread!</p>',
			author: 'Eli Ben-Sasson',
			link: 'https://x.com/EliBenSasson/status/1842607212193259840?t=bwY9baCX4pR383YbFnQ35Q&s=19',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1833608126186090496/zGminA-__400x400.jpg',
			company: 'StarkWare'
		},
		{
			text: `
            <p class="mb-2">Shoutout to the chads at 2077.</p>
            <p class="mb-2">One of the best reports that unpacks how Euler is built and how we aim to unlock lending to new highs.</p>
            `,
			author: 'Euler Labs🛢️🇬🇧',
			link: 'https://x.com/eulerfinance/status/1863653055566430695',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1745107740135915520/AVyw9xJ9_400x400.png',
			company: 'Euler Finance'
		},
		{
			text: `
            <p class="mb-2">The <a class="text-blue-500 hover:underline" href="https://x.com/2077Collective" target="_blank" rel="noopener noreferrer">@2077Collective</a> gang were really in-depth about this - it's always great to see third parties write about what you've been working on</p>
            <p class="mb-2">Really solid non-agitprop writeup of our work over at Wildcat :)</p>
            `,
			author: 'laurence',
			link: 'https://x.com/functi0nzer0/status/1843704425568972901?s=46&t=Oa3-io-PodorudtH4BCkGg',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1679262771697926145/r3qk5Ycf_400x400.jpg',
			company: 'Wildcat Labs'
		}
	];

	const lowerRow: Testimonial[] = [
		{
			text: `<p class="mb-2">9/ Huge shoutout to <a class="text-blue-500 hover:underline" href="https://x.com/fikunmi_ap" target="_blank" rel="noopener noreferrer">@fikunmi_ap</a> and <a class="text-blue-500 hover:underline" href="https://x.com/2077Collective" target="_blank" rel="noopener noreferrer">@2077Collective</a> for a comprehensive report. Was great working/jamming on this together.</p>
            <p>Here is the full tweet / report:</p>`,
			author: 'taetaehoho',
			link: 'https://x.com/0xtaetaehoho/status/1828440721075868089?t=ixll2icB1vuM76Qsi9zhmQ&s=19',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1815856561329442816/3x0Y1Fwv_400x400.jpg',
			company: 'Eclipse'
		},
		{
			text: `
            <p class="mb-2">Great article on Chain Abstraction by the team at <a class="text-blue-500 hover:underline" href="https://x.com/2077Research" target="_blank" rel="noopener noreferrer">@2077Research</a>!</p>
            <p>Read about CAKE framework and OneBalance accounts</p>
			`,
			author: '☉neBalance',
			link: 'https://x.com/onebalance_io/status/1846220067610284490?s=46&t=3HX1wysJ915JPCYnZlMPfA',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1792965136287752192/yxw3FekR_400x400.jpg',
			company: '☉neBalance'
		},
		{
			text: `
            <p class="mb-1 italic text-muted-foreground text-xs">[...]</p>
            <p class="mb-2">🐡 Enter <a class="text-blue-500 hover:underline" href="https://x.com/puffer_unifi" target="_blank" rel="noopener noreferrer">@puffer_unifi</a>, aligning L1 + L2 with decentralized sequencing + shared MEV rewards.</p>
            <p class="mb-2">🌐 Read <a class="text-blue-500 hover:underline" href="https://x.com/2077Research" target="_blank" rel="noopener noreferrer">@2077Research</a>'s full analysis below👇</p>
            `,
			author: 'DeFi Dad',
			link: 'https://x.com/defi_dad/status/1849100399485067733?s=46&t=Oa3-io-PodorudtH4BCkGg',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1613764698775633921/72tL5YzB_400x400.jpg'
		},
		{
			text: `
            <p class="mb-2 italic text-muted-foreground text-xs">[...]</p>
            <p class="mb-1">One highlight I will give here is <a class="text-blue-500 hover:underline" href="https://x.com/2077Research" target="_blank" rel="noopener noreferrer">@2077Research</a></p>
            <p>They are crazy detail-oriented and analytical. They could even find details about your project that you haven't even thought about 😂</p>
            `,
			author: 'altan tutar',
			link: 'https://x.com/mraltantutar/status/1864989691365171446',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1859994819331796992/-b_37I4q_400x400.jpg',
			company: 'nuffle'
		}
	];

	function getAutoscroll() {
		return AutoScroll({
			stopOnInteraction: false,
			stopOnMouseEnter: true,
			startDelay: 200,
			speed: 1
		});
	}
</script>

<div class="border-y py-6 md:py-14 flex flex-col gap-8 md:gap-10">
	<h2 class="text-3xl md:text-5xl font-medium font-soehne">
		Our research has reached over 150,000 people and been shared by the community 300+ times.
	</h2>

	<div class="relative">
		<div
			class="bg-gradient-to-r from-background to-transparent absolute left-0 w-10 md:w-20 z-10 h-full top-0"
		></div>

		<div class="gap-4 hidden md:flex flex-col relative">
			{@render autoscroll(upperRow, 'ltr')}
			{@render autoscroll(lowerRow, 'rtl')}
		</div>

		<div class="md:hidden">
			{@render autoscroll([...upperRow, ...lowerRow], 'ltr')}
		</div>

		<div
			class="bg-gradient-to-l from-background to-transparent absolute right-0 w-10 md:w-20 z-10 h-full top-0"
		></div>
	</div>
</div>

{#snippet autoscroll(rows: Testimonial[], direction: 'ltr' | 'rtl')}
	<div
		class="embla"
		use:emblaCarouselSvelte={{
			options: { direction },
			plugins: [getAutoscroll()]
		}}
	>
		<div class="embla__container flex gap-4" dir={direction}>
			{#each [...rows, ...rows, ...rows, ...rows] as testimonial}
				{@render card(testimonial)}
			{/each}
		</div>
	</div>
{/snippet}

{#snippet card(testimonial: Testimonial)}
	<div
		class="embla__slide container border border-subtle p-6 w-full h-[232px] md:w-[432px] md:h-[232px]"
		dir="ltr"
	>
		<a
			href={testimonial.link}
			target="_blank"
			rel="noopener noreferrer"
			class="flex flex-col gap-4"
		>
			<div class="flex gap-2">
				<div class="flex gap-2 justify-between w-full">
					<div class="flex gap-2 items-center">
						<img
							src={testimonial.avatar}
							alt={testimonial.author}
							class="w-10 md:h-10 rounded-full"
						/>
						<div>
							<p class="font-medium">{testimonial.author}</p>
							{#if testimonial.company}
								<p class="text-gray-500">{testimonial.company}</p>
							{/if}
						</div>
					</div>
					<div class="flex gap-2">
						<Icon name={testimonial.platform} />
					</div>
				</div>
			</div>

			<span class="text-sm md:text-base">{@html testimonial.text}</span>
		</a>
	</div>
{/snippet}

<style scoped>
	.embla {
		overflow: hidden;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 433px;
		min-width: 0;
		max-width: 100%;
	}
</style>
