import { getPerspectivesArticleBySlugMock } from '$lib/services/perspectives.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const article = await getPerspectivesArticleBySlugMock(params.slug);
	return { article };
};
