import { FC } from "react";
import { DiscordLink, Step } from "../../common";
import { Text } from "@chakra-ui/react";

export const SignedUpConfirmationStep: FC = () => (
  <Step heading={"You have signed up!"}>
    <Text>You are signed up for the Buddy Project.</Text>
    <Text>
      While you are waiting for your match, feel free to look around the{" "}
      <DiscordLink /> and get to know some of the people there!
    </Text>
  </Step>
);
