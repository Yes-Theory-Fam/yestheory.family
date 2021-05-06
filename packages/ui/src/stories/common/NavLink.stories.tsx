import { h } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { NavLink } from "../../components";
import { HStack, VStack, Box } from "@chakra-ui/react";

export default {
  title: "Common/NavLink",
  component: NavLink,
} as Meta;

export const NavLinkStory: Story = () => (
  <VStack>
    <HStack p={4}>
      <NavLink>Not active</NavLink>
      <NavLink active>Very active</NavLink>
    </HStack>
    <HStack bg={"brand.800"} p={4}>
      <NavLink inverted>Not active</NavLink>
      <NavLink inverted active>
        Very active
      </NavLink>
    </HStack>
  </VStack>
);
NavLinkStory.storyName = "NavLink";

export const ActiveNavLink: Story = () => (
  <NavLink active>Example link</NavLink>
);
export const InactiveNavLink: Story = () => <NavLink>Example link</NavLink>;
export const ActiveInvertedNavLink: Story = () => (
  <Box bg={"brand.800"} p={4}>
    <NavLink inverted active>
      Example link
    </NavLink>
  </Box>
);
export const InactiveInvertedNavLink: Story = () => (
  <Box bg={"brand.800"} p={4}>
    <NavLink inverted>Example link</NavLink>
  </Box>
);
