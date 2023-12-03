import { describe, it, expect, vi } from 'vitest';
import { parseStringPromise } from 'xml2js';
import { fetchRSSFeed, extractSlugFromURL } from './rss';

// Mocking the xml2js parseStringPromise function
vi.mock('xml2js', () => ({
    parseStringPromise: vi.fn().mockResolvedValue({
        rss: {
            channel: {
                item: [
                    // Example RSS feed items
                    {
                        title: 'Example Title',
                        link: 'https://example.com/article/example-title',
                        guid: { textContent: '12345' },
                        description: 'Example Description',
                        'dc:subject': 'Example Subject',
                        'dc:date': '2023-01-01T00:00:00.000Z',
                        'dc:creator': 'Example Creator'
                    }
                ]
            }
        }
    })
}));

// Mocking the global fetch function
global.fetch = vi.fn((url) =>
    Promise.resolve({
        ok: true,
        text: () => Promise.resolve('mocked rss feed content')
    })
);

describe('RSS Feed Functions', () => {
    it('extracts slug from a URL', () => {
        const url = 'https://example.com/article/example-title';
        expect(extractSlugFromURL(url)).toBe('example-title');
    });

    it('fetches and parses an RSS feed', async () => {
        const url = 'https://example.com/feed.xml';
        const articles = await fetchRSSFeed(url);

        expect(fetch).toHaveBeenCalledWith(url);
        expect(parseStringPromise).toHaveBeenCalledWith('mocked rss feed content', expect.any(Object));
        expect(articles).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Example Title',
                    link: 'https://example.com/article/example-title',
                    slug: 'example-title',
                    guid: '12345',
                    description: 'Example Description',
                    subject: 'Example Subject',
                    date: '2023-01-01T00:00:00.000Z',
                    creator: 'Example Creator'
                })
            ])
        );
    });
});
