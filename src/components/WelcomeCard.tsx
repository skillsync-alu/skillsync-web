import { GoodNewsDark, GoodNewsLight } from "../assets";
import { useRecoilState } from "recoil";
import { userState } from "../resources/user";
import { useEffect, useState } from "react";

function getNextMatchTime() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const matchHours = [6, 14, 22];
  const matchTimes = matchHours.map(
    h => new Date(today.getTime() + h * 60 * 60 * 1000)
  );
  let nextMatch = matchTimes.find(t => t > now);
  if (!nextMatch) {
    // If all today's times have passed, next is tomorrow 6AM
    nextMatch = new Date(
      today.getTime() + 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000
    );
  }
  return nextMatch;
}

function formatTimeDiff(diffMs: number) {
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (diffMs < 60 * 60 * 1000) {
    // Less than 1 hour
    if (minutes < 1) {
      return `Check back in ${seconds} seconds`;
    }
    return `Check back in ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
  return `Next match in ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function WelcomeCard() {
  const [user] = useRecoilState(userState);
  const [timeMsg, setTimeMsg] = useState("");

  useEffect(() => {
    function updateMsg() {
      const nextMatch = getNextMatchTime();
      const diff = nextMatch.getTime() - Date.now();
      setTimeMsg(formatTimeDiff(diff));
    }
    updateMsg();
    const interval = setInterval(updateMsg, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 p-5 items-center justify-between gap-4">
      <div className="flex-1 flex flex-col min-h-full items-start justify-center">
        <h1 className="text-xl font-semibold">
          Welcome back, {user.firstName}
        </h1>
        <p className="py-2 text-sm text-textWeak">{timeMsg}</p>
        {/* <div className="flex-1 flex flex-col items-start justify-end">
          <Link to="/" className="text-main text-sm">
            View Matches
          </Link>
        </div> */}
      </div>
      <div className="flex items-center justify-center w-full md:w-fit">
        <div className="rounded-2xl bg-cardBgWeak p-3 flex items-center justify-center shadow-sm border border-lines w-full max-w-[180px] md:max-w-[160px]">
          {/* for light mode */}
          <img
            src={GoodNewsLight}
            alt="Welcome illustration"
            className="w-full h-auto dark:hidden"
          />
          {/* for dark mode */}
          <img
            src={GoodNewsDark}
            alt="Welcome illustration"
            className="w-full h-auto hidden dark:block"
          />
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
