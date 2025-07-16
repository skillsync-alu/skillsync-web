import { gql } from "@apollo/client";
import type { Match, MatchStatusType } from "../../interfaces/match";

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

export interface UpdateMatchInput {
  input: { id: string; matchStatus: MatchStatusType; details?: string };
}

export interface UpdateMatchResponse {
  updateMatchAsStudent: Match;
}
