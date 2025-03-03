"use client";
import cn from "@/lib/cssConditional";
import DashboardSideItem from "./DashboardSideItem";
import useSideBarToggleContext from "@/utilty/useSideBarToggleContext";
import NavBarButtons from "./NavBarButtons";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = { links: LinkObj[] };
export default function DashboardSideNav({ links }: Props) {
  const [isOpen, setIsOpen] = useSideBarToggleContext();
  useEffect(() => {
    const hideAsideOnBlur = (e: MouseEvent) => {
      const element = e.target as HTMLElement | null;

      if (!element?.closest("#side-nav")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", hideAsideOnBlur);
    return () => {
      document.removeEventListener("click", hideAsideOnBlur);
    };
  }, [setIsOpen]);
  return (
    <aside
      className={cn(
        "w-60 shadow-lg z-40 bg-black-400 max-md:absolute max-md:h-full max-md:-left-full max-md:transition-all max-md:duration-300 max-md:invisible",
        {
          "max-md:left-0 max-md:visible ": isOpen,
        }
      )}
      id="side-nav"
    >
      <div className="capitalize p-3">
        <h2 className="my-3 text-xl ">pages</h2>
        <nav className=" space-y-3 text-nowrap">
          {links.map((link) => (
            <DashboardSideItem key={link.href} link={link} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
