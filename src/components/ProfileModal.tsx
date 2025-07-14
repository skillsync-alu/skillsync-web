import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import type { User } from "../interfaces/user";
import { getFullName } from "../utilities/names";
import { shortNumber } from "../utilities/short-number";
import { countries } from "../constants";

type ProfileModalProps = {
  setShowProfileModal: (val: boolean) => void;
  user?: User;
};

function ProfileModal({ setShowProfileModal, user }: ProfileModalProps) {
  if (!user) return null;

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleExitComplete = () => {
    setShowProfileModal(false);
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center"
        >
          {/* Background overlay */}
          <motion.div
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 h-full w-full bg-[#8f8f8f81] dark:bg-[#3e4d688a] z-10 backdrop-blur-[2px]"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.95, translateY: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full max-h-[90vh] max-w-[900px] max-lg:max-w-full max-lg:max-h-full bg-bodyBg rounded-3xl max-lg:rounded-none shadow-xl z-20 overflow-y-auto"
          >
            <div className="h-[150px] w-full bg-cardBgWeak relative">
              {/* close button */}
              <button
                onClick={handleClose}
                className="text-sm py-3 px-3 w-fit absolute top-3 right-3 rounded-2xl bg-lines hover:bg-main hover:text-white transition text-center flex items-center justify-center gap-2 group "
              >
                <HiXMark className="text-xl text-textWeak group-hover:text-white transition" />
              </button>
              {/* avatar */}
              <div className="size-32 ring-8 ring-bodyBg aspect-square absolute -bottom-16 left-9 min-w-fit rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={user?.avatar}
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
            </div>
            <div className="w-full flex max-md:flex-col pb-10">
              <div className="flex-1 px-9 pt-4 mt-16">
                <p className="text-2xl font-semibold text-text">
                  {getFullName(user)}
                </p>
                <p className="text-sm font-normal text-textWeak">
                  {user?.email}
                </p>
                {/* stats */}
                <div className="w-full flex items-center flex-wrap my-6 gap-4">
                  <div className="flex max-sm:w-full flex-col items-center gap-1 justify-center bg-cardBgWeak ring-1 ring-cardBg py-3 px-4 rounded-xl min-w-[140px]">
                    <p className="text-2xl font-semibold">
                      {shortNumber(user?.matcheeCount || 0)}
                    </p>
                    <p className="text-xs text-textWeak">Total Matches</p>
                  </div>
                  <div className="flex max-sm:w-full flex-col items-center gap-1 justify-center bg-cardBgWeak ring-1 ring-cardBg py-3 px-4 rounded-xl min-w-[140px]">
                    <p className="text-2xl font-semibold">
                      {shortNumber(user?.starrerCount || 0)}
                    </p>
                    <p className="text-xs text-textWeak">Total Stars</p>
                  </div>
                </div>
                {/* bio */}
                <div className="w-full flex flex-col gap-2 mt-7 max-w-[430px]">
                  <p>Biography</p>
                  <p className="text-sm font-normal text-textWeak">
                    {user?.bio}
                  </p>
                </div>
                {/* location */}
                <div className="w-full flex flex-col gap-2 mt-7 max-w-[430px]">
                  <p>Country of residence</p>
                  <p className="text-sm font-normal text-textWeak">
                    {countries.find(country => country.iso === user.phoneCode)
                      ?.country || "Rwanda"}
                  </p>
                </div>
                {/* skills */}
                <div className="w-full flex flex-col gap-2 mt-7 max-w-[430px]">
                  <p>Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {user?.skillsOfferred.map((skill, index) => (
                      <div
                        key={index}
                        className="text-xs py-1.5 px-3 rounded-2xl bg-cardBgWeak dark:bg-mainWeak "
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="min-w-fit pr-32 max-md:pr-0 max-md:px-9 ">
                {/* Should not show, should only show on a successful match */}
                {/* {user.phoneNumber && (
                  <div className="w-full flex flex-col gap-2 mt-7 max-w-[430px]">
                    <p>Contact</p>
                    <p className="text-sm font-normal text-textWeak">
                      {parsePhoneNumberFromString(
                        user.phoneNumber,
                        user.phoneCode || "RW"
                      )?.formatInternational({ v2: true })}
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProfileModal;
