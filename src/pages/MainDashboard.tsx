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

const MainDashboardContext = createContext<{
  handleGetStatistics: () => Promise<any>;
}>({ handleGetStatistics: async () => {} });

export const useMainDashboardContext = () => useContext(MainDashboardContext);

const MainDashboard = () => {
  const { isTutor } = useWrapperContext();

  const [, setStats] = useRecoilState(userStatisticsState);

  const [getStatistics, getStatisticsResult] =
    useLazyQuery<GetStatisticsResponse>(GET_STATISTICS);

  const handleGetStatistics = async () => {
    try {
      const response = await getStatistics();

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getStatistics) {
        return;
      }

      setStats(response.data.getStatistics as any);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const Component = useMemo(() => {
    return () => {
      if (isTutor) {
        return <TutorDashboard />;
      }

      return <Dashboard />;
    };
  }, [isTutor]);

  useEffect(() => {
    handleGetStatistics();
  }, []);

  return (
    <MainDashboardContext.Provider value={{ handleGetStatistics }}>
      <Component />
      <Progress loading={getStatisticsResult.loading} />
    </MainDashboardContext.Provider>
  );
};

export default MainDashboard;
