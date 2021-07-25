import { FunctionalComponent, h } from "preact";
import {
  Avatar,
  AvatarBadge,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { User } from "../../../../../types";

export interface MenuItemDefinition {
  label: string;
  onClick?: () => void;
}

export interface ProfileProps {
  user: User;
  variant: "desktop" | "mobile";
  menuItems: MenuItemDefinition[];
}

export const Profile: FunctionalComponent<ProfileProps> = (props) => {
  const { variant } = props;
  const textColor = variant === "desktop" ? "brand.800" : "white";
  const tagColor = variant === "desktop" ? "gray.800" : "white";

  const getText = (visible: boolean) => (
    <Text
      color={textColor}
      fontSize={10}
      visibility={visible ? "visible" : "hidden"}
    >
      Logged in as:
    </Text>
  );

  const { username, avatarUrl } = props.user;

  return (
    <Menu autoSelect={false}>
      <MenuButton>
        <VStack align={"flex-start"} spacing={1}>
          {getText(true)}
          <HStack spacing={2}>
            <Avatar
              name={username}
              src={avatarUrl}
              color={textColor}
              bg={"transparent"}
            >
              <AvatarBadge boxSize={4} background={"green"} />
            </Avatar>
            <Text color={tagColor}>{username}</Text>
          </HStack>
          {getText(false)}
        </VStack>
      </MenuButton>
      <Portal>
        <MenuList zIndex={"dropdown"}>
          {props.menuItems.map((i) => (
            <MenuItem onClick={i.onClick}>{i.label}</MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};
