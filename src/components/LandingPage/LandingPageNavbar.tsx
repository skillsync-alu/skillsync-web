import { Link } from "@tanstack/react-router";
import React from "react";
import { Logo } from "../../assets";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function LandingPageNavbar({ isScrolled }: { isScrolled?: boolean }) {
  return (
    <nav
      className={`w-full h-fit px-10 max-lg:px-5 py-3.5 bg-white border-lines transition-shadow duration-300 sticky top-0 z-50 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-semibold flex items-center justify-center gap-2 mr-6"
        >
          <img src={Logo} alt="" className="h-9" />
          SkillSync
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-9">
          <button
            onClick={() => scrollToSection("home")}
            className="text-text hover:text-main font-normal text-sm transition-colors"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("mission")}
            className="text-text hover:text-main font-normal text-sm transition-colors"
          >
            Mission
          </button>
          <button
            onClick={() => scrollToSection("tutors")}
            className="text-text hover:text-main font-normal text-sm transition-colors"
          >
            Tutors
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-text hover:text-main font-normal text-sm transition-colors"
          >
            FAQs
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="text-text hover:text-main font-normal text-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-main text-white px-4 py-2 text-sm rounded-xl transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingPageNavbar;
