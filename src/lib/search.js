import { getDocuments, getDocumentById } from './es';

/**
 * Searches for documents based on a given query and page number.
 * @async
 * @param {SearchParams} params - The search parameters.
 * @returns {Promise<Object>} A promise resolving to the search results.
 */
export async function search(params) {
	return await getDocuments(params);
}

/**
 * Retrieves a specific document by its unique identifier.
 * @async
 * @param {string} id - The unique identifier of the document.
 * @returns {Promise<Object|undefined>} A promise resolving to the retrieved document.
 */
export async function get(id) {
	return await getDocumentById(id);
}

/**
 * Represents search parameters from the querystring.
 * @param {URLSearchParams} params - The URLSearchParams object.
 */
export function getSearchParams(params) {
	const page = parseInt(params.get('p') || '1');
	const query = params.get('q') || '';
	const subject = params.get('subject') || '';
	const order = params.get('order') || '';
	return { page, query, subject, order };
}

/*
 * Represents a querystring from search parameters.
 * @param {Object} params - The search parameters.
 * @returns {string} The querystring.
 */
export function getQuerystring(params) {
	const { page, query, subject, order } = params;
	const newParams = []
	if (page) newParams.push(`p=${page}`);
	if (query) newParams.push(`q=${query}`);
	if (subject) newParams.push(`subject=${subject}`);
	if (order) newParams.push(`order=${order}`);
	return newParams.join('&');
}

/**
 * Represents a search URL from search parameters.
 * @param {Object} params - The search parameters.
 * @returns {string} The search URL.
 */
export function  getSearchUrl(params) {
	const querystring = getQuerystring(params);
	return `/?${querystring}`;
}