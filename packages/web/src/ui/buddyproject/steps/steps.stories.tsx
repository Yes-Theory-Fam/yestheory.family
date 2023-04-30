import { Meta, StoryObj } from "@storybook/react";
import {
  ChattingWithYourBuddyStep,
  JoinStep,
  MatchedStep,
  SignedUpConfirmationStep,
  WaitForMatchStep,
} from ".";
import { Step } from "../common";

export default {
  title: "Buddy Project/Steps",
  component: Step,
} satisfies Meta;

export const Steps: StoryObj = {
  render: () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <JoinStep />
        <WaitForMatchStep />
        <SignedUpConfirmationStep />
        <MatchedStep buddyName="ExampleBuddy#1234" />
        <ChattingWithYourBuddyStep />
      </div>
    );
  },
};
