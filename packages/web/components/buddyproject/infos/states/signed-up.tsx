import { FunctionalComponent } from "preact";
import {
  ChattingWithYourBuddyStep,
  SignedUpConfirmationStep,
  WaitForMatchStep,
} from "./steps";

export const SignedUpInfos: FunctionalComponent = () => {
  return (
    <>
      <SignedUpConfirmationStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
