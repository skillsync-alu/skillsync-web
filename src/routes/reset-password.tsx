import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "../pages/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "../config";

export const Route = createFileRoute("/reset-password")({
  component: () => {
    return (
      <GoogleOAuthProvider clientId={config.google.clientId}>
        <ResetPassword />
      </GoogleOAuthProvider>
    );
  },
});
