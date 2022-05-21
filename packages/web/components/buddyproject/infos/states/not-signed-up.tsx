import { FC } from "react";
import { ChattingWithYourBuddyStep, JoinStep, WaitForMatchStep } from "./steps";

export const NotSignedUpInfos: FC = () => {
  return (
    <>
      <JoinStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
