import React from "react";
import { HiHandThumbUp } from "react-icons/hi2";
import { Tutors } from "./dummy_data";
import { TbReload } from "react-icons/tb";

function RecommendedTutors({ showProfile }: { showProfile: any }) {
  return (
    <div className="w-full flex flex-col bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 py-5 px-3 mt-6">
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
        {Tutors.map((tutor, index) => (
          <div
            key={index}
            className={`text-sm flex flex-col items-start justify-start gap-2 bg-cardBgWeak hover:bg-cardBg cursor-pointer w-full p-3 rounded-3xl relative`}
          >
            <button
              onClick={() => showProfile(tutor.id)}
              className="w-full h-full absolute top-0 left-0 z-10"
            ></button>
            <div className="size-16 max-md:size-14 aspect-square min-w-fit rounded-full overflow-hidden flex items-center justify-center mx-2 mt-2">
              <img
                src={tutor.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-1 items-start justify-center flex-col">
              <p className="text-lg font-semibold break-all line-clamp-1 px-2">
                {tutor.username || "Unknown Tutor"}
              </p>
              <p className="text-sm break-all line-clamp-1 text-textWeak px-2">
                Master Electrician with 15+ years experience
              </p>
              <div className="flex flex-wrap gap-2 mt-3 px-2">
                {tutor.skills.map((skill, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default RecommendedTutors;
