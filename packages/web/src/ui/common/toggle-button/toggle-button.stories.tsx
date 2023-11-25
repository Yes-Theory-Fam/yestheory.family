import { Meta, StoryObj } from "@storybook/react";
import { ToggleButton, ToggleButtonProps } from "./toggle-button";

const config = {
  title: "Common/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  args: {
    label: "Toggle me!",
  },
} satisfies Meta<ToggleButtonProps>;

export default config;

export const InteractiveToggleButton: StoryObj<typeof config> = {
  name: "ToggleButton",
};

export const CheckedToggleButton: StoryObj<typeof config> = {
  name: "Checked ToggleButton",
  args: {
    checked: true,
  },
};

export const UncheckedToggleButton: StoryObj<typeof config> = {
  name: "Unchecked ToggleButton",
  args: {
    checked: false,
  },
};
