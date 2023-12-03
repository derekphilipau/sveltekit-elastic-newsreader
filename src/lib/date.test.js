import { describe, it, expect, vi } from 'vitest';
import { timeAgo } from '$lib/date';
import { formatDistanceToNow } from 'date-fns';

// Mock the current date
const CURRENT_DATE = new Date('2023-04-01T12:00:00Z');
vi.useFakeTimers();
vi.setSystemTime(CURRENT_DATE);

describe('timeAgo', () => {
    it('returns the correct time ago for a valid past date', () => {
        const pastDate = new Date('2023-03-31T12:00:00Z');
        const expected = formatDistanceToNow(pastDate) + ' ago';
        expect(timeAgo(pastDate)).toBe(expected);
    });

    it('returns the correct time ago for a date string', () => {
        const dateString = '2023-03-31T12:00:00Z';
        const expected = formatDistanceToNow(new Date(dateString)) + ' ago';
        expect(timeAgo(dateString)).toBe(expected);
    });

    it('returns an empty string for an invalid date', () => {
        const invalidDate = 'not-a-date';
        expect(timeAgo(invalidDate)).toBe('');
    });
});
