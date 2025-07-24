import type { User } from "../interfaces/user";

/**
 * Utility function to format user's full name from user object
 * This function safely handles cases where names might be missing or incomplete
 * and returns a properly formatted display name for the UI
 * 
 * @param user - User object containing firstName and lastName properties
 * @returns Formatted full name string, empty string if no names available
 */
export const getFullName = (user: User) => {
  // Return empty string if user object is invalid or has no names
  if (!user || (!user.firstName && !user.lastName)) {
    return "";
  }

  // Combine first name with last name, handling cases where last name might be missing
  return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`;
};
