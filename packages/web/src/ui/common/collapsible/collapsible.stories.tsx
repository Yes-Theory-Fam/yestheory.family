import { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleProps } from "./collapsible";

const config = {
  title: "Common/Collapsible",
  component: Collapsible,
} satisfies Meta<CollapsibleProps>;

export default config;

export const CollapsibleStory: StoryObj<typeof config> = {
  name: "Collapsible",
  args: {
    title: "I am a collapsible",
    children: <p>I am a paragraph that shows when the thing is clicked :)</p>,
  },
};

export const DefaultOpenCollapsible: StoryObj<typeof config> = {
  name: "Collapsible (open by default)",
  args: {
    ...CollapsibleStory.args,
    defaultOpen: true,
  },
};
