import { gql } from "@apollo/client";
import type { UserType } from "../../interfaces/user";
import type { LoginResponse } from "../../interfaces";

// GraphQL mutation for creating a new user account through social media (Google OAuth)
// This handles the registration flow when users sign up with their Google account
export const CREATE_USER_SOCIAL = gql`
  mutation createUserBySocialMedia($input: SocialLoginInput!) {
    createUserBySocialMedia(input: $input) {
      accessToken
    }
  }
`;

// GraphQL mutation for logging in existing users through social media (Google OAuth)
// This handles the login flow when users sign in with their existing Google account
export const LOGIN_USER_SOCIAL = gql`
  mutation loginUserBySocialMedia($input: SocialLoginInput!) {
    loginUserBySocialMedia(input: $input) {
      accessToken
    }
  }
`;

// GraphQL mutation for traditional email/password login
// This is implemented for users who prefer not to use Google OAuth
// Backend expects identifier (email) and password, returns both access and refresh tokens
export const LOGIN_USER_TRADITIONAL = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

// GraphQL mutation for traditional email/password registration
// This allows users to create accounts manually instead of using Google
// Backend creates the user and immediately returns tokens for auto-login
export const CREATE_USER_TRADITIONAL = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

// GraphQL mutation for password reset requests
// Users enter their email and backend sends them a reset link/OTP
// Note: Backend OTP functionality may still be in development
export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
    }
  }
`;

export enum SocialLoginType {
  Google = "Google",
  // Could be extended for Facebook, Twitter, etc. in the future
}

// TypeScript interfaces for social media authentication
// These define the shape of data sent to and received from social auth APIs
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

// TypeScript interfaces for traditional email/password login
// identifier can be either email or username (backend is flexible)
export interface LoginUserInput {
  identifier: string; // email or username
  password: string;
}

export interface LoginUserResponse {
  loginUser: {
    accessToken: string;
    refreshToken: string; // Used for maintaining longer sessions
  };
}

// TypeScript interfaces for traditional registration
// All fields match what the backend CreateUserInput expects
export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type?: UserType; // Student or Tutor - affects user capabilities in the app
}

export interface CreateUserResponse {
  createUser: {
    accessToken: string;
    refreshToken: string;
  };
}

// TypeScript interfaces for password reset flow
// identifier allows users to reset using email or username
export interface ForgotPasswordInput {
  identifier: string; // email or username
}

export interface ForgotPasswordResponse {
  forgotPassword: {
    message: string;
  };
}

// GraphQL mutation for completing password reset
// Users use the token/OTP they received to set a new password
// Note: This frontend is ready but backend reset flow may need completion
export const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`;

// TypeScript interfaces for completing password reset
// token comes from email/SMS, newPassword is what user wants to set
export interface ResetPasswordInput {
  input: { code: string; password: string };
}

export interface ResetPasswordResponse {
  resetPassword: { message: string }; // Indicates if password was successfully reset
}
// Request otp mutation
export const REQUEST_OTP = gql`
  mutation requestOtp($input: ForgotPasswordInput!) {
    requestOtp(input: $input)
  }
`;
// Request otp interfaces
export interface RequestOtpResponse {
  requestOtp: boolean;
}
