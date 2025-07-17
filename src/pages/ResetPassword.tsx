import { Link } from "@tanstack/react-router";
import { Logo } from "../assets";
import { useState } from "react";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              className="w-full px-4 py-3 rounded-xl font-medium text-base bg-main text-white shadow-sm hover:bg-main/90 transition-all duration-150 active:scale-[0.98]"
            >
              Reset password
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
