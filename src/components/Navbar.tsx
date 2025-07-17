import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { Logo } from "../assets";
import {
  HiMiniUserGroup,
  HiHome,
  HiHandThumbUp,
  HiBriefcase,
} from "react-icons/hi2";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { userState } from "../resources/user";
import { getFullName } from "../utilities/names";
import UserAvatar from "./UserAvatar";
import { UserType } from "../interfaces/user";
import { useWrapperContext } from "./Wrapper";

const defaultNavLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: HiHome,
  },
  {
    to: "/matches",
    label: "My Matches",
    icon: HiHandThumbUp,
  },
];

function Navbar() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [showMoblieMenu, setShowMobileMenu] = useState(false);

  const [user] = useRecoilState(userState);

  const { handleLogout } = useWrapperContext();

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const linkBaseClasses =
    "font-normal text-sm transition-colors flex items-center gap-2 py-4 px-2 max-lg:px-6 relative h-full max-lg:w-full h-[50px]";

  const navLinks = useMemo(() => {
    if (user.type === UserType.Tutor) {
      return defaultNavLinks.concat({
        to: "/skills",
        label: "Set Skills",
        icon: HiBriefcase,
      });
    }

    return defaultNavLinks.concat({
      to: "/tutors",
      label: "Find Tutors",
      icon: HiMiniUserGroup,
    });
  }, [user.type]);

  return (
    <nav
      className={`w-full h-fit px-10 max-lg:px-4 bg-bodyBg border-b border-lines transition-all duration-300 sticky top-0 z-50
    ${showMoblieMenu ? "max-lg:mb-[170px] " : ""}
    `}
    >
      <div className="w-full h-full min-h-[55px] max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Navigation Links */}
        <div className=" flex-1 flex items-center gap-6 max-lg:gap-0 h-full">
          {/* Home button */}
          <Link
            to="/"
            className="flex items-center gap-2 text-weak hover:bg-main/10 rounded-xl px-3 py-2 transition-colors mr-2"
            title="Go to homepage"
          >
            <HiHome className="text-2xl" />
            <span className="font-medium text-base max-lg:hidden">Home</span>
          </Link>
          {/* menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMoblieMenu)}
            className="text-sm w-fit min-w-9 rounded-2xl transition text-center hidden max-lg:flex items-center justify-center gap-2 group "
          >
            <HiOutlineMenuAlt2 className="text-[28px] text-textWeak transition" />
          </button>
          <div className="w-fit flex max-lg:w-full items-center justify-center">
            <Link
              to="/dashboard"
              className="text-lg font-semibold flex items-center gap-2 mr-6 w-fit"
            >
              <img src={Logo} alt="Logo" className="h-9" />
              SkillSync
            </Link>
            <div
              className={`w-fit h-fit flex items-center gap-6 overflow-y-clip max-lg:absolute max-lg:top-[55.5px] transition-all duration-300 max-lg:border-b max-lg:flex-col bg-bodyBg max-lg:w-full max-lg:justify-center max-lg:gap-0
                ${showMoblieMenu ? "max-lg:h-[170px] max-lg:border-lines " : "max-lg:h-0 max-lg:border-transparent"}
                `}
            >
              {navLinks.map(({ to, label, icon: Icon }) => {
                const isActive = pathname === to;
                return (
                  <Link
                    key={label}
                    to={to}
                    className={`${linkBaseClasses}
                ${isActive ? "text-text" : "text-textWeak hover:text-text"}`}
                  >
                    <Icon className="text-xl mb-0.5" />
                    {label}
                    {isActive && (
                      <div className="w-full absolute bottom-0 left-0 h-0.5 max-lg:h-full max-lg:w-1 bg-main" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* profile */}
        <div className="flex items-center space-x-6 h-full relative">
          <button
            className="text-sm flex items-center justify-start gap-3 hover:bg-cardBg h-full py-2 px-4 max-lg:px-0 max-lg:hover:bg-transparent focus:outline-none"
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open profile menu"
            tabIndex={0}
          >
            <div className="size-9 aspect-square min-w-fit rounded-full overflow-hidden flex items-center justify-center">
              <UserAvatar />
            </div>
            <div className="flex items-start justify-center flex-col max-lg:hidden">
              <p>{getFullName(user)}</p>
              <p className="text-xs text-textWeak">{user.email}</p>
            </div>
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 top-14 bg-cardBg border border-lines rounded-xl shadow-lg min-w-[160px] z-50 flex flex-col py-2"
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-main/10 text-text font-medium rounded-t-xl transition-colors"
                onClick={() => {
                  setMenuOpen(false);
                  navigate({ to: "/profile" });
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-redWeak/20 text-red-500 font-medium rounded-b-xl transition-colors"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
