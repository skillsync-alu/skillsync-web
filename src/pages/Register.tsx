import { Logo } from "../assets";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { BsPersonVideo, BsShieldShaded } from "react-icons/bs";
import { LuArrowRight, LuSchool } from "react-icons/lu";
import { Link } from "@tanstack/react-router";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-y-auto relative">
      <img src={Logo} className="size-[400px] absolute bottom-0 left-0 max-2xl:-bottom-20 max-2xl:-left-20 saturate-0 opacity-[.03] pointer-events-none select-none " />
      <div className="w-full h-full p-6 flex flex-col">
        {/* logo */}
        <Link to="/" className="w-fit flex items-center justify-start gap-1">
          <img src={Logo} className="size-8" />
          <h1 className="text-xl font-medium">Skillsync</h1>
        </Link>

        <div className="w-full flex-1 py-[50px] flex flex-col items-start justify-center max-w-[400px] mx-auto">
          <h1 className="text-xl font-medium text-center w-full mb-1">Register</h1>

          <button className="ring-1 ring-lines shadow-md shadow-stone-200 active:scale-[0.98] transition-all text-textWeak select-none text-sm font-medium px-3 py-3 w-full flex items-center justify-center gap-2 mt-5 rounded-2xl">
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>
        </div>
        <p className="text-sm w-full text-center font-normal text-textWeak italic mb-1">
          Empower your learning journey with Skillsync
        </p>
      </div>
    </div>
  );
};

export default Register;
