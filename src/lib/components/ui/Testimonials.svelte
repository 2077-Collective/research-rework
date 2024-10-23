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
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			author: 'Ian Guimaraes',
			link: 'https://x.com/iankguimaraes/status/1845140636246094016',
			platform: 'farcaster',
			avatar: 'https://pbs.twimg.com/profile_images/1803745296289026048/vMxEJLa0_400x400.jpg',
			company: '2077 Labs'
		},
		{
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
			author: 'John Doe',
			link: 'https://x.com/iankguimaraes/status/1845140636246094016',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1803745296289026048/vMxEJLa0_400x400.jpg',
			company: '2077 Labs'
		}
	];

	const lowerRow: Testimonial[] = [
		{
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
			author: 'John Doe',
			link: 'https://x.com/iankguimaraes/status/1845140636246094016',
			platform: 'discord',
			avatar: 'https://pbs.twimg.com/profile_images/1803745296289026048/vMxEJLa0_400x400.jpg',
			company: '2077 Labs'
		},
		{
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
			author: 'John Doe',
			link: 'https://x.com/iankguimaraes/status/1845140636246094016',
			platform: 'x',
			avatar: 'https://pbs.twimg.com/profile_images/1803745296289026048/vMxEJLa0_400x400.jpg',
			company: '2077 Labs'
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
		Our research has reached 150,000 people and been shared by the community 300 times.
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
		class="embla__slide container border border-subtle p-6 w-full h-[184px] md:w-[432px] md:h-[232px]"
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
						<img src={testimonial.avatar} alt={testimonial.author} class="w-10 h-10 rounded-full" />
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
			<p>{testimonial.text}</p>
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
