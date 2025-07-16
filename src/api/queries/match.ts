import { gql } from "@apollo/client";
import type { FilterInput, PaginationResponse } from "../../interfaces";
import type { User } from "../../interfaces/user";
import type { Match, MatchStatusType } from "../../interfaces/match";

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
        matcheeCount
        starrerCount
        matchId
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

export const GET_MATCHES = gql`
  query getMatches($filter: MatchFilterInput!) {
    getMatches(filter: $filter) {
      totalCount
      totalPages
      list {
        id
        matcher {
          id
          firstName
          lastName
          email
          username
          avatar
        }
        matchee {
          id
          firstName
          lastName
          email
          username
          avatar
        }
      }
    }
  }
`;

export interface GetMatchesInput {
  filter: { status?: MatchStatusType } & FilterInput;
}

export interface GetMatchesResponse {
  getMatches: PaginationResponse<Match>;
}
