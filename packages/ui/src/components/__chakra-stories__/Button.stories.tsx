import { h } from "preact";
import { Button, ButtonProps } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { LoginButton } from "..";

export default {
  title: "Common/Button",
  component: Button,
  argTypes: {
    label: { control: "text" },
    variant: {
      options: ["solid", "outlined"],
      control: {
        type: "select",
      },
    },
  },
} as Meta<ButtonProps>;

const Template: Story<ButtonProps & { label: string }> = (args) => (
  <Button {...args}>{args.label}</Button>
);

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

export const LoginButtonStory: Story = () => <LoginButton />;
LoginButtonStory.storyName = "Login Button";
