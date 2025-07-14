import { gql } from "@apollo/client";
import type { UserType } from "../../interfaces/user";
import type { LoginResponse } from "../../interfaces";
import type { CountryCode } from "libphonenumber-js";

export const CREATE_USER_SOCIAL = gql`
  mutation createUserBySocialMedia($input: SocialLoginInput!) {
    createUserBySocialMedia(input: $input) {
      accessToken
    }
  }
`;

export const LOGIN_USER_SOCIAL = gql`
  mutation loginUserBySocialMedia($input: SocialLoginInput!) {
    loginUserBySocialMedia(input: $input) {
      accessToken
    }
  }
`;

export enum SocialLoginType {
  Google = "Google",
}

export interface SocialLoginInput {
  input: {
    token?: string;

    userType?: UserType;

    type: SocialLoginType;
  };
}

export interface SocialLoginResponse {
  loginUserBySocialMedia: LoginResponse;

  createUserBySocialMedia: LoginResponse;
}

export interface CreateUserInput {
  input: {
    firstName: string;

    lastName: string;

    username?: string;

    email: string;

    phoneNumber?: string;

    referredBy?: string;

    type?: UserType;

    phoneCode?: CountryCode;
  };
}
