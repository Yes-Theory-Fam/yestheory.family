import { FunctionalComponent } from "preact";
import { DiscordLink, Step } from "../../common";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

export const JoinStep: FunctionalComponent = () => (
  <Step heading={"How do I join?"}>
    <Text color={"brand.800"} fontWeight={"bold"}>
      Click the button down below!
    </Text>
    <Text>
      Once you do that, you will be asked to join the{" "}
      <Text as={"span"} fontWeight={"bold"}>
        Yes Theory Fam
      </Text>{" "}
      server (if you're not already in it). From then on, everything will be
      happening on the <DiscordLink />.
    </Text>
  </Step>
);
