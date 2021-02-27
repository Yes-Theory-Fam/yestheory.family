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

export const Test = Template.bind({});
Test.args = {
  label: "Example/Button",
  variant: "outlined",
};

export const SolidButton = () => <Button label={"Button"} variant={"solid"} />;
export const OutlinedButton = () => (
  <Button label={"Button"} variant={"outlined"} />
);
export const CustomButton = (args: ButtonProps) => <Button {...args} />;
