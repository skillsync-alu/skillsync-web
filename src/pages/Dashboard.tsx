import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { GoodNewsDark, GoodNewsLight } from "../assets";
import { Link } from "@tanstack/react-router";
import { LuX } from "react-icons/lu";
import WelcomeCard from "../components/WelcomeCard";
import StarredTutors from "../components/StarredTutors";
import RecommendedTutors from "../components/RecommendedTutors";
import ProfileModal from "../components/ProfileModal";

function Dashboard() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileId, setProfileId] = useState<number | null>(null);
  const showProfile = (id: any) => {
    setShowProfileModal(true);
    setProfileId(id);
  };
  return (
    <div>
      <Navbar />
      {showProfileModal && (
        <ProfileModal
          id={profileId}
          setShowProfileModal={setShowProfileModal}
        />
      )}
      <div className="w-full flex items-center justify-between flex-col relative text-text px-10 max-lg:px-4">
        <div className="w-full h-40 bg-cardBgWeak absolute top-0 left-0"></div>
        <div className="w-full h-full max-w-[1200px] mx-auto min-h-32 z-10 pb-10 max-lg:pb-6">
          <h1 className="text-base py-5">Dashboard</h1>
          <div className="w-full flex max-lg:flex-col gap-6 ">
            {/* welcome card */}
            <WelcomeCard />
            {/* starred tutors cards */}
            <StarredTutors showProfile={showProfile} />
          </div>
          {/* Recommended tutors cards */}
          <RecommendedTutors showProfile={showProfile}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
