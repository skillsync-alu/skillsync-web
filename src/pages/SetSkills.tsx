import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "@tanstack/react-router";
import { useWrapperContext } from "../components/Wrapper";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER,
  type UpdateUserInput,
  type UpdateUserResponse,
} from "../api/mutations/user";
import {
  handleErrorMessage,
  handleResponseErrors,
} from "../utilities/error-handling";
import { useRecoilState } from "recoil";
import { userState } from "../resources/user";
import { UserType } from "../interfaces/user";
import Spinner from "../components/Spinner";

const AvailableSkills = [
  "Plumbing",
  "Solar Installation",
  "Tile Setting",
  "HVAC Repair",
  "Welding",
  "Carpentry",
  "Electrical Installation",
  "Auto Mechanics",
  "Motorcycle Repair",
  "Masonry",
  "Painting & Decorating",
  "Tailoring & Fashion Design",
  "Hairdressing",
  "Makeup Artistry",
  "Catering & Culinary Arts",
  "Pastry & Baking",
  "Graphic Design",
  "Computer Maintenance",
  "Phone Repair",
  "Agribusiness",
  "Beekeeping",
  "Animal Husbandry",
  "Aquaculture",
  "Driving & Defensive Driving",
  "Photography & Videography",
  "Event Management",
  "Barbering",
  "Metal Fabrication",
  "Bricklaying",
  "Interior Design",
  "Leather Craft",
  "Shoe Making",
  "Woodworking",
];

function SetSkills() {
  const navigate = useNavigate();

  const { isTutor } = useWrapperContext();

  const [user, setUser] = useRecoilState(userState);

  const skills = useMemo(() => {
    if (user.type === UserType.Tutor) {
      return user.skillsOfferred;
    }

    return user.skillsWanted;
  }, [user]);

  const [chosenSkills, setChosenSkills] = useState<string[]>(skills);

  const toggleSkill = (skill: string) => {
    if (chosenSkills.length >= 6) {
      if (!chosenSkills.includes(skill)) {
        return;
      }
    }

    setChosenSkills(
      prev =>
        prev.includes(skill)
          ? prev.filter(s => s !== skill) // unselect
          : [...prev, skill] // select
    );
  };

  const [updateUser, updateUserResult] = useMutation<
    UpdateUserResponse,
    UpdateUserInput
  >(UPDATE_USER);

  const handleUpdateUser = async (chosenSkills: string[]) => {
    try {
      const input: UpdateUserInput["input"] = {};

      if (isTutor) {
        input.skillsOfferred = chosenSkills;
      } else {
        input.skillsWanted = chosenSkills;
      }

      const response = await updateUser({ variables: { input } });

      if (response.errors) {
        return handleResponseErrors(response);
      }

      if (!response.data?.updateUser) {
        return;
      }

      setUser(response.data.updateUser);

      navigate({ to: "/profile" });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex items-center justify-between flex-col relative text-text px-10 max-lg:px-4">
        <div className="w-full h-40 bg-cardBgWeak absolute top-0 left-0"></div>
        <div className="w-full h-full max-w-[1200px] mx-auto min-h-32 z-10 pb-10 max-lg:pb-6">
          <h1 className="text-base py-5">
            What skills do you want to {isTutor ? "teach" : "learn"}?
          </h1>
          <div className="w-full flex max-lg:flex-col gap-6">
            <div className="w-full flex bg-bodyBg ring-1 ring-lines rounded-xl flex-col gap-2 min-h-32 p-5">
              <div className="w-full flex items-center justify-between flex-wrap max-lg: gap-3 mb-5">
                <h1 className="text-xl font-semibold ">Select Skills</h1>
                <p className="pb-2 text-sm italic text-text">
                  Selected: {chosenSkills.length} Skill
                  {chosenSkills.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 max-w-[900px]">
                {AvailableSkills.map(skill => {
                  const isSelected = chosenSkills.includes(skill);

                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm border outline-none ${
                        isSelected
                          ? "bg-mainWeak2 text-text dark:text-white border-main"
                          : "bg-transparent text-text border-lines"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-start justify-between w-full px-2 pt-10 pb-3">
                <p className="pb-2 text-base text-text"></p>
                <div className="w-fit flex gap-5">
                  <button
                    className="bg-main text-white w-fit px-4 py-2.5 rounded-xl text-sm flex items-center gap-1"
                    onClick={() => {
                      handleUpdateUser(chosenSkills);
                    }}
                  >
                    {updateUserResult.loading ? (
                      <Spinner message="Saving" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetSkills;
