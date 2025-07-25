import { useMemo, useEffect, createContext, useContext } from "react";
import { useWrapperContext } from "../components/Wrapper";
import TutorDashboard from "./TutorDashboard";
import Dashboard from "./Dashboard";
import { useLazyQuery } from "@apollo/client";
import {
  GET_STATISTICS,
  type GetStatisticsResponse,
} from "../api/queries/user";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { useRecoilState } from "recoil";
import { userStatisticsState } from "../resources/user";
import Progress from "../components/Progress";

// Context interface for dashboard-specific functions
// This allows child components to access dashboard functionality
interface MainDashboardContextType {
  handleGetStatistics: () => Promise<any>;
}

// Context for sharing dashboard state and functions with child components
// This enables statistics refresh functionality across the dashboard
const MainDashboardContext = createContext<MainDashboardContextType>({ 
  handleGetStatistics: async () => {} 
});

// Custom hook for accessing dashboard context in child components
export const useMainDashboardContext = () => useContext(MainDashboardContext);

/**
 * Main dashboard wrapper component that determines which dashboard to show
 * This component:
 * - Conditionally renders Tutor or Student dashboard based on user type
 * - Fetches and manages user statistics (matches, stars, etc.)
 * - Provides context for child components to refresh statistics
 * - Shows loading progress during data fetching
 */
const MainDashboard = () => {
  // Get user type to determine which dashboard component to render
  const { isTutor } = useWrapperContext();

  // Global state for user statistics (matches, stars, ratings)
  const [, setStats] = useRecoilState(userStatisticsState);

  // Lazy query for fetching user statistics on demand
  // This allows refreshing stats without full page reload
  const [getStatistics, getStatisticsResult] =
    useLazyQuery<GetStatisticsResponse>(GET_STATISTICS);

  // Function to fetch and update user statistics
  // This is shared with child components through context
  const handleGetStatistics = async () => {
    try {
      const response = await getStatistics();

      // Handle GraphQL errors
      if (response.error) {
        return handleResponseErrors(response);
      }

      // Ensure we received valid statistics data
      if (!response.data?.getStatistics) {
        return;
      }

      // Update global state with fetched statistics
      setStats(response.data.getStatistics as any);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  // Memoized component selection based on user type
  // Tutors see different dashboard features than students
  const Component = useMemo(() => {
    return () => {
      if (isTutor) {
        return <TutorDashboard />; // Dashboard for tutors offering services
      }

      return <Dashboard />; // Dashboard for students seeking tutors
    };
  }, [isTutor]);

  // Fetch initial statistics when component mounts
  useEffect(() => {
    handleGetStatistics();
  }, []);

  return (
    <MainDashboardContext.Provider value={{ handleGetStatistics }}>
      <Component />
      {/* Global loading indicator for statistics fetching */}
      <Progress loading={getStatisticsResult.loading} />
    </MainDashboardContext.Provider>
  );
};

export default MainDashboard;
