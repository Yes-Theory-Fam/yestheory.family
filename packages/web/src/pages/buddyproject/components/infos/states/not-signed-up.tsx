import { FC } from "react";
import { ChattingWithYourBuddyStep } from "./steps/chatting-with-your-buddy";
import { JoinStep } from "./steps/join";
import { WaitForMatchStep } from "./steps/wait-for-match";

export const NotSignedUpInfos: FC = () => {
  return (
    <>
      <JoinStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
