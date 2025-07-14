import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MdOutlineFilterList } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import { HiHandThumbUp, HiMiniStar } from "react-icons/hi2";
import ProfileModal from "../components/ProfileModal";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_TUTORS,
  type GetTutorsInput,
  type GetTutorsResponse,
} from "../api/queries/user";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import type { FilterInput } from "../interfaces";
import { useRecoilState } from "recoil";
import { tutorsListState } from "../resources/user";
import { getFullName } from "../utilities/names";
import { debounce } from "lodash";
import Pagination from "../components/Pagination";
import type { User } from "../interfaces/user";
import {
  STAR_OR_UNSTAR,
  type StarInput,
  type StarResponse,
} from "../api/mutations/star";
import classnames from "classnames";

function FindTutors() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [profile, setProfile] = useState<User | null>(null);

  const [tutors, setTutors] = useRecoilState(tutorsListState);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const showProfile = (user: User) => {
    setShowProfileModal(true);
    setProfile(user);
  };

  const [getTutors, getTutorsResult] = useLazyQuery<
    GetTutorsResponse,
    GetTutorsInput
  >(GET_TUTORS);

  const [star] = useMutation<StarResponse, StarInput>(STAR_OR_UNSTAR);

  const updateStar = (starred: string, isStarred: boolean) => {
    try {
      setTutors(tutors => {
        return {
          ...tutors,
          list: tutors.list.map(tutor => {
            if (tutor.id === starred) {
              return { ...tutor, isStarred };
            }

            return tutor;
          }),
        };
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const handleStar = async (starred: string, isStarred: boolean) => {
    try {
      updateStar(starred, !isStarred);

      const response = await star({ variables: { starred } });

      if (response.errors) {
        updateStar(starred, isStarred);

        return handleResponseErrors(response);
      }

      if (!response.data?.starOrUnstar) {
        return updateStar(starred, isStarred);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const handleGetTutors = async (filter: FilterInput = {}) => {
    try {
      filter.take = 6;

      filter.page = page;

      const response = await getTutors({ variables: { filter } });

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getTutors) {
        return;
      }

      setTutors(response.data.getTutors);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    handleGetTutors({ keyword: search, page });
  }, [search, page]);

  return (
    <div>
      <Navbar />
      {/* profile modal hidden until tutor card is clicked */}
      {showProfileModal && profile && (
        <ProfileModal
          user={profile}
          setShowProfileModal={setShowProfileModal}
        />
      )}
      <div className="w-full flex items-center justify-between flex-col relative text-text px-10 max-lg:px-4">
        <div className="w-full h-40 bg-cardBgWeak absolute top-0 left-0"></div>
        <div className="w-full h-full max-w-[1200px] mx-auto min-h-32 z-10 pb-10 max-lg:pb-6">
          <h1 className="text-base py-5">Find Tutors</h1>
          <div className="w-full flex max-lg:flex-col gap-6">
            <div className="w-full flex flex-col bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 py-5 px-3">
              <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-4 w-full px-2">
                <p className="text-xl font-semibold text-text">
                  SkillSync Tutors
                </p>
                <div className="w-fit max-lg:w-full flex gap-3">
                  {/* filter button */}
                  <button className="text-textWeak hover:bg-cardBg pl-3 pr-4 rounded-xl h-[40px] text-sm flex items-center gap-2 ">
                    <MdOutlineFilterList className="text-2xl opacity-70" />
                    <span className="text-text max-sm:hidden">Filter</span>
                  </button>
                  {/* search */}
                  <div className="w-[260px] max-lg:w-full h-[40px] relative">
                    <input
                      className="text-text placeholder:text-textWeak text-sm bg-cardBg ring-1 ring-lines h-full w-full pr-4 pl-10 outline-none rounded-xl peer focus:ring-2 focus:ring-main transition"
                      placeholder="Search.."
                      onChange={debounce(event => {
                        setSearch(event.target.value);
                      }, 1000)}
                    />
                    <RiSearch2Line className="absolute top-0 bottom-0 my-auto left-2.5 text-textWeak text-xl peer-focus-within:text-text transition" />
                  </div>
                </div>
              </div>
              {/* line */}
              <div className="w-full px-2">
                <div className="bg-lines h-[1px] my-5"></div>
              </div>
              {/* mapping tutors */}
              {getTutorsResult.loading ? (
                <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-3 px-1">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="animate-pulse flex flex-col items-start justify-start gap-2 bg-cardBgWeak w-full p-3 rounded-3xl min-h-[220px]"
                    >
                      <div className="size-16 max-md:size-14 rounded-full bg-lines mx-2 mt-2" />
                      <div className="h-5 w-2/3 bg-lines rounded mb-2 mt-2" />
                      <div className="h-4 w-1/2 bg-lines rounded mb-2" />
                      <div className="flex flex-wrap gap-2 mt-3 px-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-6 w-16 bg-lines rounded-2xl"
                          />
                        ))}
                      </div>
                      <div className="w-full flex items-center justify-center mt-6 gap-3 z-20">
                        <div className="h-10 w-20 bg-lines rounded-2xl" />
                        <div className="h-10 w-20 bg-lines rounded-2xl" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-3 px-1">
                  {tutors.list.map((tutor, index) => (
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
                          alt=""
                          onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                          ) => {
                            // @ts-ignore
                            e.target.onerror = null;
                            // @ts-ignore
                            e.target.src =
                              "https://images.generated.photos/hTWhfPc0WQUwABdQHBpgtOCTXeZ-cKtJYUQ6cQy_Bbc/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDk4NTA5LmpwZw.jpg";
                          }}
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
                          <button className="text-sm py-3 px-3 w-full rounded-2xl bg-lines hover:bg-main hover:text-white transition text-center flex items-center justify-center gap-2 group ">
                            <HiHandThumbUp className="text-xl text-textWeak group-hover:text-white transition" />
                            <span className="mt-[2px]">Match</span>
                          </button>
                          <button
                            onClick={() =>
                              handleStar(tutor.id, tutor.isStarred || false)
                            }
                            className="text-sm py-3 px-3 w-full rounded-2xl bg-lines hover:bg-main hover:text-white transition text-center flex items-center justify-center gap-2 group "
                          >
                            <HiMiniStar
                              className={classnames(
                                "text-xl text-textWeak group-hover:text-white transition",
                                {
                                  "!text-main": tutor.isStarred,
                                }
                              )}
                            />
                            <span className="mt-[2px]">
                              {tutor.isStarred ? "Starred" : "Star"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Pagination Controls */}
              <div className="mt-6">
                <Pagination
                  totalItems={tutors.totalCount}
                  itemsPerPage={6}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindTutors;
