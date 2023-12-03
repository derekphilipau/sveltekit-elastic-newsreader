import { describe, it, expect, vi } from 'vitest';
import { Client } from '@elastic/elasticsearch';
import {
    initializeIndex,
    transformDocument,
    getDocuments,
    getDocumentById,
    upsertDocument
} from './es'; // Adjust the path as needed

// Mock the Elasticsearch client
vi.mock('@elastic/elasticsearch', () => ({
    Client: vi.fn(() => ({
        indices: {
            exists: vi.fn().mockResolvedValue(false),
            create: vi.fn().mockResolvedValue({})
        },
        search: vi.fn().mockResolvedValue({
            hits: {
                total: { value: 0 },
                hits: []
            }
        }),
        get: vi.fn().mockResolvedValue({
            _id: '1',
            _source: {}
        }),
        update: vi.fn().mockResolvedValue({})
    }))
}));

describe('Elasticsearch operations', () => {
    it('initializes index if it does not exist', async () => {
        await initializeIndex();
        expect(Client).toHaveBeenCalled();
    });

    it('transforms a document into a specific format', () => {
        const document = {
            title: 'Test Title',
            link: 'Test Link',
            slug: 'test-slug',
            guid: 'test-guid',
            description: 'Test Description',
            subject: 'Test Subject',
            date: '2023-01-01T00:00:00.000Z',
            creator: 'Test Creator'
        };
        const transformed = transformDocument('1', document);
        expect(transformed).toEqual({
            _id: '1',
            title: 'Test Title',
            link: 'Test Link',
            slug: 'test-slug',
            guid: 'test-guid',
            description: 'Test Description',
            subject: 'Test Subject',
            date: '2023-01-01T00:00:00.000Z',
            dateAgo: expect.any(String),
            creator: 'Test Creator'
        });
    });

    it('retrieves documents based on query and page', async () => {
        const result = await getDocuments(1, 'Test Query');
        expect(result).toEqual(expect.any(Object));
    });

    it('retrieves a document by ID', async () => {
        const result = await getDocumentById('1');
        expect(result).toEqual(expect.any(Object));
    });

    it('upserts a document into Elasticsearch', async () => {
        const document = {
            slug: 'test-slug',
            title: 'Test Title',
            // ... other document properties ...
        };
        await upsertDocument(document);
        expect(Client).toHaveBeenCalled();
    });
});
