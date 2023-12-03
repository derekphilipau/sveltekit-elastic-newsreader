import { get } from '$lib/search';

/** @satisfies {import('./$types').PageServerLoad} */
export const load = async ({ params }) => {
	const article = await get(params.slug);
	return article;
};

