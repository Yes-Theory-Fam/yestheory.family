import { FC } from "react";
import { Step } from "../../common";
import { Text } from "@chakra-ui/react";

export const WaitForMatchStep: FC = () => (
  <Step heading={"What happens next?"}>
    <Text>
      As soon as the sign-up deadline is reached, everyone will be matched with
      a buddy.
    </Text>
    <Text>This might take a while so be patient!</Text>
    <Text>
      <Text as={"span"} fontWeight={"bold"}>
        YesBot
      </Text>
      , our very own bot, will message you on discord with the name of your
      partner, a set of questions and further instructions. You will then have
      to message your buddy.
    </Text>
  </Step>
);
