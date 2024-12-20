import { fetchPerspectivesMetadataMock } from '$lib/services/perspectives.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const articles = await fetchPerspectivesMetadataMock();

	return {
		articles
	};
};
