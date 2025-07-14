import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "@tanstack/react-router";
import { TbPencil } from "react-icons/tb";
import { RiEarthLine, RiInformationLine } from "react-icons/ri";

function SetSkills() {
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

  const [chosenSkills, setChosenSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setChosenSkills(
      (prev) =>
        prev.includes(skill)
          ? prev.filter((s) => s !== skill) // unselect
          : [...prev, skill] // select
    );
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex items-center justify-between flex-col relative text-text px-10 max-lg:px-4">
        <div className="w-full h-40 bg-cardBgWeak absolute top-0 left-0"></div>
        <div className="w-full h-full max-w-[1200px] mx-auto min-h-32 z-10 pb-10 max-lg:pb-6">
          <h1 className="text-base py-5">What Skills you want to Learn?</h1>
          <div className="w-full flex max-lg:flex-col gap-6">
            <div className="w-full flex bg-bodyBg ring-1 ring-lines rounded-xl flex-col gap-2 min-h-32 p-5">
              <div className="w-full flex items-center justify-between flex-wrap max-lg: gap-3 mb-5">
                <h1 className="text-xl font-semibold ">
                  Select Skills
                </h1>
                <p className="pb-2 text-sm italic text-text">
                  Selected: {chosenSkills.length} Skills
                </p>
              </div>

              <div className="flex flex-wrap gap-3 max-w-[900px]">
                {AvailableSkills.map((skill) => {
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
                  <Link
                    to="/profile"
                    className="bg-main text-white w-fit px-4 py-2.5 rounded-xl text-sm flex items-center gap-1"
                    onClick={() => {
                      // you can save chosenSkills to localStorage or send to API here
                      console.log("Saving skills:", chosenSkills);
                    }}
                  >
                    Save Changes
                  </Link>
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
