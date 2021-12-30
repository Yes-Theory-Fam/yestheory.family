import { FunctionalComponent } from "preact";
import { DiscordLink, Step } from "../../common";
import { Text, Link } from "@chakra-ui/react";
import { useBuddyProjectState } from "../../../context/context";

export const MatchedStep: FunctionalComponent = () => {
  const state = useBuddyProjectState();
  const buddyName = state.buddy.username;

  return (
    <Step heading={"You were matched!"}>
      <Text>
        Great news! You have been matched by YesBot and your buddy is{" "}
        <Text as={"span"} fontWeight={"bold"}>
          {buddyName}
        </Text>
        . Reach out to them on Discord to get chatting.
      </Text>
      <Text>
        You can find instructions on how to contact your buddy{" "}
        <Link href={"https://example.com"}>here</Link>.
      </Text>
      <Text>
        If you need any additional help, feel free to ask on the <DiscordLink />
        !
      </Text>
    </Step>
  );
};
