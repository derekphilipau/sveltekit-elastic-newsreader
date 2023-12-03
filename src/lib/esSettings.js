export const indexName = 'articles';

export const indexMapping = {
	mappings: {
		properties: {
			title: {
				type: 'text'
			},
			link: {
				type: 'keyword',
				index: false
			},
			slug: {
				type: 'keyword',
				index: false
			},
			guid: {
				type: 'keyword',
				index: false
			},
			description: {
				type: 'text'
			},
			subject: {
				type: 'keyword'
			},
			date: {
				type: 'date',
				format: "yyyy-MM-dd'T'HH:mm:ssXXX"
			},
			creator: {
				type: 'text'
			}
		}
	}
};
