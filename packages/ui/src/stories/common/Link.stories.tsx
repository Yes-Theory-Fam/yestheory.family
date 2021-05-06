import { h } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { Link } from "@chakra-ui/react";

export default {
  title: "Common/Link",
  component: Link,
} as Meta;

const Template: Story = () => <Link>I am a link</Link>;

export const LinkStory = Template.bind({});
LinkStory.storyName = "Link";
