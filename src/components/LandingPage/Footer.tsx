import React from "react";
import { Link } from "@tanstack/react-router";
import { FaMapLocation } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Logo } from "../../assets";

function Footer() {
  return (
    <>
      <div className="w-full bg-main text-white mt-20">
        <div className="w-full h-fit max-w-[1300px] mx-auto px-8 max-lg:px-5 p-10">
          <div className="w-full flex flex-wrap justify-between items-start max-lg:gap-6">
            <div className="flex flex-col items-start justify-start mb-8 max-lg:mb-0">
              <div className="text-lg font-semibold mb-4 flex items-center gap-2">
                <img
                  src={Logo}
                  alt=""
                  className="h-9 bg-white rounded-full p-1"
                />
                SkillSync
              </div>
              <p className="text-sm text-white mb-6 max-lg:mb-2 max-w-[300px]">
                Transforming Africa's potential through practical skills, one
                connection at a time.
              </p>
            </div>
            <div className="flex items-start flex-col gap-1 min-w-[200px] max-lg:mb-2">
              <h1 className="font-bold text-base mb-1">Quick Links</h1>
              {[
                { label: "Home", path: "/" },
                { label: "Mission", path: "#misson" },
                { label: "Find Tutors", path: "#tutors" },
                { label: "FAQs", path: "#faq" },
              ].map((link, index) => (
                <Link to={link.path} key={index} className="text-white ">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-start flex-col gap-1 max-lg:mb-2">
              <h1 className="font-bold text-base mb-1">Get in touch</h1>
              <p className="w-fit flex items-center justify-start gap-2">
                <FaMapLocation /> Kigali, Rwanda
              </p>
              <p className="w-fit flex items-center justify-start gap-2">
                <FaPhone />
                +2500011000
              </p>
              <p className="w-fit flex items-center justify-start gap-2">
                <IoMdMail />
                skillsync.africa@gmail.com
              </p>
            </div>
            <div className="flex items-start flex-col"></div>
          </div>
          <div className="w-full border-t border-white/30 max-w-[1300px] mx-auto px-8 max-lg:px-4 mt-10 mb-5 max-lg:my-6 ">
            <h1></h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-white">
              © 2025 SkillSync. All rights reserved.
            </div>
            <button className="text-sm">Back to top</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
