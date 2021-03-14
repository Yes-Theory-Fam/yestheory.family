import { h, FunctionalComponent, Fragment } from "preact";
import { NavigationProps } from "../Navigation";
import { LoginButton, Logo, NavLink } from "../../index";
import { Flex, useDisclosure, Slide, VStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Profile } from "./Profile";
import { WrappedLink } from "../../../util";

interface NavBarProps {
  onMenuOpenClick: () => void;
}

const NavBar: FunctionalComponent<NavBarProps> = ({ onMenuOpenClick }) => (
  <Flex direction={"row"} justify={"space-between"} p={4} align={"center"}>
    <WrappedLink href={"/"} _hover={{}}>
      <Logo size={"sm"} />
    </WrappedLink>
    <HamburgerIcon onClick={onMenuOpenClick} boxSize={6} />
  </Flex>
);

interface NavigationStackProps extends NavigationProps {
  onCloseClick: () => void;
}

const NavigationStack: FunctionalComponent<NavigationStackProps> = ({
  links,
  user,
  onCloseClick,
}) => {
  const linkElements = links.map((l) => {
    const { text, ...rest } = l;
    return (
      <NavLink {...rest} inverted>
        {text}
      </NavLink>
    );
  });

  return (
    <VStack bg={"brand.800"} height={"full"} zIndex={"docked"} spacing={8}>
      <Flex
        direction={"row"}
        justify={"space-between"}
        p={4}
        w={"full"}
        align={"center"}
      >
        <WrappedLink href={"/"} _hover={{}}>
          <Logo size={"sm"} variant={"white"} />
        </WrappedLink>
        <CloseIcon onClick={onCloseClick} color={"white"} />
      </Flex>
      <VStack spacing={4}>{linkElements}</VStack>
      {user ? (
        <Profile user={user} variant={"mobile"} />
      ) : (
        <LoginButton variant={"outlined"} />
      )}
    </VStack>
  );
};

export const MobileNavigation: FunctionalComponent<NavigationProps> = (
  props
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBar onMenuOpenClick={onOpen} />
      <Slide direction={"right"} in={isOpen}>
        <NavigationStack {...props} onCloseClick={onClose} />
      </Slide>
    </>
  );
};
