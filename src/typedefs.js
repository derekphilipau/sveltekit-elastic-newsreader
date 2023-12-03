/**
 * @typedef {Object} SearchParams
 * @property {number} page - The current page number.
 * @property {string} query - The search query.
 * @property {string} subject - The subject filter.
 * @property {string} order - The order filter.
 */

/**
 * @typedef {Object} ElasticsearchArticleDocument
 * @property {string} _id - The document's unique identifier.
 * @property {string} title - The title of the article.
 * @property {string} link - The link to the article. Not indexed in Elasticsearch.
 * @property {string} slug - A slug identifier for the article. Not indexed in Elasticsearch.
 * @property {string} guid - A unique identifier for the article. Not indexed in Elasticsearch.
 * @property {string} description - The description of the article.
 * @property {string} subject - The subject of the article.
 * @property {string} date - The publication date of the article in the format 'yyyy-MM-dd'T'HH:mm:ssXXX'.
 * @property {string} creator - The creator or author of the article.
 */

/**
 * @typedef {Object} ArticleDocument
 * @property {string} title - The title of the article.
 * @property {string} link - The link to the article. Not indexed in Elasticsearch.
 * @property {string} slug - A slug identifier for the article. Not indexed in Elasticsearch.
 * @property {string} guid - A unique identifier for the article. Not indexed in Elasticsearch.
 * @property {string} description - The description of the article.
 * @property {string} subject - The subject of the article.
 * @property {string} date - The publication date of the article in the format 'yyyy-MM-dd'T'HH:mm:ssXXX'.
 * @property {string} dateAgo - The publication date of the article in a human-readable format.
 * @property {string} creator - The creator or author of the article.
 */

/**
 * @typedef {Object} AggregationEntry
 * @property {string} key - The aggregation key.
 * @property {number} doc_count - The number of documents matching the aggregation.
 */

/**
 * @typedef {Object} SearchResult
 * @property {ArticleDocument[]} documents - An array of article documents.
 * @property {Object.<string, AggregationEntry[]>} aggregations - An object containing aggregated data, where each property is an array of aggregation entries.
 * @property {Object} meta - Metadata about the search results.
 * @property {SearchParams} meta.params - The search parameters used.
 * @property {number} meta.count - The total number of documents found.
 * @property {number} meta.pages - The total number of pages.
 * @property {number} meta.currentPage - The current page number.
 */
