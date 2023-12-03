import { getDocuments, getDocumentById } from './es';

/**
 * Searches for documents based on a given query and page number.
 * @async
 * @param {number} page - The current page number for pagination.
 * @param {string} query - The search query string.
 * @param {string} subject - The subject filter.
 * @param {string} order - The order filter.
 * @returns {Promise<Object>} A promise resolving to the search results.
 */
export async function search(page, query, subject, order) {
	return await getDocuments(page, query, subject, order);
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
