import { Link } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";
import { Logo } from "../assets";
import { useMutation } from "@apollo/client";
import {
  LOGIN_USER_SOCIAL,
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

const Login = () => {
  const { handleAuthSuccess } = useWrapperContext();

  const [loginUser, loginUserResult] = useMutation<
    SocialLoginResponse,
    SocialLoginInput
  >(LOGIN_USER_SOCIAL);

  const handleLoginUser = async (input: SocialLoginInput["input"]) => {
    try {
      const response = await loginUser({ variables: { input } });

      if (response.errors) {
        return handleResponseErrors(response);
      }

      if (!response.data?.loginUserBySocialMedia) {
        return;
      }

      handleAuthSuccess(response.data.loginUserBySocialMedia.accessToken);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async response => {
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
        {/* Google Button */}
        <button
          onClick={() => {
            if (loginUserResult.loading) {
              return;
            }
            return login();
          }}
          className="mt-2 w-full text-black flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-base ring-1 ring-lines bg-white text-text shadow-sm hover:bg-main hover:text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loginUserResult.loading}
        >
          <FcGoogle className="text-2xl" />
          {loginUserResult.loading ? (
            <Spinner message="Signing in" />
          ) : (
            "Continue with Google"
          )}
        </button>
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
