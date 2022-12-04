import { FC } from "react";
import { NavigationProps } from "../Navigation";
import { LoginButton, Logo, NavLink } from "../..";
import {
  Flex,
  useDisclosure,
  VStack,
  DrawerContent,
  Drawer,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Profile } from "./Profile/Profile";
import { WrappedLink } from "../../../util";

interface NavBarProps {
  onMenuOpenClick: () => void;
}

const NavBar: FC<NavBarProps> = ({ onMenuOpenClick }) => (
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

const NavigationStack: FC<NavigationStackProps> = ({
  links,
  user,
  menuItems,
  onLoginButtonClick,
  onCloseClick,
}) => {
  const linkElements = links.map((l) => {
    const { text, ...rest } = l;
    return (
      <NavLink onClick={onCloseClick} {...rest} key={l.key ?? l.href} inverted>
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
        <WrappedLink onClick={onCloseClick} href={"/"} _hover={{}}>
          <Logo size={"sm"} variant={"white"} />
        </WrappedLink>
        <CloseIcon onClick={onCloseClick} color={"white"} />
      </Flex>
      <VStack spacing={4}>{linkElements}</VStack>
      {user ? (
        <Profile user={user} variant={"mobile"} menuItems={menuItems} />
      ) : (
        <LoginButton variant={"outlined"} onClick={onLoginButtonClick} />
      )}
    </VStack>
  );
};

export const MobileNavigation: FC<NavigationProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBar onMenuOpenClick={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose} size={"full"}>
        <DrawerContent>
          <NavigationStack {...props} onCloseClick={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};
