import { Link } from "@tanstack/react-router";
import React from "react";

function HeroSection() {
  return (
    <div className="w-full h-fit py-24 max-2xl:py-14 flex flex-col items-center justify-center text-center px-5">
      <p className="px-3 py-2 mb-0 rounded-xl bg-cardBg text-xs font-medium">
        GROW DEEPER
      </p>
      <h1 className="my-4 max-w-[1000px] max-2xl:max-w-[1100px] leading-snug max-lg:text-4xl text-6xl text-center font-medium YoungSerif">
        Connecting Africa's youth with skilled professionals
      </h1>
      <p className="py-2 max-w-[530px] text-center text-textWeak font-normal leading-normal text-lg">
        Master vocational skills that power communities and create lasting
        opportunities
      </p>
      <div className="w-full flex items-center justify-center py-6 gap-4 max-md:flex-col">
        <Link to="/" className="min-w-[170px] max-md:min-w-full bg-main text-white px-5 py-3.5 text-base rounded-2xl transition-all capitalize font-medium hover:scale-105">Find Tutor</Link>
        <Link to="/register" className="min-w-[170px] max-md:min-w-full bg-lines px-5 py-3.5 text-base rounded-2xl transition-all capitalize font-medium hover:scale-105">Become a Tutor</Link>
      </div>
    </div>
  );
}

export default HeroSection;
