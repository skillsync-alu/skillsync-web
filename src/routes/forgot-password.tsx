import { createFileRoute } from "@tanstack/react-router";
import ForgotPassword from "../pages/ForgotPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "../config";

export const Route = createFileRoute("/forgot-password")({
  component: () => {
    return (
      <GoogleOAuthProvider clientId={config.google.clientId}>
        <ForgotPassword />
      </GoogleOAuthProvider>
    );
  },
});
