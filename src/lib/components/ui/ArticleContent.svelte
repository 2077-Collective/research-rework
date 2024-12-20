<script lang="ts">
	const { content }: { content: string } = $props();
</script>

<div
	id="content-container"
	class="px-3 md:px-12 lg:px-0 pb-20 text-primary w-full lg:max-w-screen-md leading-8 flex flex-col
		[&>h1]:scroll-mt-32 [&>h2]:scroll-mt-32 [&>h3]:scroll-mt-32 [&>h4]:scroll-mt-32
		[&>h1]:text-5xl [&>h1]:font-medium [&>h1]:mb-6 [&>h1]:mt-16 [&_h1]:leading-58 [&_h1]:tracking-tighter
		[&>h2]:text-3xl [&>h2]:font-medium [&>h2]:mt-8 [&>h2]:mb-4 [&_h2]:leading-9 [&_h2]:tracking-tight
		[&>h3]:text-2xl [&>h3]:font-medium [&>h3]:mt-6 [&>h3]:mb-4 [&_h3]:leading-7 [&_h3]:tracking-tight
		[&>h4]:text-xl [&>h4]:font-medium [&>h4]:mb-3
		[&>p]:text-base md:[&>p]:text-lg [&_p]:leading-7 [&_p]:tracking-normal [&_p]:mb-4
		[&_p:has(img)]:mt-6 [&_p:has(img)]:mb-12 [&_p:has(img)]:text-xs [&_p:has(img)]:text-gray-400 [&_p:has(img)]:text-center
		[&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/50
		[&_strong]:font-semibold [&_strong]:leading-6 [&_strong]:tracking-normal [&_strong]:text-base
		[&_table]:mb-6 md:[&_table]:mb-8 [&_table]:w-full md:[&_table]:w-2/3
		[&_em]:leading-6 [&_em]:italic
		[&_ol]:flex [&_ol]:flex-col [&_ol]:gap-y-1 [&_ol]:mb-6 [&_ol]:ml-6 [&_ol]:text-lg [&_ol]:list-decimal [&_ol]:leading-7 [&_ol]:tracking-normal
		[&_ul]:flex [&_ul]:flex-col [&_ul]:gap-y-1 [&_ul]:mb-6 [&_ul]:ml-6 [&_ul]:text-lg [&_ul]:list-disc [&_ul]:leading-7 [&_ul]:tracking-normal
		[&>ul>li]:leading-8 [&>ul>li>p]:mb-0 [&>ol>li>p]:mb-0
		[&>a]:underline
		[&_img]:mx-auto [&_img]:block
		[&>blockquote]:text-base md:[&>blockquote]:text-lg [&>blockquote]:leading-7 [&>blockquote]:tracking-normal
		[&_blockquote]:border-l-4 [&_blockquote]:border-h-auto [&_blockquote]:border-gray-300 [&_blockquote]:pl-7
		[&_blockquote]:mb-4 [&_blockquote]:italic [&_blockquote>p:last-of-type]:mb-0
		[&_pre]:overflow-x-auto [&_code]:overflow-x-auto [&_code:not(pre_>_code)]:text-[#0312BF]"
>
	{@html content}
</div>
