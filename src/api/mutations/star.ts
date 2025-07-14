import { gql } from "@apollo/client";
import type { User } from "../../interfaces/user";

export const STAR_OR_UNSTAR = gql`
  mutation starOrUnstar($starred: ObjectId!) {
    starOrUnstar(starred: $starred) {
      id
      isStarred
    }
  }
`;

export interface StarInput {
  starred: string;
}

export interface StarResponse {
  starOrUnstar: User;
}
