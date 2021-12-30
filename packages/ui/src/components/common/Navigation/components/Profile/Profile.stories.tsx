import { h } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { Box } from "@chakra-ui/react";

import { Profile } from "../../../..";
import { User } from "../../../../../types";

export default {
  title: "Common/Navigation/Profile",
  component: Profile,
} as Meta;

const user: User = {
  username: "geisterfurz007#5952",
  avatarUrl: "https://i.pravatar.cc/150?img=57",
};

export const DesktopProfileStory: Story = () => (
  <Box p={4}>
    <Profile user={user} variant={"desktop"} menuItems={[]} />
  </Box>
);
DesktopProfileStory.storyName = "Desktop Profile";

export const MobileProfileStory: Story = () => (
  <Box bg={"brand.800"} p={4}>
    <Profile user={user} variant={"mobile"} menuItems={[]} />
  </Box>
);
MobileProfileStory.storyName = "Mobile Profile";
