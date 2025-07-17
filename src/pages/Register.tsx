import { useMemo, useState } from "react";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { BsPersonVideo } from "react-icons/bs";
import { LuInfo } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import { Logo } from "../assets";
import { UserType } from "../interfaces/user";
import { useMutation } from "@apollo/client";
import {
  CREATE_USER_SOCIAL,
  SocialLoginType,
  type SocialLoginInput,
  type SocialLoginResponse,
} from "../api/mutations/authentication";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { useWrapperContext } from "../components/Wrapper";
import { useGoogleLogin } from "@react-oauth/google";
import Spinner from "../components/Spinner";
import { FiUserCheck } from "react-icons/fi";

const Register = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { handleAuthSuccess, isLoggedIn } = useWrapperContext();

  const initialRole = useMemo(() => {
    const query = new URLSearchParams(location.search);

    if (!query) {
      return UserType.User;
    }

    const userType = query.get("userType") as keyof typeof UserType;

    if (!userType) {
      return UserType.User;
    }

    return UserType[userType];
  }, [location.search]);

  const [role, setRole] = useState<UserType>(initialRole);

  const [agreed, setAgreed] = useState(false);

  const [createUser, createUserResult] = useMutation<
    SocialLoginResponse,
    SocialLoginInput
  >(CREATE_USER_SOCIAL);

  const handleCreateUser = async (input: SocialLoginInput["input"]) => {
    try {
      const response = await createUser({ variables: { input } });

      if (response.errors) {
        return handleResponseErrors(response);
      }

      if (!response.data?.createUserBySocialMedia) {
        return;
      }

      handleAuthSuccess(response.data.createUserBySocialMedia.accessToken);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async response => {
      await handleCreateUser({
        userType: role,
        type: SocialLoginType.Google,
        token: response.access_token,
      });
    },

    onError: error => {
      handleErrorMessage(error.error_description);
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bodyBg px-2">
      {/* Already logged in banner */}
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
      <Link to="/" className="mb-8 flex items-center gap-2 select-none">
        <img src={Logo} className="h-10 w-10" alt="Skillsync logo" />
        <span className="text-2xl font-semibold text-main">Skillsync</span>
      </Link>
      {/* Card */}
      <div className="w-full max-w-md bg-cardBg shadow-lg rounded-2xl px-8 py-10 flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-text mb-2">
          Create your account
        </h1>
        <p className="text-sm text-textWeak mb-6 text-center">
          Empower your learning journey with Skillsync
        </p>
        {/* Role Switch */}
        <div className="w-full flex flex-col items-center mb-6">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs text-textWeak font-medium">
              Sign up as
            </span>
            <LuInfo
              className="text-textWeak text-xs cursor-pointer"
              title="Choose whether you want to join as a student or a tutor."
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-colors text-sm font-medium border ${role === UserType.User ? "bg-main text-white border-main shadow" : "bg-cardBgWeak text-textWeak border-lines"} focus:outline-none`}
              onClick={() => setRole(UserType.User)}
              aria-pressed={role === UserType.User}
            >
              <PiGraduationCapDuotone className="text-lg" /> Student
            </button>
            <button
              type="button"
              className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-colors text-sm font-medium border ${role === UserType.Tutor ? "bg-main text-white border-main shadow" : "bg-cardBgWeak text-textWeak border-lines"} focus:outline-none`}
              onClick={() => setRole(UserType.Tutor)}
              aria-pressed={role === UserType.Tutor}
            >
              <BsPersonVideo className="text-lg" /> Tutor
            </button>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-lines my-4" />
        {/* Terms & Conditions */}
        <div className="w-full flex flex-col items-start mb-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-textWeak">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="accent-main w-5 h-5 rounded border-lines focus:ring-main transition-all duration-150"
            />
            <span>
              I agree to the{" "}
              <a
                href="#"
                className="underline text-main hover:text-main/80 transition-colors"
              >
                Terms & Conditions
              </a>
            </span>
          </label>
        </div>
        {/* Google Button */}
        <button
          className="mt-4 w-full text-black flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-base ring-1 ring-lines bg-white shadow-sm hover:bg-main hover:text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!agreed}
          onClick={() => {
            if (!agreed) {
              return;
            }

            return login();
          }}
        >
          <FcGoogle className="text-2xl" />
          {createUserResult.loading ? (
            <Spinner message="Signing up" />
          ) : (
            "Continue with Google"
          )}
        </button>
        {/* Divider */}
        <div className="w-full border-t border-lines my-6" />
        {/* Email/Password Form */}
        <form className="w-full flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-1/2 px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl font-medium text-base bg-main text-white shadow-sm hover:bg-main/90 transition-all duration-150 active:scale-[0.98]"
          >
            Sign up
          </button>
        </form>
        {/* Login link */}
        <div className="w-full flex items-center justify-center mt-4">
          <span className="text-sm text-textWeak">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="ml-1 text-main underline text-sm hover:text-main/80 transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
      {/* Footer */}
      <p className="text-xs text-textWeak mt-8 text-center max-w-xs">
        By signing up, you help build a community of practical skills and
        mentorship across Africa.
      </p>
    </div>
  );
};

export default Register;
