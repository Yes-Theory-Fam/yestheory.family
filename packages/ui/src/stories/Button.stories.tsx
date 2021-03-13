import { h } from "preact";
import { Button, ButtonProps } from "./Button";
import { Meta, Story } from "@storybook/preact/types-6-0";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    label: { control: "text" },
    variant: {
      control: {
        type: "select",
        options: ["solid", "outlined"],
      },
    },
  },
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const SolidButton = Template.bind({});
SolidButton.args = {
  label: "Button",
  variant: "solid",
};

export const OutlinedButton = Template.bind({});
OutlinedButton.args = {
  label: "Button",
  variant: "outlined",
};
