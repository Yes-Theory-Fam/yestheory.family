import { FC } from "react";
import { DiscordLink, Step } from "../common";
import { Link } from "ui";

export type MatchedStepProps = {
  buddyName: string;
};

export const MatchedStep: FC<MatchedStepProps> = ({ buddyName }) => {
  return (
    <Step heading={"You were matched!"}>
      <p>
        Great news! You have been matched by YesBot and your buddy is{" "}
        <strong>{buddyName}</strong>. Reach out to them on Discord to get
        chatting.
      </p>
      <p>
        You can find instructions on how to contact your buddy{" "}
        <Link href={"https://example.com"}>here</Link>.
      </p>
      <p>
        If you need any additional help, feel free to ask on the <DiscordLink />
        !
      </p>
    </Step>
  );
};
