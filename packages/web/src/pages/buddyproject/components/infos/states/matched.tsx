import { FC } from "react";
import { ChattingWithYourBuddyStep } from "./steps/chatting-with-your-buddy";
import { MatchedStep } from "./steps/matched";
import { SignedUpConfirmationStep } from "./steps/signed-up-confirmation";

export const MatchedInfos: FC = () => {
  return (
    <>
      <SignedUpConfirmationStep />
      <MatchedStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
