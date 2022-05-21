import { FC } from "react";
import {
  ChattingWithYourBuddyStep,
  MatchedStep,
  SignedUpConfirmationStep,
} from "./steps";

export const MatchedInfos: FC = () => {
  return (
    <>
      <SignedUpConfirmationStep />
      <MatchedStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
