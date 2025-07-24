/**
 * Utility function to format strings for display by capitalizing words and handling special cases
 * This function is designed to convert camelCase/PascalCase strings into readable titles
 * and apply consistent formatting rules across the application
 * 
 * Features:
 * - Converts camelCase to spaced words (e.g., "firstName" → "First Name")
 * - Capitalizes the first letter of each word
 * - Replaces "and" with "&" for more compact display
 * - Handles empty/null inputs gracefully
 * 
 * @param input - String to be formatted and capitalized
 * @returns Formatted string with proper capitalization and spacing
 */
export const capitalize = (input: string) => {
  // Return empty string for falsy inputs
  if (!input) {
    return "";
  }

  return input
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters (camelCase → camel Case)
    .trim() // Remove leading/trailing whitespace
    .replace(/\band\b/gi, "&") // Replace "and" with "&" for more compact display
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
};
