import { gql } from "@apollo/client";
import type { User } from "../../interfaces/user";
import type { FilterInput, PaginationResponse } from "../../interfaces";

export const GET_USER = gql`
  query getUser($username: String) {
    getUser(username: $username) {
      id
      createdAt
      updatedAt
      firstName
      lastName
      email
      bio
      username
      phoneCode
      phoneNumber
      avatar
      type
      skillsOfferred
      skillsWanted
    }
  }
`;

export interface GetUserInput {
  username?: string;
}

export interface GetUserResponse {
  getUser: User;
}

export const GET_TUTORS = gql`
  query getTutors($filter: FilterInput!) {
    getTutors(filter: $filter) {
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

export interface GetTutorsInput {
  filter: FilterInput;
}

export interface GetTutorsResponse {
  getTutors: PaginationResponse<User>;
}
