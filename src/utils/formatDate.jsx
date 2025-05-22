import { format } from 'date-fns'

/**
 * Safely formats a date string into a readable format.
 * Converts 'YYYY-MM-DD HH:mm:ss' to a valid ISO format before parsing.
 *
 * @param {string} dateString - The raw date string (e.g., '2025-05-22 05:22:38')
 * @param {string} outputFormat - Desired output format (e.g., 'MMM dd, yyyy')
 * @returns {string} - Formatted date or fallback message
 */
export const formatDate = (dateString, outputFormat = 'MMM dd, yyyy') => {
  try {
    if (!dateString) return 'Invalid Date'
    const isoString = dateString.replace(' ', 'T') // Convert to ISO 8601
    return format(new Date(isoString), outputFormat)
  } catch (err) {
    console.error('Date formatting failed:', err)
    return 'Invalid Date'
  }
}
