import { initializeIndex, upsertDocument } from './es';
import { fetchRSSFeed } from './rss';

const rssUrls = ['https://www.propublica.org/feeds/propublica/main'];

/**
 * Synchronizes articles from given RSS feeds into an Elasticsearch index.
 * Initializes the index if not already set up, then fetches and upserts articles from the RSS URLs.
 * @async
 */
export async function sync() {
	await initializeIndex();
	for (const url of rssUrls) {
		try {
			const articles = await fetchRSSFeed(url);
			for (const article of articles) {
				await upsertDocument(article);
			}
		} catch (error) {
			console.error(error);
		}
	}
}
