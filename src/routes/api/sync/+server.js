import { text } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { sync } from '$lib/sync';

const SECRET_KEY = '9Fl48lvMx4hED3MV4RqKQaKs76xOR3';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const secret = url.searchParams.get('secret');
    if (secret !== SECRET_KEY) {
        throw error(401, 'Unauthorized');
    }
    try {
        await sync();
        return new Response(String('success'));
    } catch (err) {
        throw error(500, 'Sync failed');
    }
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}