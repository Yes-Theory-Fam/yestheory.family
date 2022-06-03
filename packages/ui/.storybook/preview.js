import { withPerformance } from "storybook-addon-performance";
import { theme } from "../src/theme";
import "@storybook/addon-console";
import { Fonts } from "../src";
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
  chakra: {
    theme,
  },
};

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  return (
    <>
      <Fonts />
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <StoryFn />
      </div>
    </>
  );
};

export const decorators =
  process.env.NODE_ENV === "test" ? [] : [withChakra, withPerformance];
