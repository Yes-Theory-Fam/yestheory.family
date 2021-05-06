import { FunctionalComponent, h } from "preact";
import { Avatar, AvatarBadge, HStack, Text, VStack } from "@chakra-ui/react";
import { User } from "../../../../types";

export interface ProfileProps {
  user: User;
  variant: "desktop" | "mobile";
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

  const { discordTag, avatarUrl } = props.user;

  return (
    <VStack align={"flex-start"} spacing={1}>
      {getText(true)}
      <HStack spacing={2}>
        <Avatar
          name={discordTag}
          src={avatarUrl}
          color={textColor}
          bg={"transparent"}
        >
          <AvatarBadge boxSize={4} background={"green"} />
        </Avatar>
        <Text color={tagColor}>{discordTag}</Text>
      </HStack>
      {getText(false)}
    </VStack>
  );
};
