import { FC, ReactNode } from "react";
import { GridItem, Link, Text, VStack } from "@chakra-ui/react";

export const SectionHeading: FC<{ text: string }> = ({ text }) => (
  <Text color={"gray.800"} fontSize={"2xl"} fontWeight={"bold"}>
    {text}
  </Text>
);

export const Step: FC<{ heading: string; children: ReactNode }> = ({
  heading,
  children,
}) => (
  <GridItem>
    <VStack align={"flex-start"}>
      <SectionHeading text={heading} />
      {children}
    </VStack>
  </GridItem>
);

export const DiscordLink: FC = () => (
  <Link href={"https://discord.gg/yestheory"}>
    Yes Theory Fam Discord server
  </Link>
);
