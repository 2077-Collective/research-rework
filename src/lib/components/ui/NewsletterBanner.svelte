<script lang="ts">
	import Input from './input/input.svelte';
	import Button from './button/button.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let email: string = '';
	let csrfToken = '';
	let responseMessage = '';
	let isLoading = false;
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	async function fetchCsrfToken() {
		try {
			isLoading = true;

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);
			const response = await fetch(`${apiBaseUrl}/get-csrf-token/`, {
				signal: controller.signal,
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (!data.csrfToken) {
				throw new Error('CSRF token not found in response');
			}

			csrfToken = data.csrfToken;
		} catch (error: unknown) {
			console.error('CSRF token fetch error:', error);
			responseMessage = `Error fetching CSRF token: ${error instanceof Error ? error.message : 'Unknown error occurred'}`;
		} finally {
			isLoading = false;
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: {
					'X-CSRFToken': csrfToken
				},
				credentials: 'include'
			});

			if (response.ok) {
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

<div
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
		<p class="mt-2.5 text-lg max-md:max-w-full text-center">
			Get first-hand research delivered by our team of experts.
		</p>
		<form
			onsubmit={handleSubmit}
			action={`${apiBaseUrl}/newsletter/subscribe/`}
			class:opacity-50={isLoading}
			class="flex relative gap-2 justify-center items-start self-center mt-8 max-w-full"
		>
			<label for="emailInput" class="sr-only">Your email address</label>
			<Input
				type="email"
				name="email"
				id="emailInput"
				bind:value={email}
				placeholder="Your email address"
				disabled={isLoading}
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
		<p class="text-sm mt-2.5 max-md:max-w-full text-center">{responseMessage}</p>
	</div>
</div>
