import { formatDistanceToNow } from 'date-fns';

/**
 * Calculates the time passed since the given date and returns a string representing the relative time ago.
 * 
 * @param {Date|string} date - The date from which to calculate the time passed. Can be a Date object or a date string.
 * @returns {string} A string representing the time passed since the given date, followed by the word 'ago'.
 * If the input is invalid or parsing fails, an empty string is returned.
 */
export function timeAgo(date) {
	try {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		const timeAgo = formatDistanceToNow(dateObj);
		return `${timeAgo} ago`;
	} catch (error) {
		console.error(error);
	}
	return '';
}
