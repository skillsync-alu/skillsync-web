import { createFileRoute } from "@tanstack/react-router";
import MainDashboard from "../pages/MainDashboard";

export const Route = createFileRoute("/dashboard")({
  component: MainDashboard,
});
