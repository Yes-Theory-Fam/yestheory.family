import { h, FunctionalComponent } from "preact";
import { NavLinkProps } from "..";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileNavigation } from "./components/MobileNavigation";
import { Box } from "@chakra-ui/react";
import { User } from "../../../types";

export { Profile } from "./components/Profile/Profile";
export type { ProfileProps } from "./components/Profile/Profile";

export interface NavigationLinkProps extends NavLinkProps {
  text: string;
}

export interface NavigationProps {
  links: NavigationLinkProps[];
  user?: User | undefined;
}

export const Navigation: FunctionalComponent<NavigationProps> = (props) => (
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
    <Box display={["block", null, "none"]}>
      <MobileNavigation {...props} />
    </Box>
    <Box display={["none", null, "block"]}>
      <DesktopNavigation {...props} />
    </Box>
  </Box>
);
