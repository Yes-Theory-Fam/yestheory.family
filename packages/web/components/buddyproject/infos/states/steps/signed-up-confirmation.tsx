import { FunctionalComponent } from "preact";
import { DiscordLink, Step } from "../../common";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

export const SignedUpConfirmationStep: FunctionalComponent = () => (
  <Step heading={"You have signed up!"}>
    <Text>You are signed up for the buddy project.</Text>
    <Text>
      While you are waiting for your match, feel free to look around the{" "}
      <DiscordLink /> and get to know some of the people there!
    </Text>
  </Step>
);
