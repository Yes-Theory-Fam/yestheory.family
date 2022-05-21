import { Meta, Story } from "@storybook/react/types-6-0";
import { Navigation, ScrollToActionContainer } from "../..";
import { Box, Text } from "@chakra-ui/react";

export default {
  title: "Common/ScrollToActionContainer",
  component: ScrollToActionContainer,
} as Meta;

export const ScrollToActionContainerStory: Story = () => (
  <>
    <ScrollToActionContainer text={"Click here"}>
      <Text fontSize={"xl"} color={"brand.800"} align={"center"} mb={4}>
        This is some example content of the scroll to action container
      </Text>
    </ScrollToActionContainer>
    <Box bg={"brand.800"} h={"100vh"} />
  </>
);
ScrollToActionContainerStory.storyName = "ScrollToActionContainer";
ScrollToActionContainerStory.parameters = { layout: "fullscreen" };

export const ScrollToActionContainerWithNavigationStory: Story = () => (
  <>
    <Navigation
      links={[]}
      onLoginButtonClick={() => undefined}
      menuItems={[]}
    />
    <ScrollToActionContainer text={"Click here"}>
      <Text fontSize={"xl"} color={"brand.800"} align={"center"} mb={4}>
        This is some example content of the scroll to action container
      </Text>
    </ScrollToActionContainer>
    <Box bg={"brand.800"} h={"100vh"} />
  </>
);
ScrollToActionContainerWithNavigationStory.storyName =
  "ScrollToActionContainer with Navigation";
ScrollToActionContainerWithNavigationStory.parameters = {
  layout: "fullscreen",
};
