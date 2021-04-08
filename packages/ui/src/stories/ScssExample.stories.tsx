import { h } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { ScssExample } from "../components";

export default {
  title: "Example/ScssExample",
  component: ScssExample,
} as Meta;

const Template: Story = () => <ScssExample />;
export const ScssExampleStory = Template.bind({});
