import { gql } from "@apollo/client";
import type { CreateUserInput } from "./authentication";
import type { FileInput } from "../../interfaces";
import type { User } from "../../interfaces/user";

// GraphQL mutation for updating user profile information
// This allows users to modify their profile data including bio, avatar, and skills
// Used in profile editing forms and onboarding flows
export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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

// TypeScript interface for user update input
// Extends CreateUserInput with additional profile-specific fields
export interface UpdateUserInput {
  input: Partial<
    {
      bio?: string; // User biography/description
      shouldRemoveAvatar?: boolean; // Flag to remove current avatar
      avatarInput?: FileInput; // New avatar file upload
      skillsOfferred?: string[]; // Skills user can teach (for tutors)
      skillsWanted?: string[]; // Skills user wants to learn (for students)
    } & CreateUserInput // Inherits fields like firstName, lastName, email, etc.
  >;
}

export interface UpdateUserResponse {
  updateUser: User;
}

// GraphQL mutation to get Firebase custom authentication token
// This enables integration with Firebase services (like chat/messaging)
// while maintaining authentication through the main SkillSync backend
export const GET_FIREBASE_CUSTOM_TOKEN = gql`
  mutation getFirebaseCustomToken {
    getFirebaseCustomToken
  }
`;

export interface GetFirebaseTokenResponse {
  getFirebaseCustomToken: string; // Firebase custom token for client authentication
}
