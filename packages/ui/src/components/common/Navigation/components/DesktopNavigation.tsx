import { FC } from "react";
import { LoginButton, Logo, NavLink } from "../..";
import { NavigationProps } from "../Navigation";
import { HStack, Box, Flex } from "@chakra-ui/react";
import { Profile } from "./Profile/Profile";
import { WrappedLink } from "../../..";

export const DesktopNavigation: FC<NavigationProps> = (props) => {
  const links = props.links.map((l) => {
    const { text, ...rest } = l;
    return (
      <NavLink {...rest} key={l.key ?? l.href}>
        {text}
      </NavLink>
    );
  });

  return (
    <Flex justifyContent={"center"} m={6}>
      <HStack spacing={12} maxW={"8xl"} w={"full"}>
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
    </Flex>
  );
};
