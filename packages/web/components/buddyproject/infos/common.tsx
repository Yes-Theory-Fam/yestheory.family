import { FunctionalComponent } from "preact";
import { GridItem, Link, Text, VStack } from "@chakra-ui/react";

export const SectionHeading: FunctionalComponent<{ text: string }> = ({
  text,
}) => (
  <Text color={"gray.800"} fontSize={"2xl"} fontWeight={"bold"}>
    {text}
  </Text>
);

export const Step: FunctionalComponent<{ heading: string }> = ({
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

export const DiscordLink: FunctionalComponent = () => (
  <Link href={"https://discord.gg/yestheory"}>Yes Theory Fam Discord</Link>
);
