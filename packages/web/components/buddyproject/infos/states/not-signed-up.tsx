import { FunctionalComponent } from "preact";
import { ChattingWithYourBuddyStep, JoinStep, WaitForMatchStep } from "./steps";

export const NotSignedUpInfos: FunctionalComponent = () => {
  return (
    <>
      <JoinStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
