import { Button as B } from "@chakra-ui/react";
import { FunctionComponent, h } from "preact";

export interface ButtonProps {
  label: string;
  variant: "solid" | "outlined";
}

export const Button: FunctionComponent<ButtonProps> = ({ label, variant }) => (
  <B variant={variant}>{label}</B>
);
