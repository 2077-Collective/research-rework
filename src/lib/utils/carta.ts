import { Carta } from 'carta-md';
import DOMPurify from 'isomorphic-dompurify';
import { math } from '@cartamd/plugin-math';
import { code } from '@cartamd/plugin-code';
import { anchor } from '@cartamd/plugin-anchor';

export const carta = new Carta({
	sanitizer: DOMPurify.sanitize,
	theme: 'github-light',
	shikiOptions: {
		themes: ['github-light']
	},

	extensions: [math(), code(), anchor()]
});
