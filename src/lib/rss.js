import { parseStringPromise } from 'xml2js';

/**
 * Extracts the slug from a given URL.
 * @param {string} url - The URL from which to extract the slug.
 * @returns {string|null} The extracted slug or null if no slug could be found.
 */
export function extractSlugFromURL(url) {
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/').filter(segment => segment.length > 0);
    return pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : null;
}

/**
 * Fetches an RSS feed from a given URL and parses it into a structured format.
 * @async
 * @param {string} url - The URL of the RSS feed to fetch.
 * @returns {Promise<Object[]>} A promise that resolves to an array of articles.
 */
export async function fetchRSSFeed(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
		}
		const xmlData = await response.text();

		const result = await parseStringPromise(xmlData, {
			trim: true,
			normalize: true,
			explicitArray: false,
			mergeAttrs: true,
			ignoreAttrs: false,
			charkey: 'textContent'
		});

		let items = result.rss.channel.item;
		if (!Array.isArray(items)) {
			items = [items];
		}

		const articles = items.map((item) => ({
			title: item.title,
			link: item.link,
            slug: extractSlugFromURL(item.link),
			guid: item.guid.textContent,
			description: item.description,
			subject: item['dc:subject'],
			date: item['dc:date'],
			creator: item['dc:creator']
		}));

		return articles;
	} catch (error) {
		console.error(error);
		return [];
	}
}
