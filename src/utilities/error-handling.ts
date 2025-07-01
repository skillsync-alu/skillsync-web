import { sleep } from "./sleep";
import {
  type ApolloQueryResult,
  type FetchResult,
  type QueryResult,
} from "@apollo/client";
import { toast, type ToastOptions } from "react-hot-toast";

export const handleResponseErrors = <T>(
  result: ApolloQueryResult<T> | FetchResult<T> | QueryResult<T, any>
) => {
  if (result.errors) {
    return result.errors.map(async error => {
      toast.error(
        (error.extensions?.exception as any)?.message || error.message
      );

      await sleep(500);
    });
  }

  if ((result as QueryResult).error?.graphQLErrors) {
    return (result as QueryResult).error?.graphQLErrors.map(async error => {
      toast.error(
        (error.extensions?.exception as any)?.message || error.message
      );

      await sleep(500);
    });
  }
};

export const handleErrorMessage = (error: any, options?: ToastOptions) => {
  return toast.error(getErrorMessage(error), options);
};

export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  if (error?.message === "Network Error") {
    return "Please check your network";
  }

  return error?.message || error;
};

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
