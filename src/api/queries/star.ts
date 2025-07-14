import { gql } from "@apollo/client";
import type { FilterInput, PaginationResponse } from "../../interfaces";
import type { User } from "../../interfaces/user";

export const GET_STARRED = gql`
  query getStarred($filter: FilterInput!) {
    getStarred(filter: $filter) {
      totalPages
      totalCount
      list {
        id
        createdAt
        updatedAt
        firstName
        lastName
        email
        bio
        username
        phoneCode
        skillsOfferred
        phoneNumber
        avatar
        type
        matcheeCount
        starrerCount
        isStarred
        isMatched
      }
    }
  }
`;

export interface GetStarredInput {
  filter: FilterInput;
}

export interface GetStarredResponse {
  getStarred: PaginationResponse<User>;
}
