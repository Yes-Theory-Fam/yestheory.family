import { h, FunctionalComponent } from "preact";
import { DiscordLogo } from "../icons";
import { Button, ButtonProps } from "@chakra-ui/react";

export const LoginButton: FunctionalComponent<ButtonProps> = (args) => {
  const logoFillProps = {
    transition: "all 300ms",
    fill: args.variant === "outlined" ? "brand.800" : "white",
    _groupHover: {
      fill: "white",
    },
  };

  return (
    <Button size={"sm"} {...args} role={"group"}>
      <DiscordLogo mr={2} boxSize={4} {...logoFillProps} />
      Sign in with Discord
    </Button>
  );
};
