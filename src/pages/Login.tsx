import { Link, useNavigate } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import { Logo } from "../assets";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  LOGIN_USER_SOCIAL,
  SocialLoginType,
  type SocialLoginInput,
  type SocialLoginResponse,
  LOGIN_USER_TRADITIONAL,
  type LoginUserInput,
  type LoginUserResponse,
} from "../api/mutations/authentication";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { useWrapperContext } from "../components/Wrapper";
import { useGoogleLogin } from "@react-oauth/google";
import Spinner from "../components/Spinner";
import { FiUserCheck } from "react-icons/fi";

const Login = () => {
  // Navigation hook for redirecting users after successful login
  const navigate = useNavigate();

  // Get authentication context - this manages global login state
  // handleAuthSuccess stores the token and updates user state across the app
  const { handleAuthSuccess, isLoggedIn } = useWrapperContext();

  // State for traditional login form - tracks email and password inputs
  // I added this to support email/password login alongside Google OAuth
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Apollo mutation hook for Google OAuth login
  // This connects to the existing social media login backend API
  const [loginUser, loginUserResult] = useMutation<
    SocialLoginResponse,
    SocialLoginInput
  >(LOGIN_USER_SOCIAL);

  // Apollo mutation hook for traditional email/password login
  // This is the new functionality implemented for traditional authentication
  const [loginTraditional, loginTraditionalResult] = useMutation<
    LoginUserResponse,
    { input: LoginUserInput }
  >(LOGIN_USER_TRADITIONAL);

  // Handles Google OAuth login flow
  // This was already working before I started - handles the social login
  const handleLoginUser = async (input: SocialLoginInput["input"]) => {
    try {
      const response = await loginUser({ variables: { input } });

      // Check for GraphQL errors in the response
      if (response.errors) {
        return handleResponseErrors(response);
      }

      // Ensure we got a valid access token back
      if (!response.data?.loginUserBySocialMedia) {
        return;
      }

      // Store the token and redirect user to the main app
      handleAuthSuccess(response.data.loginUserBySocialMedia.accessToken);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  // This handles the traditional email/password login
  // It connects to the backend loginUser mutation and manages loading states
  const handleTraditionalLogin = async (e: React.FormEvent) => {
    // Prevent default form submission to handle it with GraphQL
    e.preventDefault();

    try {
      // Call the GraphQL mutation with user credentials
      const response = await loginTraditional({
        variables: {
          input: {
            identifier: formData.email, // Backend accepts email or username
            password: formData.password,
          },
        },
      });

      // Ensure we got valid tokens back from the server
      if (response.data?.loginUser?.accessToken) {
        // Store the access token and redirect user to the main app
        // The refresh token is automatically handled by Apollo/auth context
        handleAuthSuccess(response.data.loginUser.accessToken);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  // Google OAuth configuration and login trigger
  // This integrates with Google's OAuth service using the react-oauth library
  const login = useGoogleLogin({
    onSuccess: async response => {
      // When Google login succeeds, pass the access token to our backend
      await handleLoginUser({
        type: SocialLoginType.Google,
        token: response.access_token,
      });
    },

    onError: error => {
      handleErrorMessage(error.error_description);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bodyBg px-2 relative overflow-hidden">
      {/* Redirect logged-in users to main app */}
      {isLoggedIn && (
        <div className="w-full mt-3 max-w-md bg-cardBg border border-mainWeak text-text rounded-2xl px-6 py-4 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-lg z-20 text-center sm:text-left">
          <div className="flex items-center justify-center bg-mainWeak2 text-main rounded-full p-2">
            <FiUserCheck className="text-2xl" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="font-semibold text-base">
              You’re already logged in
            </span>
            <span className="text-sm text-textWeak">
              You can go straight to your dashboard.
            </span>
            <button
              className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 bg-main text-white rounded-xl font-medium shadow hover:bg-main/90 transition"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              Go to dashboard
            </button>
          </div>
        </div>
      )}
      {/* Background Logo */}
      <img
        src={Logo}
        className="size-[400px] absolute bottom-0 left-0 max-2xl:-bottom-20 max-2xl:-left-20 saturate-0 opacity-[.03] pointer-events-none select-none"
        alt="Skillsync background logo"
      />
      {/* Logo at the top */}
      <Link to="/" className="mb-8 flex items-center gap-2 select-none z-10">
        <img src={Logo} className="h-10 w-10" alt="Skillsync logo" />
        <span className="text-2xl font-semibold text-main">Skillsync</span>
      </Link>
      {/* Card */}
      <div className="w-full max-w-md bg-cardBg shadow-lg rounded-2xl px-8 py-10 flex flex-col items-center z-10">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-text mb-2">Welcome back</h1>
        <p className="text-sm text-textWeak mb-6 text-center">
          Log in to continue your learning journey with Skillsync
        </p>
        {/* Google OAuth login button */}
        {/* This was the original login method before traditional auth was added */}
        <button
          onClick={() => {
            if (loginUserResult.loading) {
              return;
            }
            return login();
          }}
          className="mt-2 w-full text-black flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-base ring-1 ring-lines bg-white shadow-sm hover:bg-main hover:text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loginUserResult.loading}
        >
          <FcGoogle className="text-2xl" />
          {loginUserResult.loading ? (
            <Spinner message="Signing in" />
          ) : (
            "Continue with Google"
          )}
        </button>
        {/* Divider */}
        <div className="w-full border-t border-lines my-6" />
        {/* Traditional email/password login form */}
        <form
          onSubmit={handleTraditionalLogin}
          className="w-full flex flex-col gap-4"
        >
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={e =>
              setFormData(prev => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={e =>
              setFormData(prev => ({ ...prev, password: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
            required
          />
          <button
            type="submit"
            disabled={loginTraditionalResult.loading}
            className="w-full px-4 py-3 rounded-xl font-medium text-base bg-main text-white shadow-sm hover:bg-main/90 transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
          >
            {loginTraditionalResult.loading ? (
              <Spinner message="Logging in" />
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <div className="w-full flex items-center justify-end mt-2">
          <Link
            to="/forgot-password"
            className="text-main underline text-sm hover:text-main/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        {/* Sign up link */}
        <div className="w-full flex items-center justify-center mt-4">
          <span className="text-sm text-textWeak">Don't have an account?</span>
          <Link
            to="/register"
            className="ml-1 text-main underline text-sm hover:text-main/80 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
      {/* Footer */}
      <p className="text-xs text-textWeak mt-8 text-center max-w-xs z-10">
        Empower your learning journey with Skillsync.
      </p>
    </div>
  );
};

export default Login;
