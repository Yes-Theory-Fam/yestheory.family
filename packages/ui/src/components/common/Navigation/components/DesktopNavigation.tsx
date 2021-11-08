import { h, FunctionalComponent } from "preact";
import { LoginButton, Logo, NavLink } from "../..";
import { NavigationProps } from "../Navigation";
import { HStack, Box } from "@chakra-ui/react";
import { Profile } from "./Profile/Profile";
import { WrappedLink } from "../../..";

export const DesktopNavigation: FunctionalComponent<NavigationProps> = (
  props
) => {
  const links = props.links.map((l) => {
    const { text, ...rest } = l;
    return (
      <NavLink {...rest} key={l.key}>
        {text}
      </NavLink>
    );
  });

  return (
    <Box align={"center"} m={6}>
      <HStack spacing={12} maxW={"8xl"}>
        <WrappedLink mr={"auto"} href={"/"} _hover={{}}>
          <Logo />
        </WrappedLink>
        {links}
        {props.user ? (
          <Profile
            user={props.user}
            variant={"desktop"}
            menuItems={props.menuItems}
          />
        ) : (
          <LoginButton onClick={props.onLoginButtonClick} />
        )}
      </HStack>
    </Box>
  );
};
