// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			maxDuration: 300
		}),
		csp: {
			mode: 'auto',
			directives: {
				'script-src': [
					'self',
					'https://www.googletagmanager.com',
					'https://vercel.live',
					'https://va.vercel-scripts.com',
					'https://analytics.2077.xyz'
				],
				'style-src': ["'self'", "'unsafe-inline'"],
				'img-src': ["'self'", 'data:', 'https:'],
				'connect-src': ["'self'", 'https:'],
				// Add default-src as fallback
				'default-src': ["'self'"],
				// Add frame-ancestors to prevent clickjacking
				'frame-ancestors': ["'self'"],
				// Add base-uri to restrict base tags
				'base-uri': ["'self'"]
			}
		}
	}
};

export default config;
