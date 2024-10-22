<script lang="ts">
	import Input from './input/input.svelte';
	import Button from './button/button.svelte';
	import { ArrowRight } from 'lucide-svelte';

	let email: string = '';

	function handleSubmit() {
		console.log('Submitted email:', email);
	}
</script>

<div
	class="flex gap-6 justify-center items-center px-40 py-32 max-md:px-5 max-md:py-24 bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent w-full"
>
	<div
		class="flex flex-col justify-center items-center flex-1 shrink self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full"
	>
		<h1 class="font-soehne text-5xl font-medium leading-tight max-md:max-w-full max-md:text-3xl">
			Your Ethereum Edge
		</h1>
		<p class="mt-2.5 text-lg max-md:max-w-full text-center">
			Get first-hand research delivered by our team of experts.
		</p>
		<form
			on:submit|preventDefault={handleSubmit}
			class="flex relative gap-2 justify-center items-start self-center mt-8 max-w-full"
		>
			<label for="emailInput" class="sr-only">Your email address</label>
			<Input
				type="email"
				id="emailInput"
				bind:value={email}
				placeholder="Your email address"
				class="flex gap-2 items-center px-5 py-2.5 text-lg tracking-tight leading-loose  min-w-[240px] rounded-[999px] w-[380px]"
				required
			>
				{#snippet button()}
					<Button type="submit" aria-label="Subscribe" class="rounded-full bg-primary">
						<ArrowRight class="w-6 h-6" />
					</Button>
				{/snippet}
			</Input>
		</form>
	</div>
</div>
