import { Meta } from "@storybook/react";
import { Link, LinkProps } from "./link";

export default {
  title: "Common/Link",
  component: Link,
  argTypes: {
    variant: {
      options: ["inline", "black"],
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<LinkProps>;

export const LinkStory = {
  name: "Link",
  args: { href: "#", children: "I am a link" },
};
