import { useMemo, useRef } from "react";
import Navbar from "../components/Navbar";
// import { GoodNewsDark, GoodNewsLight } from "../assets";
import { Link } from "@tanstack/react-router";
// import { LuX } from "react-icons/lu";
// import WelcomeCard from "../components/WelcomeCard";
// import StarredTutors from "../components/StarredTutors";
// import RecommendedTutors from "../components/RecommendedTutors";
// import ProfileModal from "../components/ProfileModal";
// import { TbEdit, TbEditCircle, TbInfoCircle, TbPencil } from "react-icons/tb";
import { TbPencil } from "react-icons/tb";
import { RiEarthLine, RiInformationLine } from "react-icons/ri";
import { useRecoilState } from "recoil";
import { userState } from "../resources/user";
import { getFullName } from "../utilities/names";
import { UserType } from "../interfaces/user";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER,
  type UpdateUserInput,
  type UpdateUserResponse,
} from "../api/mutations/user";
import { useFormik } from "formik";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import Spinner from "../components/Spinner";
import { useWrapperContext } from "../components/Wrapper";
import { countries } from "../constants";
import UserAvatar from "../components/UserAvatar";

function Profile() {
  const { isTutor } = useWrapperContext();

  const [user, setUser] = useRecoilState(userState);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto"; // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }
  };

  const skills = useMemo(() => {
    if (user.type === UserType.Tutor) {
      return user.skillsOfferred;
    }

    return user.skillsWanted;
  }, []);

  const initialValues = useMemo(() => {
    if (!user || !user.id) {
      return { bio: "", phoneNumber: "" };
    }

    return { bio: user?.bio || "", phoneNumber: user?.phoneNumber || "" };
  }, [user]);

  const form = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async input => {
      try {
        const response = await updateUser({ variables: { input } });

        if (response.errors) {
          return handleResponseErrors(response);
        }

        if (!response.data?.updateUser) {
          return;
        }

        setUser(response.data.updateUser);
      } catch (error) {
        handleErrorMessage(error);
      }
    },
  });

  const [updateUser, updateUserResult] = useMutation<
    UpdateUserResponse,
    UpdateUserInput
  >(UPDATE_USER);

  return (
    <div>
      <Navbar />
      <div className="w-full flex items-center justify-between flex-col relative text-text px-10 max-lg:px-4">
        <div className="w-full h-40 bg-cardBgWeak absolute top-0 left-0"></div>
        <div className="w-full h-full max-w-[1200px] mx-auto min-h-32 z-10 pb-10 max-lg:pb-6">
          <h1 className="text-base py-5">My Profile</h1>
          <div className="w-full flex max-lg:flex-col gap-6">
            <div className="w-full flex bg-bodyBg ring-1 ring-lines rounded-xl flex-col gap-4 min-h-32 p-5">
              <div className="size-36 max-md:size-28 aspect-square min-w-fit rounded-full overflow-hidden flex items-center justify-center mx-2 mt-2">
                <UserAvatar size={"2xl"} />
              </div>

              <div className="flex flex-1 items-start justify-center flex-col">
                <p className="text-2xl max-lg:text-xl font-semibold break-all line-clamp-1 px-2">
                  {getFullName(user) || "Unknown Tutor"}
                </p>
                <p className="text-sm break-all line-clamp-1 text-textWeak px-2">
                  {user.email}
                </p>
                <div className="flex items-start justify-between w-full px-2 pb-3 border-t border-lines mt-10 pt-4">
                  <p className="pb-2 text-base text-text">
                    Account information
                  </p>
                </div>
                <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6 w-full px-2">
                  <div className="w-full flex flex-col">
                    <p className="pb-2 text-sm text-textWeak">Bio</p>
                    <textarea
                      ref={textareaRef}
                      onInput={handleInput}
                      placeholder="Enter short desciption about yourself.."
                      className="bg-cardBg resize-none h-[44px] max-h-[200px] px-5 py-3 rounded-2xl text-sm outline-none overflow-y-auto"
                      rows={1}
                      value={form.values.bio}
                      onChange={form.handleChange}
                      name="bio"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <p className="pb-2 text-sm text-textWeak">Phone number</p>
                    <input
                      type="text"
                      placeholder="0788 123 456"
                      className="bg-cardBg h-[44px] px-5 py-3 rounded-2xl text-sm outline-none "
                      value={form.values.phoneNumber}
                      onChange={form.handleChange}
                      name="phoneNumber"
                    />
                  </div>
                  <button
                    onClick={() => form.handleSubmit()}
                    className="bg-main text-white w-fit px-4 py-2.5 rounded-xl text-sm flex items-center gap-1"
                  >
                    {updateUserResult.loading ? (
                      <Spinner message="Saving" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
                <div className="flex items-start justify-between w-full px-2 pb-3 border-t border-lines mt-10 pt-4">
                  <p className="pb-2 text-base text-text">
                    Skills you want to {isTutor ? "Teach" : "Learn"}{" "}
                  </p>
                  <div className="w-fit flex gap-5">
                    <Link
                      to="/skills"
                      className="text-main text-sm whitespace-nowrap flex items-center gap-1"
                    >
                      <TbPencil className="text-lg" />
                      {Boolean(skills.length) ? "Edit" : "Add"} Skills
                    </Link>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2  px-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="text-sm font-medium py-1.5 px-3 rounded-2xl bg-lines dark:bg-mainWeak "
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2  w-full px-2 pb-3 mt-12 pt-4">
                  <p className="pb-2 text-sm text-textWeak flex items-center gap-2 ">
                    <RiEarthLine className="text-xl " />{" "}
                    {countries.find(country => country.iso === user.phoneCode)
                      ?.country || "Rwanda"}
                  </p>
                  <p className="pb-2 text-sm text-textWeak flex items-center gap-2 ">
                    <RiInformationLine className="text-xl " /> Joined{" "}
                    {dayjs(user.createdAt || new Date()).format(
                      "MMMM DD, YYYY"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
