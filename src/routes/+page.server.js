import { search } from '$lib/search';

/** @satisfies {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
	const p = parseInt(url.searchParams.get('p') || '1');
	const q = url.searchParams.get('q');
	const subject = url.searchParams.get('subject');
	const order = url.searchParams.get('order');
	return await search(p, q, subject, order);
};
