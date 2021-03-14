/** @jsx h */
import { ChakraProvider } from "@chakra-ui/react";
import { h } from "preact";
import { withPerformance } from "storybook-addon-performance";
import { theme } from "../src/theme";
import "@storybook/addon-console";
import { Fonts } from "../src/components/common";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
};

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators =
  process.env.NODE_ENV === "test" ? [] : [withChakra, withPerformance];
