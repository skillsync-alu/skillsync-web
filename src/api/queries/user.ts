import { gql } from "@apollo/client";
import type { User } from "../../interfaces/user";
import type { FilterInput, PaginationResponse } from "../../interfaces";

// GraphQL query to fetch user profile information
// Can fetch current user (no username) or any specific user by username
// Used in profile pages, user details, and public user views
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

// TypeScript interfaces for GET_USER query
export interface GetUserInput {
  username?: string; // Optional username to fetch specific user, omit for current user
}

export interface GetUserResponse {
  getUser: User;
}

// GraphQL query to fetch user engagement statistics
// Returns counts for matches, stars, and other engagement metrics
// Used in dashboard and profile pages to show user activity
export const GET_STATISTICS = gql`
  query {
    getStatistics {
      matcherCount
      matcheeCount
      starrerCount
    }
  }
`; 

export interface GetStatisticsResponse {
  getStatistics: User;
}

// GraphQL query to fetch available tutors with filtering and pagination
// Used in "Find Tutors" page to browse and search for tutoring services
// Includes match and star status for the current user
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
        matcheeCount
        starrerCount
      }
    }
  }
`;

// TypeScript interfaces for GET_TUTORS query
export interface GetTutorsInput {
  filter: FilterInput; // Filtering options (search, skills, pagination)
}

export interface GetTutorsResponse {
  getTutors: PaginationResponse<User>;
}
