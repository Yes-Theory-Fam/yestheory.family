import { Button, ButtonProps } from "./button";
import { Meta } from "@storybook/react";

export default {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<ButtonProps>;

export const SolidButton = { args: { children: "Button", variant: "solid" } };
export const OutlinedButton = {
  args: { children: "Button", variant: "outlined" },
};
