import { createFileRoute } from "@tanstack/react-router";
import FindTutors from "../pages/FindTutors";

export const Route = createFileRoute("/find_tutors")({
  component: () => <FindTutors />,
});
