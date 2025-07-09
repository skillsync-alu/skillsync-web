import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { Tutors } from "./dummy_data";
import ProfileModal from "./ProfileModal";

function StarredTutors({ showProfile }: { showProfile: any }) {
  return (
    <div className="w-full flex flex-col bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 py-5 px-3">
      {/* profile modal hidden until tutor card is clicked */}
      <div className="flex items-start justify-between w-full px-2 pb-1">
        <p className="pb-2 text-sm text-text">Starred Tutors</p>
        <Link to="/" className="text-main text-sm">
          View all
        </Link>
      </div>
      <div className="w-full grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-2 max-h-[230px] overflow-y-auto ">
        {Tutors.map((tutor, index) => (
          <button
            onClick={() => showProfile(tutor.id)}
            key={index}
            className={`text-sm flex flex-col items-center justify-start gap-2 hover:bg-cardBg cursor-pointer w-full p-2 rounded-xl relative`}
          >
            <div className="size-16 max-md:size-14 aspect-square min-w-fit rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={tutor.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-1 items-start justify-center flex-col">
              <p className="text-sm break-all line-clamp-1">
                {tutor.username || "Unknown Tutor"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StarredTutors;
