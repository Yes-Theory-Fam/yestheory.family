import { Meta, StoryObj } from "@storybook/react";
import { InfoGrid, InfoGridProps } from "./info-grid";

export default {
  title: "Buddy Project/InfoGrid",
  component: InfoGrid,
  args: {
    buddyName: "ExampleBuddy#1234",
    state: "NOT_SIGNED_UP",
  },
  decorators: [
    (Story) => (
      <div className="max-w-7xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<InfoGridProps>;

export const InfoGridStory: StoryObj = { name: "InfoGrid" };
