import { gql } from "@apollo/client";
import type { Match, MatchStatusType } from "../../interfaces/match";
import type { AuthResponse } from "../../interfaces";

export const CREATE_MATCH = gql`
  mutation createMatch($matcher: ObjectId!) {
    createMatch(matcher: $matcher) {
      id
      matcher {
        id
      }
    }
  }
`;

export interface CreateMatchInput {
  matcher: string;
}

export interface CreateMatchResponse {
  createMatch: Match;
}

export const UPDATE_MATCH_STUDENT = gql`
  mutation updateMatchAsStudent($input: UpdateMatchInput!) {
    updateMatchAsStudent(input: $input) {
      id
      status
    }
  }
`;

export const UPDATE_MATCH_TUTOR = gql`
  mutation updateMatchAsTutor($input: UpdateMatchInput!) {
    updateMatchAsTutor(input: $input) {
      id
      status
    }
  }
`;

export interface UpdateMatchInput {
  input: { id: string; matchStatus: MatchStatusType; details?: string };
}

export interface UpdateMatchResponse {
  updateMatchAsStudent: Match;
  updateMatchAsTutor: Match;
}


export const FIND_MATCHERS = gql`
mutation {
  findMatchers {
    success
    message
  }
}
`

export interface FindMatchersResponse {
  findMatchers: AuthResponse;
}

export const FIND_MATCHEES = gql`
mutation {
  findMatchees {
    success
    message
  }
}
`

export interface FindMatcheesResponse {
  findMatchees: AuthResponse;
}