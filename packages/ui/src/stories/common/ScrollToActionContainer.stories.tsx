import { h, Fragment } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { Navigation, ScrollToActionContainer } from "../../components";
import { Box, Text } from "@chakra-ui/react";

export default {
  title: "Common/ScrollToActionContainer",
  component: ScrollToActionContainer,
} as Meta;

export const ScrollToActionContainerStory: Story = () => (
  <Fragment>
    <ScrollToActionContainer text={"Click here"}>
      <Text fontSize={"xl"} color={"brand.800"} align={"center"} mb={4}>
        This is some example content of the scroll to action container
      </Text>
    </ScrollToActionContainer>
    <Box bg={"brand.800"} h={"100vh"} />
  </Fragment>
);
ScrollToActionContainerStory.storyName = "ScrollToActionContainer";
ScrollToActionContainerStory.parameters = { layout: "fullscreen" };

export const ScrollToActionContainerWithNavigationStory: Story = () => (
  <Fragment>
    <Navigation links={[]} />
    <ScrollToActionContainer text={"Click here"}>
      <Text fontSize={"xl"} color={"brand.800"} align={"center"} mb={4}>
        This is some example content of the scroll to action container
      </Text>
    </ScrollToActionContainer>
    <Box bg={"brand.800"} h={"100vh"} />
  </Fragment>
);
ScrollToActionContainerWithNavigationStory.storyName =
  "ScrollToActionContainer with Navigation";
ScrollToActionContainerWithNavigationStory.parameters = {
  layout: "fullscreen",
};
