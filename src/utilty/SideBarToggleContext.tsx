"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type SideBarToggleContext = [boolean, Dispatch<SetStateAction<boolean>>];
const initialValue = [false, () => {}] satisfies SideBarToggleContext;
type Props = { children: ReactNode };
export const sideBarToggleContext =
  createContext<SideBarToggleContext>(initialValue);

const SideBarToggleContextProvider = ({ children }: Props) => {
  const isOpenState = useState(false);
  return (
    <sideBarToggleContext.Provider value={isOpenState}>
      {children}
    </sideBarToggleContext.Provider>
  );
};

export default SideBarToggleContextProvider;
