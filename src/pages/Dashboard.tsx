import Navbar from "../components/Navbar";
import WelcomeCard from "../components/WelcomeCard";
import StarredTutors from "../components/StarredTutors";
import RecommendedTutors from "../components/RecommendedTutors";
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
import { useEffect } from "react";
import Progress from "../components/Progress";

function Dashboard() {
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

  useEffect(() => {
    handleGetStatistics();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="w-full flex items-center justify-between flex-col relative text-text px-10 max-lg:px-4">
        <div className="w-full h-40 bg-cardBgWeak absolute top-0 left-0"></div>
        <div className="w-full h-full max-w-[1200px] mx-auto min-h-32 z-10 pb-10 max-lg:pb-6">
          <h1 className="text-base py-5">Dashboard</h1>
          <div className="w-full flex max-lg:flex-col gap-6 ">
            {/* welcome card */}
            <WelcomeCard />
            {/* starred tutors cards */}
            <StarredTutors />
          </div>
          {/* Recommended tutors cards */}
          <RecommendedTutors />
        </div>
      </div>
      <Progress loading={getStatisticsResult.loading} />
    </div>
  );
}

export default Dashboard;
