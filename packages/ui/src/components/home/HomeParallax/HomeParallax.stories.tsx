import { h } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";

import { HomeParallax } from "../..";
import { Box, Flex } from "@chakra-ui/react";

export default {
  title: "Home/Parallax",
  component: HomeParallax,
} as Meta;

export const HomeParallaxStory: Story = () => (
  <Flex direction={"column"}>
    <HomeParallax />
    <Box height={800} bg={"white"} />
  </Flex>
);
HomeParallaxStory.storyName = "Parallax";
HomeParallaxStory.parameters = { layout: "fullscreen" };
