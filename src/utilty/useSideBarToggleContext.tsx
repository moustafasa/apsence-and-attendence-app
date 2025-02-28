import { useContext } from "react";
import { sideBarToggleContext } from "./SideBarToggleContext";

export default function useSideBarToggleContext() {
  const isOpenState = useContext(sideBarToggleContext);
  return isOpenState;
}
