import { HiHandThumbUp } from "react-icons/hi2";
import { TbReload } from "react-icons/tb";
import { useLazyQuery } from "@apollo/client";
import {
  GET_MATCHERS,
  type GetMatchersInput,
  type GetMatchersResponse,
} from "../api/queries/match";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { useRecoilState } from "recoil";
import { matchedTutorsListState } from "../resources/user";
import { useEffect, useState } from "react";
import type { User } from "../interfaces/user";
import { getFullName } from "../utilities/names";
import ProfileModal from "./ProfileModal";
import { Link } from "@tanstack/react-router";

const take = 6;

function RecommendedTutors() {
  const [tutors, setTutors] = useRecoilState(matchedTutorsListState);

  const [showProfileModal, setShowProfileModal] = useState(false);

  const [profile, setProfile] = useState<User | null>(null);

  const showProfile = (user: User) => {
    setShowProfileModal(true);

    setProfile(user);
  };

  const [getMatchers, getMatchersResult] = useLazyQuery<
    GetMatchersResponse,
    GetMatchersInput
  >(GET_MATCHERS);

  const handleGetMatchers = async (filter: GetMatchersInput["filter"] = {}) => {
    try {
      filter.take = take;

      const response = await getMatchers({ variables: { filter } });

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getMatchers) {
        return;
      }

      setTutors(response.data.getMatchers);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    handleGetMatchers();
  }, []);

  return (
    <div className="w-full flex flex-col bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 py-5 px-3 mt-6">
      {showProfileModal && profile && (
        <ProfileModal
          user={profile}
          setShowProfileModal={setShowProfileModal}
        />
      )}
      <div className="flex items-start justify-between w-full px-2 pb-3">
        <p className="pb-2 text-sm text-text">Recommended Tutors</p>
        <div className="w-fit flex gap-5">
          <button className="text-main text-sm flex items-center gap-1">
            <TbReload className="text-lg" />
            Refresh
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-3">
        {getMatchersResult.loading ? (
          Array.from({ length: take }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse flex flex-col items-start justify-start gap-2 bg-cardBgWeak w-full p-3 rounded-3xl min-h-[220px]"
            >
              <div className="size-16 max-md:size-14 rounded-full bg-lines mx-2 mt-2" />
              <div className="h-5 w-2/3 bg-lines rounded mb-2 mt-2" />
              <div className="h-4 w-1/2 bg-lines rounded mb-2" />
              <div className="flex flex-wrap gap-2 mt-3 px-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-lines rounded-2xl" />
                ))}
              </div>
              <div className="w-full flex items-center justify-center mt-6 gap-3 z-20">
                <div className="h-10 w-20 bg-lines rounded-2xl" />
              </div>
            </div>
          ))
        ) : getMatchersResult.called && tutors.list.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center w-full py-8">
            <p className="text-textWeak text-sm mb-3">
              We are setting up matches for you. Provide your skills now
            </p>
            <Link
              to="/set_skills"
              className="bg-main text-white px-4 py-2 text-sm rounded-xl transition-colors hover:bg-main/80"
            >
              Set Skills
            </Link>
          </div>
        ) : (
          tutors.list.map((tutor, index) => (
            <div
              key={index}
              className={`text-sm flex flex-col items-start justify-start gap-2 bg-cardBgWeak hover:bg-cardBg cursor-pointer w-full p-3 rounded-3xl relative`}
            >
              <button
                onClick={() => showProfile(tutor)}
                className="w-full h-full absolute top-0 left-0 z-10"
              ></button>
              <div className="size-16 max-md:size-14 aspect-square min-w-fit rounded-full overflow-hidden flex items-center justify-center mx-2 mt-2">
                <img
                  src={tutor.avatar}
                  alt={getFullName(tutor)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-1 items-start justify-center flex-col">
                <p className="text-lg font-semibold break-all line-clamp-1 px-2">
                  {getFullName(tutor) || "Unknown Tutor"}
                </p>
                <p className="text-sm break-all line-clamp-1 text-textWeak px-2">
                  {tutor.bio || "No Bio"}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 px-2">
                  {tutor.skillsOfferred.map((skill, index) => (
                    <div
                      key={index}
                      className="text-xs py-1.5 px-3 rounded-2xl bg-lines dark:bg-mainWeak "
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="w-full flex items-center justify-center mt-6 gap-3 z-20">
                  <button className="text-sm py-3 px-3 w-full rounded-2xl bg-lines hover:bg-main hover:text-white transition text-center flex items-center justify-center gap-2 group">
                    <HiHandThumbUp className="text-xl text-textWeak group-hover:text-white transition" />
                    Approve Match
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecommendedTutors;
