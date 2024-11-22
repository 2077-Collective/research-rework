<script lang="ts">
	import FormInput from '$lib/components/ui/form-input/form-input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowLeft, LoaderCircle } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import type { SubmitFunction } from '@sveltejs/kit';
	import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';

	let isSubmitting = $state(false);
	let error = $state<string | null>(null);

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;
		error = null;

		return async ({ result }) => {
			if (result.type === 'success') {
				toast.success('Article submitted successfully!');
				const form = document.querySelector('form');
				if (form instanceof HTMLFormElement) {
					form.reset();
				}

				toast.success(
					'Article submitted successfully! You will receive an email with the review shortly.'
				);
			} else if (result.type === 'error') {
				console.log('SOMETHING WENT WRONG', result.error);

				toast.error(result.error.message || 'Something went wrong. Please try again.');
			}
			isSubmitting = false;
		};
	};
</script>

<div class="flex flex-col gap-1 mb-8 px-20">
	<a
		href="/"
		aria-label="Back to Home"
		class="flex justify-center items-center px-2 w-10 h-10 border border-solid rounded-full bg-background hover:bg-input mb-6"
	>
		<ArrowLeft class="w-6 h-6" />
	</a>
	<h1 class="font-soehne text-xl mb-3 md:text-4xl font-medium">
		Publish your article on 2077 Research
	</h1>
	<p class="text-lg">Submit your article to our review process and</p>
</div>

<form
	method="post"
	action="?/requestArticleReview"
	class="flex flex-col gap-6 container border-2 border-muted rounded-lg py-8 px-10"
	use:enhance={handleSubmit}
>
	<div class="flex flex-col gap-1">
		<h3 class="font-soehne text-xl">About the author</h3>
		<p class="text-muted-foreground">
			Provide your information so we can get back to you with the review.
		</p>
	</div>

	<div class="flex gap-4 w-full">
		<div class="flex flex-col gap-3 w-full">
			<Label for="name">Name</Label>
			<FormInput type="text" name="name" placeholder="Vitalik Buterin" required />
		</div>

		<div class="flex flex-col gap-3 w-full">
			<Label for="email">Email</Label>
			<FormInput type="email" name="email" placeholder="vitalik@ethereum.org" required />
		</div>
	</div>

	<div class="flex gap-4 w-full">
		<div class="flex flex-col gap-3 w-full">
			<Label for="telegram">Telegram</Label>
			<FormInput type="text" name="telegram" placeholder="vitalik.buterin" />
		</div>
		<div class="flex flex-col gap-3 w-full">
			<Label for="x">X</Label>
			<FormInput type="text" name="x" placeholder="vitalik.buterin" />
		</div>
		<div class="flex flex-col gap-3 w-full">
			<Label for="discord">Discord</Label>
			<FormInput type="text" name="discord" placeholder="vitalik#1234" />
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<h3 class="font-soehne text-xl mt-6">About the article</h3>
		<p class="text-muted-foreground">
			You can submit the article using a <b>public link</b> to <b>Google Docs</b> or pasting the
			content below using <b>Markdown</b> format.
		</p>
	</div>
	<div class="flex gap-4 w-full">
		<div class="flex flex-col gap-3 w-full">
			<Label for="articleTitle">Article Title</Label>
			<FormInput type="text" name="articleTitle" placeholder="The Future of Ethereum" required />
		</div>
		<div class="flex flex-col gap-3 w-full">
			<Label for="articleDescription">Article Description</Label>
			<FormInput
				type="text"
				name="articleDescription"
				placeholder="An in-depth analysis of the future of Ethereum"
				required
			/>
		</div>
	</div>
	<div class="flex flex-col gap-3 w-full">
		<Label for="linkToArticle">Link to Article</Label>
		<FormInput
			type="text"
			name="linkToArticle"
			placeholder="https://docs.google.com/document/d/..."
		/>
	</div>

	<div class="flex flex-col gap-3 w-full">
		<Label for="articleContent">Article Content</Label>
		<MarkdownEditor name="articleContent"></MarkdownEditor>
	</div>

	<div class="flex flex-col gap-3 w-full">
		<Label for="additionalNotes">Additional Notes</Label>
		<Textarea name="additionalNotes" placeholder="Anything else you want to add?"></Textarea>
	</div>

	<Button disabled={isSubmitting} type="submit" class="w-fit min-w-[150px] self-end">
		{#if isSubmitting}
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			Submit
		{/if}
	</Button>
</form>
