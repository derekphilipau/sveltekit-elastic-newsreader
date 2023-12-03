import { Client } from '@elastic/elasticsearch';
import { indexName, indexMapping } from './esSettings';
import { timeAgo } from './date';

import {
	SECRET_ELASTIC_USE_CLOUD,
	SECRET_ELASTIC_HOST,
	SECRET_ELASTIC_CLOUD_ID,
	SECRET_ELASTIC_CLOUD_USERNAME,
	SECRET_ELASTIC_CLOUD_PASSWORD
} from '$env/static/private';

const PAGE_SIZE = 10;

const clientConfig =
	SECRET_ELASTIC_USE_CLOUD === 'true'
		? {
				cloud: {
					id: SECRET_ELASTIC_CLOUD_ID || ''
				},
				auth: {
					username: SECRET_ELASTIC_CLOUD_USERNAME || '',
					password: SECRET_ELASTIC_CLOUD_PASSWORD || ''
				}
		  }
		: {
				node: SECRET_ELASTIC_HOST
		  };

const esclient = new Client(clientConfig);

/**
 * Initializes the Elasticsearch index if it doesn't exist.
 * @async
 */
export async function initializeIndex() {
	const indexExists = await esclient.indices.exists({ index: indexName });
	if (!indexExists) {
		await esclient.indices.create({
			index: indexName,
			body: indexMapping
		});
	}
}

/**
 * Transforms an Elasticsearch document into an object used by the system.
 * @param {string} id - The document's unique identifier.
 * @param {ElasticsearchArticleDocument} document - The original document.
 * @returns {ArticleDocument} The transformed document.
 */
export function transformDocument(id, document) {
	return {
		title: document.title,
		link: document.link,
		slug: document.slug,
		guid: document.guid,
		description: document.description,
		subject: document.subject,
		date: document.date,
		dateAgo: timeAgo(document.date),
		creator: document.creator
	};
}

/**
 * Retrieves documents from Elasticsearch based on the provided parameters.
 * @async
 * @param {SearchParams} params - The search parameters.
 * @returns {Promise<SearchResult>} An object containing search results and pagination info.
 */
export async function getDocuments(params) {
	let searchQuery = {};
	const sanitizedQuery = params.query?.trim();

	if (sanitizedQuery) {
		searchQuery = {
			bool: {
				must: {
					multi_match: {
						query: sanitizedQuery,
						fields: ['title^5', 'description^2', 'subject', 'creator']
					}
				}
			}
		};
	} else {
		searchQuery = {
			bool: {
				must: {
					match_all: {}
				}
			}
		};
	}

	if (params.subject && params.subject.trim() !== '') {
		searchQuery.bool = searchQuery.bool || {};
		searchQuery.bool.filter = [{ term: { subject: params.subject.trim() } }];
	}

	let sort = [{ date: { order: 'desc' } }];
	if (params.order && params.order.trim() === 'subject') {
		sort = [{ subject: { order: 'asc' }, date: { order: 'desc' } }];
	}

	const response = await esclient.search({
		index: indexName,
		body: {
			query: searchQuery,
			aggs: {
				subjects: {
					terms: {
						field: 'subject',
						size: 100
					}
				}
			},
			from: (params.page - 1) * PAGE_SIZE || 0,
			size: PAGE_SIZE,
			sort,
			track_total_hits: true
		}
	});

	let subjects = [];
	if (response?.aggregations?.subjects?.buckets) {
		subjects = response.aggregations.subjects.buckets
			.map((b) => ({
				key: b.key,
				doc_count: b.doc_count
			}))
			.filter((b) => b.key !== '');
	}

	if (!(response?.hits?.total?.value > 0)) {
		return {
			documents: [],
			aggregations: {
				subjects
			},
			meta: {
				params,
				count: 0,
				pages: 0,
				currentPage: 0
			}
		};
	}
	const docs = [];

	response.hits.hits.forEach((l) => {
		docs.push(transformDocument(l._id, l._source));
	});
	let count = response?.hits?.total || 0;
	if (typeof count !== 'number') count = count.value;
	return {
		documents: docs,
		aggregations: {
			subjects
		},
		meta: {
			params,
			count,
			pages: Math.ceil(count / PAGE_SIZE),
			currentPage: params.page
		}
	};
}

/**
 * Retrieves a single document by its ID from Elasticsearch.
 * @async
 * @param {string} id - The unique identifier of the document.
 * @returns {Promise<ArticleDocument|undefined>} The retrieved document or null if not found.
 */
export async function getDocumentById(id) {
	try {
		const result = await esclient.get({
			index: indexName,
			id
		});
		if (result?._id && result?._source) {
			return transformDocument(result._id, result._source);
		}
	} catch (error) {
		console.error(error);
	}
}

/**
 * Upserts a document into Elasticsearch.
 * @async
 * @param {ArticleDocument} document - The document to be upserted.
 * @returns {Promise<undefined>} True if the operation is successful.
 */
export async function upsertDocument(document) {
	const id = document.slug;
	await esclient.update({
		index: indexName,
		id,
		body: {
			doc: {
				title: document.title,
				link: document.link,
				slug: document.slug,
				guid: document.guid,
				description: document.description,
				subject: document.subject,
				date: document.date,
				creator: document.creator
			},
			doc_as_upsert: true
		},
		refresh: true
	});
}
