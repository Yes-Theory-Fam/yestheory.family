import { FC } from "react";
import { NavLinkProps } from "..";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileNavigation } from "./components/MobileNavigation";
import { Box } from "@chakra-ui/react";
import { User } from "../../../types";
import { NavigationBreakpoints } from "./NavigationBreakpoints";
import { MenuItemDefinition } from "./components/Profile/Profile";

export { Profile } from "./components/Profile/Profile";
export type { ProfileProps } from "./components/Profile/Profile";

export interface NavigationLinkProps extends NavLinkProps {
  text: string;
}

export interface NavigationProps {
  links: NavigationLinkProps[];
  onLoginButtonClick: () => void;
  user?: User | undefined;
  menuItems: MenuItemDefinition[];
}

export const Navigation: FC<NavigationProps> = (props) => {
  const DesktopNavigationBreakpoints = [...NavigationBreakpoints].reverse();

  return (
    <Box
      id={"navigation"}
      overflow={"auto"}
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      zIndex={"docked"}
      bg={"white"}
    >
      <Box display={NavigationBreakpoints}>
        <MobileNavigation {...props} />
      </Box>
      <Box display={DesktopNavigationBreakpoints}>
        <DesktopNavigation {...props} />
      </Box>
    </Box>
  );
};
