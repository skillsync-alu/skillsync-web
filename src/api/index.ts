import { config } from "../config";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import Cookies from "js-cookie";

export const getUpdatedToken = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  if (!window?.document?.cookie) {
    return "";
  }

  return Cookies.get(config.keys.access) || "";
};

const authLink = new ApolloLink((operation, forward) => {
  const token = getUpdatedToken();

  operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  credentials: "include",
  uri: `${config.baseURL}/graphql`,
});

export const client = new ApolloClient({
  credentials: "include",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
});
