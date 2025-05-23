import { format } from 'date-fns'

/**
 * Convert 'YYYY-MM-DD HH:mm:ss' to a valid ISO format before parsing.
 *
 * @param {string} dateString
 * @param {string} outputFormat 
 * @returns {string} 
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
