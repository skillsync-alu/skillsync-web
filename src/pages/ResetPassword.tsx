import { Link } from "@tanstack/react-router";
import { Logo } from "../assets";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD, REQUEST_OTP, type ResetPasswordInput, type ResetPasswordResponse, type RequestOtpResponse } from "../api/mutations/authentication";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { handleErrorMessage, handleResponseErrors } from "../utilities/error-handling";
import { useRef, useEffect } from "react";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [email, setEmail] = useState(""); // For resending OTP
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [resetPassword] = useMutation<ResetPasswordResponse, ResetPasswordInput>(RESET_PASSWORD);
  const [requestOtp] = useMutation<RequestOtpResponse, { input: { identifier: string } }>(REQUEST_OTP);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      handleErrorMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword({
        variables: { input: { code: otp, password } },
      });
      if (response.errors) {
        handleResponseErrors(response);
        setLoading(false);
        return;
      }
      if (response.data?.resetPassword?.message) {
        toast.success(response.data.resetPassword.message);
        setSubmitted(true);
      } else {
        toast.success("Your password has been reset successfully!");
        setSubmitted(true);
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      handleErrorMessage("Please enter your email or username to resend OTP.");
      return;
    }
    setResendLoading(true);
    try {
      const response = await requestOtp({ variables: { input: { identifier: email } } });
      if (response.errors) {
        handleResponseErrors(response);
        setResendLoading(false);
        return;
      }
      if (response.data?.requestOtp) {
        toast.success("OTP has been resent to your email.");
        setTimer(60);
      } else {
        handleErrorMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setResendLoading(false);
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
        <h1 className="text-2xl font-bold text-text mb-2">Reset Password</h1>
        <p className="text-sm text-textWeak mb-6 text-center">
          Enter the code sent to your email and choose a new password.
        </p>
        {/* Resend OTP Section */}
        <form className="w-full flex flex-col gap-2 mb-4" onSubmit={handleResendOtp}>
          <input
            type="text"
            placeholder="Email or username for OTP"
            className="w-full px-4 py-2 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={timer > 0 || resendLoading}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-xl font-medium text-sm bg-main text-white shadow-sm hover:bg-main/90 transition-all duration-150 disabled:opacity-60"
            disabled={timer > 0 || resendLoading}
          >
            {resendLoading ? <Spinner message="Resending OTP" /> : timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </button>
        </form>
        {/* End Resend OTP Section */}
        {submitted ? (
          <div className="w-full flex flex-col items-center">
            <p className="text-green text-center mb-4">
              Your password has been reset successfully!
            </p>
            <Link
              to="/login"
              className="text-main underline text-sm hover:text-main/80 transition-colors"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              required
              placeholder="Enter code (OTP)"
              className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="New password"
              className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-xl border border-lines bg-cardBgWeak text-text focus:outline-none focus:ring-2 focus:ring-main transition-all"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-xl font-medium text-base bg-main text-white shadow-sm hover:bg-main/90 transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
              disabled={loading}
            >
              {loading ? <Spinner message="Resetting password" /> : "Reset password"}
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

export default ResetPassword;
