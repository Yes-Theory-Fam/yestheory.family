import { FC } from "react";

import { ChattingWithYourBuddyStep } from "./steps/chatting-with-your-buddy";
import { SignedUpConfirmationStep } from "./steps/signed-up-confirmation";
import { WaitForMatchStep } from "./steps/wait-for-match";

export const SignedUpInfos: FC = () => {
  return (
    <>
      <SignedUpConfirmationStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
