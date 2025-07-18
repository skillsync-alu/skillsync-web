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

// Traditional Login Mutation
export const LOGIN_USER_TRADITIONAL = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

// Traditional Registration Mutation
export const CREATE_USER_TRADITIONAL = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      accessToken
      refreshToken
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

// Traditional Login Interfaces
export interface LoginUserInput {
  identifier: string; // email or username
  password: string;
}

export interface LoginUserResponse {
  loginUser: {
    accessToken: string;
    refreshToken: string;
  };
}

// Traditional Registration Interfaces
export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type?: UserType;
}

export interface CreateUserResponse {
  createUser: {
    accessToken: string;
    refreshToken: string;
  };
}

// Forgot Password Interfaces
export interface ForgotPasswordInput {
  identifier: string; // email or username
}

export interface ForgotPasswordResponse {
  forgotPassword: {
    message: string;
  };
}
