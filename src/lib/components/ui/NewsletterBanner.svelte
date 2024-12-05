<script lang="ts">
	import Input from './input/input.svelte';
	import Button from './button/button.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	const { variant = 'home' }: { variant?: 'home' | 'article' } = $props();

	let email = $state('');
	let csrfToken = $state('');
	let responseMessage = $state('');

	async function fetchCsrfToken() {
		try {
			const response = await fetch('https://cms.2077.xyz/get-csrf-token/', {
				credentials: 'include'
			});
			const data = await response.json();
			csrfToken = data.csrfToken;
		} catch (error) {
			responseMessage = 'An error occurred while fetching the CSRF token. Please try again.';
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch('https://cms.2077.xyz/newsletter/subscribe/', {
				method: 'POST',
				body: formData,
				headers: {
					'X-CSRFToken': csrfToken
				},
				credentials: 'include'
			});

			if (response.ok) {
				form.reset();
				responseMessage = 'Subscription successful!';
			} else {
				const data = await response.json();
				throw new Error(data.message || 'An error occurred');
			}
		} catch (error) {
			responseMessage = (error as Error).message || 'An error occurred. Please try again.';
		}
	}

	onMount(async () => {
		await fetchCsrfToken();
	});
</script>

{#if variant === 'article'}
	{@render article()}
{:else}
	{@render home()}
{/if}

{#snippet article()}
	<div
		id="subscribe"
		class="flex gap-6 justify-center items-center px-20 py-12 max-md:px-5 max-md:py-12 bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent w-full mt-6"
	>
		<div
			class="flex flex-col justify-center items-center flex-1 shrink self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full"
		>
			<h1 class="font-soehne text-2xl md:text-3xl font-medium max-lg:max-w-full text-center">
				Your Ethereum Edge
			</h1>

			<span class="mt-1 text-md max-md:max-w-full text-center mb-6 leading-tight md:leading-normal">
				Get first-hand research delivered by our team of experts.
			</span>
			{@render subscribeForm()}
			<p class="text-sm mt-1.5 max-md:max-w-full text-center">{responseMessage}</p>
		</div>
	</div>
{/snippet}

{#snippet home()}
	<div
		id="subscribe"
		class="flex gap-6 justify-center items-center px-40 py-32 max-md:px-5 max-md:py-24 bg-gradient-to-b from-gray-100 to-transparent dark:from-secondary dark:to-transparent w-full"
	>
		<div
			class="flex flex-col justify-center items-center flex-1 shrink self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full"
		>
			<h1
				class="font-soehne text-5xl font-medium leading-tight max-lg:max-w-full max-lg:text-3xl text-center"
			>
				Your Ethereum Edge
			</h1>
			<p class="mt-2.5 text-lg max-md:max-w-full text-center mb-8">
				Get first-hand research delivered by our team of experts.
			</p>
			{@render subscribeForm()}
			<p class="text-sm mt-2.5 max-md:max-w-full text-center">{responseMessage}</p>
		</div>
	</div>
{/snippet}

{#snippet subscribeForm()}
	<form
		onsubmit={handleSubmit}
		class="flex relative gap-2 justify-center items-start self-center max-w-full"
	>
		<label for="emailInput" class="sr-only">Your email address</label>
		<Input
			type="email"
			name="email"
			id="emailInput"
			bind:value={email}
			placeholder="Your email address"
			class="flex gap-2 items-center px-5 py-2.5 text-lg tracking-tight leading-loose  min-w-[240px] rounded-full w-[380px]"
			required
		>
			{#snippet button()}
				<Button type="submit" aria-label="Subscribe" class="rounded-full bg-primary">
					<ArrowRight class="w-6 h-6" />
				</Button>
			{/snippet}
		</Input>
	</form>
{/snippet}
