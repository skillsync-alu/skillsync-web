/**
 * Utility function to create a delay/pause in async code execution
 * This function returns a Promise that resolves after the specified timeout
 * Commonly used for:
 * - Adding delays between API calls
 * - Spacing out error messages for better UX
 * - Simulating loading states in development
 * - Rate limiting operations
 * 
 * @param timeout - Number of milliseconds to wait before resolving
 * @returns Promise that resolves after the specified timeout
 */
export function sleep(timeout: number) {
  return new Promise(function (resolve, reject) {
    try {
      // Use setTimeout to create the delay
      setTimeout(resolve, timeout);
    } catch (error) {
      // Handle any potential errors (though unlikely with setTimeout)
      reject(error);
    }
  });
}
