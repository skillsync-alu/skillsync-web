import { config } from "../config";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import Cookies from "js-cookie";

/**
 * Retrieves the current authentication token from browser cookies
 * This function safely handles server-side rendering and missing cookies
 * Used by Apollo Client to authenticate GraphQL requests
 */
export const getUpdatedToken = (): string => {
  // Return empty string during server-side rendering
  if (typeof window === "undefined") {
    return "";
  }

  // Return empty string if no cookies available
  if (!window?.document?.cookie) {
    return "";
  }

  // Extract access token from cookies, fallback to empty string
  return Cookies.get(config.keys.access) || "";
};

// Apollo Link for adding authentication headers to all GraphQL requests
// This automatically attaches the JWT token to every API call
const authLink = new ApolloLink((operation, forward) => {
  // Get the current authentication token
  const token = getUpdatedToken();

  // Add Authorization header to the request if token exists
  operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
    headers: {
      ...headers,
      // Include Bearer token in Authorization header for API authentication
      Authorization: token ? `Bearer ${token}` : null,
    },
  }));

  return forward(operation);
});

// HTTP Link configuration for GraphQL endpoint
// Includes credentials for cookie-based authentication
const httpLink = new HttpLink({
  credentials: "include", // Include cookies in requests for session management
  uri: `${config.baseURL}/graphql`, // GraphQL endpoint URL
});

/**
 * Apollo Client instance configured for the SkillSync application
 * This client handles:
 * - GraphQL queries and mutations
 * - Automatic authentication via JWT tokens
 * - Caching for improved performance
 * - Cookie-based session management
 */
export const client = new ApolloClient({
  credentials: "include", // Include cookies for authentication
  link: authLink.concat(httpLink), // Chain auth and HTTP links
  cache: new InMemoryCache({ addTypename: false }), // Disable __typename field
});
