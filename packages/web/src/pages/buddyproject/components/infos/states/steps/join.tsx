import { FC } from "react";
import { Step } from "../../common";
import { Link, Text } from "@chakra-ui/react";

export const JoinStep: FC = () => (
  <Step heading={"How do I join?"}>
    <Text color={"brand.800"} fontWeight={"bold"}>
      Click the button down below!
    </Text>
    <Text>
      Once you do that, you will be asked to join the{" "}
      <Link href={"https://discord.gg/yestheory"}>Yes Theory Fam server</Link>{" "}
      on <Link href={"https://discord.com"}>Discord</Link> (if you&apos;re not
      already in it). From then on, everything will be happening over there.
    </Text>
  </Step>
);
