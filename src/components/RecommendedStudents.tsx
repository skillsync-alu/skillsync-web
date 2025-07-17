import { HiHandThumbDown, HiHandThumbUp } from "react-icons/hi2";
import { TbReload } from "react-icons/tb";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_MATCHEES,
  type GetMatcheesInput,
  type GetMatcheesResponse,
} from "../api/queries/match";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { useRecoilState } from "recoil";
import {
  matchedStudentsListState,
  userState,
  userStatisticsState,
} from "../resources/user";
import { useEffect, useState } from "react";
import { getFullName } from "../utilities/names";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  UPDATE_MATCH_TUTOR,
  type UpdateMatchInput,
  type UpdateMatchResponse,
} from "../api/mutations/match";
import { MatchStatusType } from "../interfaces/match";
import toast from "react-hot-toast";
import Dialog from "./Dialog";
import Spinner from "./Spinner";
import Progress from "./Progress";
import UserAvatar from "./UserAvatar";

const take = 6;

const defaultUpdate: UpdateMatchInput["input"] = {
  id: "",
  matchStatus: MatchStatusType.Draft,
};

function RecommendedStudents() {
  const navigate = useNavigate();

  const [user] = useRecoilState(userState);

  const [stats] = useRecoilState(userStatisticsState);

  const [students, setStudents] = useRecoilState(matchedStudentsListState);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [update, setUpdate] = useState(defaultUpdate);

  const [getMatchees, getMatcheesResult] = useLazyQuery<
    GetMatcheesResponse,
    GetMatcheesInput
  >(GET_MATCHEES, { fetchPolicy: "no-cache" });

  const [updateMatch, updateMatchResult] = useMutation<
    UpdateMatchResponse,
    UpdateMatchInput
  >(UPDATE_MATCH_TUTOR);

  const handleGetMatchees = async (filter: GetMatcheesInput["filter"] = {}) => {
    try {
      filter.take = take;

      const response = await getMatchees({ variables: { filter } });

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getMatchees) {
        return;
      }

      setStudents(response.data.getMatchees);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const handleUpdateMatch = async (input: UpdateMatchInput["input"]) => {
    try {
      setIsDialogOpen(false);

      const response = await updateMatch({ variables: { input } });

      if (response.errors) {
        setUpdate(defaultUpdate);
        return handleResponseErrors(response);
      }

      if (!response.data?.updateMatchAsTutor) {
        return setUpdate(defaultUpdate);
      }

      setUpdate(defaultUpdate);

      const successToast = (message: string) => {
        return toast.success(message, { duration: 6000 });
      };

      if (
        response.data.updateMatchAsTutor.status === MatchStatusType.Confirmed
      ) {
        successToast("We have a match! 🥳");

        return navigate({ to: "/matches", search: { isConfetti: true } });
      }

      if (
        response.data.updateMatchAsTutor.status ===
        MatchStatusType.RejectedByTutor
      ) {
        successToast("Thank you for the feedback");
      } else {
        successToast(
          "You have accepted this match, now waiting for the Student. ✅"
        );
      }

      await handleGetMatchees();
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    handleGetMatchees();
  }, []);

  useEffect(() => {
    if (update.id) {
      setIsDialogOpen(true);
    }
  }, [update]);

  return (
    <div className="w-full flex flex-col bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 py-5 px-3 mt-6">
      <Dialog
        message={
          update.matchStatus === MatchStatusType.RejectedByTutor
            ? "Please tell us why you are rejecting this match. Your feedback will help us improve our matchmaking algorithm."
            : "Are you sure you want to proceed?"
        }
        feedbackRequired={
          update.matchStatus === MatchStatusType.RejectedByTutor
        }
        feedbackValue={update.details}
        onFeedbackChange={details =>
          setUpdate(update => ({ ...update, details }))
        }
        open={isDialogOpen}
        onConfirm={() => handleUpdateMatch(update)}
        onReject={() => {
          setIsDialogOpen(false);
          setUpdate(defaultUpdate);
        }}
      />
      <div className="flex items-start justify-between w-full px-2 pb-3">
        <p className="pb-2 text-sm text-text">Recommended Students</p>
        <div className="w-fit flex gap-5">
          <button
            onClick={() => handleGetMatchees()}
            className="text-main text-sm flex items-center gap-1"
          >
            <TbReload className="text-lg" />
            Refresh
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-3">
        {getMatcheesResult.loading ? (
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
        ) : getMatcheesResult.called && students.list.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center w-full py-8">
            <p className="text-textWeak text-sm mb-3">
              {stats.matcheeCount > 0
                ? "No new matches yet, check back later"
                : user.skillsOfferred.length <= 0
                  ? "Please provide the skills you want to teach so we can match you"
                  : "We are setting up matches for you."}
            </p>
            {user.skillsOfferred.length <= 0 && (
              <Link
                to="/skills"
                className="bg-main text-white px-4 py-2 text-sm rounded-xl transition-colors hover:bg-main/80"
              >
                Set Skills
              </Link>
            )}
          </div>
        ) : (
          students.list.map((student, index) => (
            <div
              key={index}
              className={`text-sm flex flex-col items-start justify-start gap-2 bg-cardBgWeak hover:bg-cardBg cursor-pointer w-full p-3 rounded-3xl relative`}
            >
              <div className="size-16 max-md:size-14 aspect-square min-w-fit rounded-full overflow-hidden flex items-center justify-center mx-2 mt-2">
                <UserAvatar user={student} size={"lg"} />
              </div>
              <div className="flex flex-1 items-start justify-center flex-col">
                <p className="text-lg font-semibold break-all line-clamp-1 px-2">
                  {getFullName(student) || "Unknown Student"}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 px-2">
                  {student.skillsWanted.map((skill, index) => (
                    <div
                      key={index}
                      className="text-xs py-1.5 px-3 rounded-2xl bg-lines dark:bg-mainWeak "
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="w-full flex items-center justify-center mt-6 gap-3 z-20">
                  <button
                    onClick={() => {
                      if (!student.matchId) {
                        return;
                      }

                      setUpdate({
                        id: student.matchId,
                        matchStatus: MatchStatusType.AcceptedByTutor,
                      });
                    }}
                    className="text-sm py-3 px-3 w-full rounded-2xl bg-lines hover:bg-main hover:text-white transition text-center flex items-center justify-center gap-2 group"
                  >
                    <HiHandThumbUp className="text-xl text-textWeak group-hover:text-white transition" />
                    {updateMatchResult.loading &&
                    update.id === student.matchId &&
                    update.matchStatus === MatchStatusType.AcceptedByTutor ? (
                      <Spinner message="Approving" />
                    ) : (
                      "Approve"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (!student.matchId) {
                        return;
                      }

                      setUpdate({
                        id: student.matchId,
                        matchStatus: MatchStatusType.RejectedByTutor,
                      });
                    }}
                    className="text-sm py-3 px-3 w-full rounded-2xl bg-lines hover:bg-red hover:text-white transition text-center flex items-center justify-center gap-2 group"
                  >
                    <HiHandThumbDown className="text-xl text-textWeak group-hover:text-white transition" />
                    {updateMatchResult.loading &&
                    update.id === student.matchId &&
                    update.matchStatus === MatchStatusType.RejectedByTutor ? (
                      <Spinner message="Rejecting" />
                    ) : (
                      "Reject"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Progress loading={updateMatchResult.loading} />
    </div>
  );
}

export default RecommendedStudents;
