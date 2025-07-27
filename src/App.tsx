import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import { RecoilRoot } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "./config/chakraTheme";
import ApiWakeUpModal from "./components/ApiWakeUpModal";
import { config } from "./config";
import { useEffect, useState } from "react";

// Create the router instance with auto-generated route tree
// defaultViewTransition enables smooth page transitions between routes
const router = createRouter({ routeTree, defaultViewTransition: true });

// TypeScript module declaration to register the router type
// This enables type-safe navigation throughout the application
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/**
 * Main App component that sets up all global providers and context
 * This component wraps the entire application with necessary providers for:
 * - State management (Recoil)
 * - GraphQL client (Apollo)
 * - Toast notifications (react-hot-toast)
 * - UI components (Chakra UI)
 * - Routing (TanStack Router)
 */
function App() {
  const [apiWaking, setApiWaking] = useState(false); // Start as false

  useEffect(() => {
    let cancelled = false;

    let showModalTimeout: NodeJS.Timeout;

    let finished = false;

    const pingApi = async () => {
      showModalTimeout = setTimeout(() => {
        if (!finished && !cancelled) {
          setApiWaking(true);
        }
      }, 1500);

      try {
        const res = await fetch(config.baseURL, { method: "GET" });

        if (!res.ok) {
          toast.error("API not healthy");
        }
      } catch (error) {
        toast.error("Something wrong happened while setting up Skillsync");
      } finally {
        finished = true;

        clearTimeout(showModalTimeout);

        if (!cancelled) {
          setApiWaking(false);
        }
      }
    };

    pingApi();

    return () => {
      cancelled = true;

      clearTimeout(showModalTimeout);
    };
  }, []);

  return (
    <>
      <ApiWakeUpModal open={apiWaking} />
      <RecoilRoot>
        <ApolloProvider client={client}>
          <Toaster
            position="top-center"
            toastOptions={{
              // Global toast notification styling and behavior configuration
              // These settings ensure consistent notification appearance across the app
              className: "",
              duration: 3_000, // Default 3 second display duration
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
              // Success notification styling with green accent
              success: {
                style: {
                  padding: "7px 7px 7px 12px",
                },
                iconTheme: {
                  primary: "#3b883e", // Green color for success icon
                  secondary: "#fff",
                },
              },
              // Error notification styling with red accent and longer duration
              error: {
                duration: 10_000, // Longer duration for error messages
                style: {
                  padding: "7px 7px 7px 12px",
                },
                iconTheme: {
                  primary: "#f77069", // Red color for error icon
                  secondary: "#333",
                },
              },
            }}
          />
          {/* Chakra UI provider for component library theming */}
          <ChakraProvider theme={chakraTheme}>
            {/* Router provider handles all page navigation and routing */}
            <RouterProvider router={router} />
          </ChakraProvider>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
