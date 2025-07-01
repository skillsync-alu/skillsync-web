import { Outlet, createRootRoute } from "@tanstack/react-router";
import Wrapper from "../components/Wrapper";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
