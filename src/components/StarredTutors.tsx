import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";
import type { User } from "../interfaces/user";
import { useLazyQuery } from "@apollo/client";
import {
  GET_STARRED,
  type GetStarredInput,
  type GetStarredResponse,
} from "../api/queries/star";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { useRecoilState } from "recoil";
import { starredTutorsListState } from "../resources/user";
import { getFullName } from "../utilities/names";
import UserAvatar from "./UserAvatar";

function StarredTutors() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [profile, setProfile] = useState<User | null>(null);

  const [tutors, setTutors] = useRecoilState(starredTutorsListState);

  const showProfile = (user: User) => {
    setShowProfileModal(true);

    setProfile(user);
  };

  const [getStarred, getStarredResult] = useLazyQuery<
    GetStarredResponse,
    GetStarredInput
  >(GET_STARRED);

  const handleGetStarred = async () => {
    try {
      const response = await getStarred({
        variables: { filter: { take: 10 } },
      });

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getStarred) {
        return;
      }

      setTutors(response.data.getStarred);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    handleGetStarred();
  }, []);

  return (
    <div className="w-full flex flex-col bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 py-5 px-3">
      {showProfileModal && profile && (
        <ProfileModal
          user={profile}
          setShowProfileModal={setShowProfileModal}
        />
      )}
      {/* profile modal hidden until tutor card is clicked */}
      <div className="flex items-start justify-between w-full px-2 pb-1">
        <p className="pb-2 text-sm text-text">Starred Tutors</p>
        <Link to="/" className="text-main text-sm">
          View all
        </Link>
      </div>
      <div className="w-full grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 max-h-[230px] overflow-y-auto ">
        {getStarredResult.loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse flex flex-col items-center justify-start gap-2 w-full p-2 rounded-xl relative"
            >
              <div className="size-16 max-md:size-14 aspect-square min-w-fit rounded-full bg-lines" />
              <div className="h-4 w-2/3 bg-lines rounded mb-2 mt-2" />
            </div>
          ))
        ) : getStarredResult.called && tutors.list.length === 0 ? (
          <div className="col-span-5 flex flex-col items-center justify-center w-full py-8">
            <p className="text-textWeak text-sm mb-3">
              You haven't starred any tutors yet.
            </p>
            <Link
              to="/tutors"
              className="bg-main text-white px-4 py-2 text-sm rounded-xl transition-colors hover:bg-main/80"
            >
              Find Tutors
            </Link>
          </div>
        ) : (
          tutors.list.map((tutor, index) => (
            <button
              onClick={() => showProfile(tutor)}
              key={index}
              className={`text-sm flex flex-col items-center justify-start gap-2 hover:bg-cardBg cursor-pointer w-full p-2 rounded-xl relative`}
            >
              <div className="size-16 max-md:size-14 aspect-square min-w-fit rounded-full overflow-hidden flex items-center justify-center">
                <UserAvatar user={tutor} size={"lg"} />
              </div>
              <div className="flex flex-1 items-start justify-center flex-col">
                <p className="text-sm break-all line-clamp-1">
                  {getFullName(tutor) || "Unknown Tutor"}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default StarredTutors;
