import { FunctionalComponent } from "preact";
import {
  ChattingWithYourBuddyStep,
  MatchedStep,
  SignedUpConfirmationStep,
} from "./steps";

export const MatchedInfos: FunctionalComponent = () => {
  return (
    <>
      <SignedUpConfirmationStep />
      <MatchedStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
