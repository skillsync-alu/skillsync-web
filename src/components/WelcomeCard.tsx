import { Link } from "@tanstack/react-router";
import React from "react";
import { GoodNewsDark, GoodNewsLight } from "../assets";

function WelcomeCard() {
  return (
    <div className="w-full flex bg-bodyBg ring-1 ring-lines rounded-xl min-h-32 p-5">
      <div className="flex-1 flex flex-col min-h-full">
        <h1 className="text-xl font-semibold">Welcome back, James</h1>
        <p className="py-2 text-sm text-textWeak">
          You have <strong>5</strong> new possible matches
        </p>
        <div className="flex-1 flex flex-col items-start justify-end">
          <Link to="/" className="text-main text-sm">
            View Matches
          </Link>
        </div>
      </div>
      <div className="w-fit">
        {/* for light mode */}
        <img
          src={GoodNewsLight}
          alt=""
          className="h-[160px] max-md:h-32 max-sm:h-20 max-sm:hidden min-w-fit dark:hidden"
        />
        {/* for dark mode */}
        <img
          src={GoodNewsDark
          }
          alt=""
          className="h-[160px] max-md:h-32 max-sm:h-20 max-sm:hidden min-w-fit hidden dark:flex"
        />
      </div>
    </div>
  );
}

export default WelcomeCard;
