import { h } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { NavLink } from "../components";

export default {
  title: "Example/NavLink",
  component: NavLink,
} as Meta;

export const NavLinkStory: Story = () => (
  <NavLink href={"https://example.com"}>Example</NavLink>
);
NavLinkStory.storyName = "NavLink";
