import { FC } from "react";
import { NavigationProps } from "../navigation.types";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

export const Navigation: FC<NavigationProps> = (props) => {
  return (
    <div id="navigation" className="fixed z-10 inset-x-0 top-0 bg-white">
      <MobileNavigation {...props} />
      <DesktopNavigation {...props} />
    </div>
  );
};
