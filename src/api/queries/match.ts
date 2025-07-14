import { gql } from "@apollo/client";
import type { FilterInput, PaginationResponse } from "../../interfaces";
import type { User } from "../../interfaces/user";

export const GET_MATCHERS = gql`
  query getMatchers($filter: FilterInput!) {
    getMatchers(filter: $filter) {
      totalPages
      totalCount
      list {
        id
        firstName
        lastName
        email
        username
        phoneCode
        phoneNumber
        bio
        avatar
        skillsOfferred
        isStarred
        isMatched
      }
    }
  }
`;

export interface GetMatchersInput {
  filter: FilterInput;
}

export interface GetMatchersResponse {
  getMatchers: PaginationResponse<User>;
}
