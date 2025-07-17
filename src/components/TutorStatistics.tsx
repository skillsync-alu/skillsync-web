import { useRecoilState } from "recoil";
import { userStatisticsState } from "../resources/user";

const TutorStatistics = () => {
  const [stats] = useRecoilState(userStatisticsState);
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <div className="bg-cardBg rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-2xl text-text font-bold">
          {stats.starrerCount}
        </span>
        <span className="text-sm text-gray-400 mt-1">Students Starred You</span>
      </div>
      <div className="bg-cardBg rounded-lg shadow p-6 flex flex-col items-center">
        <span className="text-2xl text-text font-bold">
          {stats.matcheeCount}
        </span>
        <span className="text-sm text-gray-400 mt-1">
          Students Matched With You
        </span>
      </div>
    </div>
  );
};

export default TutorStatistics;
