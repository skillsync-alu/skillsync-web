import { Link } from "@tanstack/react-router";
import { Logo } from "../assets";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  FORGOT_PASSWORD,
  type ForgotPasswordInput,
  type ForgotPasswordResponse,
} from "../api/mutations/authentication";
import {
  handleErrorMessage,
} from "../utilities/error-handling";
import Spinner from "../components/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [forgotPassword, forgotPasswordResult] = useMutation<
    ForgotPasswordResponse,
    { input: ForgotPasswordInput }
  >(FORGOT_PASSWORD);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await forgotPassword({
        variables: {
          input: {
            identifier: email
          }
        }
      });

      if (response.data?.forgotPassword) {
        setSubmitted(true);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

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
        <h1 className="text-2xl font-bold text-text mb-2">Forgot Password</h1>
        <p className="text-sm text-textWeak mb-6 text-center">
          Enter your email address and we'll send you a code to reset your
          password.
        </p>
        {submitted ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-green text-center mb-4">
              If an account exists for{" "}
              <span className="font-semibold">{email}</span>, a reset code has
              been sent.
            </p>
            <Link
              to="/reset-password"
              className="text-main underline text-sm hover:text-main/80 transition-colors"
            >
              Enter your code
            </Link>
          </div>
        ) : (
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={forgotPasswordResult.loading}
              className="w-full px-4 py-3 rounded-xl font-medium text-base bg-main text-white shadow-sm hover:bg-main/90 transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
            >
              {forgotPasswordResult.loading ? (
                <Spinner message="Sending reset code" />
              ) : (
                "Send reset code"
              )}
            </button>
          </form>
        )}
        <div className="w-full flex items-center justify-center mt-4">
          <Link
            to="/login"
            className="text-main underline text-sm hover:text-main/80 transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
