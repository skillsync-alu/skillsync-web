import { sleep } from "./sleep";
import {
  type ApolloQueryResult,
  type FetchResult,
  type QueryResult,
} from "@apollo/client";
import { toast, type ToastOptions } from "react-hot-toast";

/**
 * Handles GraphQL response errors from Apollo Client queries and mutations
 * This function processes different types of Apollo Client error responses and displays
 * user-friendly error messages using toast notifications
 * 
 * @param result - Apollo Client query/mutation result that may contain errors
 * @returns Array of promises that resolve after displaying error messages
 */
export const handleResponseErrors = <T>(
  result: ApolloQueryResult<T> | FetchResult<T> | QueryResult<T, any>
) => {
  // Handle direct GraphQL errors in the response
  if (result.errors) {
    return result.errors.map(async error => {
      // Display error message, preferring exception message over general message
      toast.error(
        (error.extensions?.exception as any)?.message || error.message
      );

      // Brief delay between multiple error messages for better UX
      await sleep(500);
    });
  }

  // Handle GraphQL errors from QueryResult objects
  if ((result as QueryResult).error?.graphQLErrors) {
    return (result as QueryResult).error?.graphQLErrors.map(async error => {
      toast.error(
        (error.extensions?.exception as any)?.message || error.message
      );

      await sleep(500);
    });
  }
};

/**
 * Displays error messages using toast notifications with user-friendly formatting
 * This function processes various error types and shows appropriate messages to users
 * 
 * @param error - Error object from API calls, network issues, or application errors
 * @param options - Optional toast configuration for styling and behavior
 * @returns Toast notification instance
 */
export const handleErrorMessage = (error: any, options?: ToastOptions) => {
  return toast.error(getErrorMessage(error), options);
};

/**
 * Extracts user-friendly error messages from various error object formats
 * This function handles different error structures and provides fallbacks
 * for consistent error message display across the application
 * 
 * @param error - Error object that may have different structures
 * @returns Formatted error message string for display to users
 */
export const getErrorMessage = (error: any): string => {
  // Handle API response errors with specific message format
  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  // Provide user-friendly message for network connectivity issues
  if (error?.message === "Network Error") {
    return "Please check your network";
  }

  // Fallback to error message or convert error to string
  return error?.message || error;
};

/**
 * Recursively extracts error messages from nested error objects
 * This function is useful for form validation errors and complex error structures
 * that may contain multiple nested error messages
 * 
 * @param errors - Nested error object with multiple error messages
 * @param path - Current path in the error object (used for recursion)
 * @returns Array of formatted error message strings
 */
export function extractErrorMessages(
  errors: Record<string, any>,
  path = ""
): string[] {
  let messages: string[] = [];

  for (const key in errors) {
    if (Array.isArray(errors[key])) {
      errors[key].forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          messages = messages.concat(
            extractErrorMessages(item, `${path}${key}[${index}].`)
          );
        } else if (typeof item === "string") {
          messages.push(`${path}${key}[${index}]: ${item}`);
        }
      });
    } else if (typeof errors[key] === "object" && errors[key] !== null) {
      messages = messages.concat(
        extractErrorMessages(errors[key], `${path}${key}.`)
      );
    } else if (typeof errors[key] === "string") {
      messages.push(errors[key]);
    }
  }

  return messages;
}
