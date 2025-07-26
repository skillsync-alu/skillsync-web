import { createFileRoute } from "@tanstack/react-router";
import TermsAndConditions from "../pages/TermsAndConditions";

export const Route = createFileRoute("/terms")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TermsAndConditions />;
}
