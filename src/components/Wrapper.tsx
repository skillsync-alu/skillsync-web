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
//   import { GET_USER, GetUserInput, GetUserResponse } from "../api/queries/user";
//   import { useLazyQuery, useMutation } from "@apollo/client";
//   import { User, UserType } from "../interfaces/user";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { type CountryCode } from "libphonenumber-js";
import { currencyCountries } from "../constants";
import { getRandomColor } from "../utilities/random-colour";
//   import toast from "react-hot-toast";
//   import { removePersistentState } from "../utilities/implement-persist";
//   import { getFullName } from "../utilities/names";

// #TODO: change this to the correct type
type User = any;

// #TODO: change this to the correct type
enum UserType {
  User = "user",
  Tutor = "tutor",
}

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
  handleLogout: () => {},
  handleAuthSuccess: async () => {},
  handleGetUser: async () => defaultUser,
});

export const useWrapperContext = () => useContext(WrapperContext);

const allowedPaths = ["/register", "/login", "/404"];

const isAllowed = (path: string) => {
  if (!path) {
    return false;
  }

  return (
    allowedPaths.includes(path) ||
    allowedPaths.some(allowedPath => path.startsWith(allowedPath))
  );
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);

  const [isHandlingGlobalEffect, setIsHandlingGlobalEffect] = useState(false);

  const resetUser = useResetRecoilState(userState);

  const [path, setPath] = useRecoilState(UnAuthorizedSessionState);

  const resetPath = useResetRecoilState(UnAuthorizedSessionState);

  // const [getUser] = useLazyQuery<GetUserResponse, GetUserInput>(GET_USER);

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
      return "NG";
    }

    return (
      (Object.entries(currencyCountries).find(
        ([, value]) => value === user.currency
      )?.[0] as CountryCode) || "NG"
    );
  }, [user]);

  const handleGetUser = async (inputToken?: string): Promise<User | null> => {
    try {
      // const response = await getUser({
      //   context: { headers: { Authorization: `Bearer ${inputToken || token}` } }
      // });
      const response = {} as any;

      if (response.error) {
        handleResponseErrors(response);

        return null;
      }

      if (!response.data?.getUser) {
        return null;
      }

      const user = { ...response.data.getUser };

      if (!user.avatar) {
        user.avatar = getRandomColor();
      }

      setUser(user);

      return user;
    } catch (error) {
      handleErrorMessage(error);

      return null;
    }
  };

  const handleLogout = () => {
    resetUser();

    Cookies.remove(config.keys.access);

    window.location.replace("/login");
  };

  const handleAuthSuccess = async (token: string) => {
    Cookies.set(config.keys.access, token);

    await handleGetUser(token);

    if (path) {
      const newpath = path;

      resetPath();

      navigate({ to: newpath });
    } else {
      navigate({ to: "/" });
    }
  };

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
