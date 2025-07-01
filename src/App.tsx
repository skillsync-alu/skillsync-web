import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";

const router = createRouter({ routeTree, defaultViewTransition: true });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Toaster
          position="top-center"
          toastOptions={{
            // Define default options
            className: "",
            duration: 3_000,
            style: {
              background: "#333333",
              color: "#eceae5",
              fontSize: "14px",
              fontWeight: "500",
              padding: "7px",
              borderRadius: "12px",
              backdropFilter: "blur(5px)",
              border: "0px solid #32323200",
            },
            success: {
              style: {
                padding: "7px 7px 7px 12px",
              },
              iconTheme: {
                primary: "#3b883e",
                secondary: "#fff",
              },
            },
            error: {
              duration: 10_000,
              style: {
                padding: "7px 7px 7px 12px",
              },
              iconTheme: {
                primary: "#f77069",
                secondary: "#333",
              },
            },
          }}
        />

        <RouterProvider router={router} />
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default App;
