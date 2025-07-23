import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { config } from "../config";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  defaultUser,
  UnAuthorizedSessionState,
  userState,
} from "../resources/user";
import {
  GET_USER,
  type GetUserInput,
  type GetUserResponse,
} from "../api/queries/user";
import { useLazyQuery } from "@apollo/client";
import { type User, UserType } from "../interfaces/user";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { type CountryCode } from "libphonenumber-js";
import { currencyCountries } from "../constants";
import { removePersistentState } from "../utilities/implement-persist";
// import toast from "react-hot-toast";
// import { removePersistentState } from "../utilities/implement-persist";
// import { getFullName } from "../utilities/names";

// Create the authentication context with default values
// This will be provided at the app root and consumed by child components
export const WrapperContext = createContext<{
  isUser: boolean;
  isTutor: boolean;
  isLoggedIn: boolean;
  userCountry: CountryCode;
  handleLogout: () => void;
  handleGetUser: () => Promise<User | null>;
  handleAuthSuccess: (token: string) => Promise<void>;
}>({
  isUser: false,
  isTutor: false,
  isLoggedIn: false,
  userCountry: "RW",
  handleLogout: () => { },
  handleAuthSuccess: async () => { },
  handleGetUser: async () => defaultUser,
});

// Custom hook for accessing authentication context in components
// This makes it easy for any component to get auth state and functions
export const useWrapperContext = () => useContext(WrapperContext);

// Define which routes are accessible without authentication
// These are public pages that don't require users to be logged in
const paths = [
  "/register", // Registration page
  "/login", // Login page
  "/forgot-password", // Password reset request page - added this during auth implementation
  "/reset-password", // Password reset completion page - I added this during auth implementation
  "/404", // Not found page
];

const allowedPaths = ["/"].concat(paths);

// Helper function to check if current route is accessible without authentication
// This is used by the authentication guard logic below
const isAllowed = (path: string) => {
  if (!path) {
    return false;
  }

  return (
    allowedPaths.includes(path) ||
    paths.some(allowedPath => path.startsWith(allowedPath))
  );
};

// Main wrapper component that provides authentication context to the entire app
// This manages global authentication state and routing based on auth status
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Navigation hook for redirecting users based on authentication state
  const navigate = useNavigate();

  // State to track the currently logged-in user
  // This gets populated when a valid token is found or user logs in
  const [user, setUser] = useRecoilState(userState);

  const [isHandlingGlobalEffect, setIsHandlingGlobalEffect] = useState(false);

  const resetUser = useResetRecoilState(userState);

  const [path, setPath] = useRecoilState(UnAuthorizedSessionState);

  const resetPath = useResetRecoilState(UnAuthorizedSessionState);

  const [getUser] = useLazyQuery<GetUserResponse, GetUserInput>(GET_USER);

  // Try to get stored authentication token
  const token = Cookies.get(config.keys.access);

  const isLoggedIn = useMemo(() => {
    if (!token) {
      return false;
    }

    const payload = jwtDecode(token);

    if (!payload) {
      return false;
    }

    if (payload.exp) {
      return dayjs(payload.exp * 1000).isAfter(Date.now());
    }

    return true;
  }, [token]);

  const isUser = useMemo(() => {
    if (!user.id) {
      return false;
    }

    return user.type === UserType.User;
  }, [user]);

  const isTutor = useMemo(() => {
    if (!user.id) {
      return false;
    }

    return user.type === UserType.Tutor;
  }, [user]);

  const userCountry: CountryCode = useMemo(() => {
    if (!user.id) {
      return "RW";
    }

    return (
      (Object.entries(currencyCountries).find(
        ([, value]) => value === user.currency
      )?.[0] as CountryCode) || "RW"
    );
  }, [user]);

  const handleGetUser = async (inputToken?: string): Promise<User | null> => {
    try {
      const response = await getUser({
        context: {
          headers: { Authorization: `Bearer ${inputToken || token}` },
        },
      });

      if (response.error) {
        handleResponseErrors(response);

        return null;
      }

      if (!response.data?.getUser) {
        return null;
      }

      setUser(response.data.getUser);

      return response.data.getUser;
    } catch (error) {
      handleErrorMessage(error);

      return null;
    }
  };

  // Function to logout user and clear all authentication data
  // This removes tokens and redirects to public pages
  const handleLogout = () => {
    resetUser();

    // Remove the authentication token from cookies
    Cookies.remove(config.keys.access);

    window.location.replace("/login");
  };

  // Function to handle successful authentication from login/register forms
  // This stores the JWT token and decodes it to get user information
  const handleAuthSuccess = async (token: string) => {
    // Store the JWT token in cookies for persistence across browser sessions
    // httpOnly would be more secure but makes client-side access harder
    Cookies.set(config.keys.access, token);

    await handleGetUser(token);

    if (path) {
      const newpath = path;

      resetPath();

      removePersistentState(UnAuthorizedSessionState);

      navigate({ to: newpath });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  // Authentication guard effect - controls access to protected routes
  // This runs whenever the route changes to enforce authentication requirements
  useLayoutEffect(() => {
    setIsHandlingGlobalEffect(true);

    if (isLoggedIn) {
      if (!user.id) {
        handleGetUser();
      }
    } else {
      if (user.id) {
        handleLogout();
      } else {
        // If user is not logged in and trying to access a protected route
        if (!isAllowed(location.pathname)) {
          const search =
            Object.values(location.search).length > 0
              ? `?${new URLSearchParams(location.search).toString()}`
              : "";

          setPath(`${location.pathname}${search}`);
          navigate({ to: "/login" });
        }
      }
    }

    setIsHandlingGlobalEffect(false);
  }, []);

  useEffect(() => {
    window.scroll({ behavior: "smooth", top: 0 });

    if (document.readyState && !isHandlingGlobalEffect) {
      if (!isLoggedIn) {
        if (!isAllowed(location.pathname)) {
          const search =
            Object.values(location.search).length > 0
              ? `?${new URLSearchParams(location.search).toString()}`
              : "";

          setPath(`${location.pathname}${search}`);

          navigate({ to: "/login" });
        }
      }
    }
  }, [location.pathname]);

  return (
    <WrapperContext.Provider
      value={{
        isUser,
        isTutor,
        isLoggedIn,
        userCountry,
        handleGetUser,
        handleLogout,
        handleAuthSuccess,
      }}
    >
      {children}
    </WrapperContext.Provider>
  );
};

export default Wrapper;
