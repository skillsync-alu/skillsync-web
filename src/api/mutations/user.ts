import { gql } from "@apollo/client";
import type { CreateUserInput } from "./authentication";
import type { FileInput } from "../../interfaces";
import type { User } from "../../interfaces/user";

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

export interface UpdateUserInput {
  input: Partial<
    {
      bio?: string;

      shouldRemoveAvatar?: boolean;

      avatarInput?: FileInput;

      skillsOfferred?: string[];

      skillsWanted?: string[];
    } & CreateUserInput["input"]
  >;
}

export interface UpdateUserResponse {
  updateUser: User;
}

export const GET_FIREBASE_CUSTOM_TOKEN = gql`
  mutation getFirebaseCustomToken {
    getFirebaseCustomToken
  }
`;

export interface GetFirebaseTokenResponse {
  getFirebaseCustomToken: string;
}
