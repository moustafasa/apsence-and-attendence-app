"use client";

import useSideBarToggleContext from "@/utilty/useSideBarToggleContext";
import { FaBars } from "react-icons/fa";

export default function ToggleDashboardSideNav() {
  const [, setIsOpen] = useSideBarToggleContext();
  return (
    <button
      className="md:hidden"
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      id="side-nav"
    >
      <FaBars />
    </button>
  );
}
