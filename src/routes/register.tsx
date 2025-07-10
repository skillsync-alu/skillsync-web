import { createFileRoute } from "@tanstack/react-router";
import Register from "../pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "../config";

export const Route = createFileRoute("/register")({
  component: () => {
    return (
      <GoogleOAuthProvider clientId={config.google.clientId}>
        <Register />
      </GoogleOAuthProvider>
    );
  },
});
