import { search, getSearchParams } from '$lib/search';

/** @satisfies {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
	const params = getSearchParams(url.searchParams);
	return await search(params);
};
