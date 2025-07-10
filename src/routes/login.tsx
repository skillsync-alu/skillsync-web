import { createFileRoute } from "@tanstack/react-router";
import Login from "../pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "../config";

export const Route = createFileRoute("/login")({
  component: () => {
    return (
      <GoogleOAuthProvider clientId={config.google.clientId}>
        <Login />
      </GoogleOAuthProvider>
    );
  },
});
