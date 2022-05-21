import { FC } from "react";
import {
  ChattingWithYourBuddyStep,
  SignedUpConfirmationStep,
  WaitForMatchStep,
} from "./steps";

export const SignedUpInfos: FC = () => {
  return (
    <>
      <SignedUpConfirmationStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  );
};
