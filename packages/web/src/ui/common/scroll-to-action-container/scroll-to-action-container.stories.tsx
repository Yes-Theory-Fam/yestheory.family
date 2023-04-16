import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import {
  ScrollToActionContainer,
  ScrollToActionContainerProps,
} from "./scroll-to-action-container";

export default {
  title: "Common/ScrollToActionContainer",
  component: ScrollToActionContainer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<ScrollToActionContainerProps>;

export const ScrollToActionContainerStory: StoryObj<ScrollToActionContainerProps> =
  {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const ctaButton = canvas.getByText("Click here");
      await userEvent.click(ctaButton);
    },
    name: "ScrollToActionContainer",
    render: () => (
      <>
        {/* Fake navigation to allow the scrolling to function properly */}
        <div
          className="bg-brand-300 fixed inset-x-0 top-0 h-6"
          id="navigation"
        />

        <ScrollToActionContainer text="Click here">
          <p className="text-xl text-brand-800 text-center mb-4">
            This is some example content of the scroll to action container
          </p>
        </ScrollToActionContainer>
        <div className="bg-brand-800 h-screen" />
      </>
    ),
  };
