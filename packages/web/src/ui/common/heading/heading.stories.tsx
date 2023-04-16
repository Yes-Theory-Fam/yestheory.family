import { Meta } from "@storybook/react";
import { Heading, HeadingProps } from "./heading";

export default {
  title: "Common/Heading",
  component: Heading,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<HeadingProps>;

export const HeadingStory = {
  name: "Heading",
  args: { frontText: "Photo", blueText: "wall" },
};
