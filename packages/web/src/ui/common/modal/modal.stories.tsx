import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalProps } from "./modal";

const config = {
  title: "Common/Modal",
  component: Modal,
} satisfies Meta<ModalProps>;

export default config;

export const ModalStory: StoryObj<typeof config> = {
  name: "Modal",
  args: {
    title: "I am a modal",
    onCancel: undefined,
    actions: [{ text: "Interesting", onClick: action("Interesting clicked") }],
    children: (
      <p>Lorem ipsum or something, I don&apos;t know how this all works</p>
    ),
  },
};

export const CancellableModalStory: StoryObj<typeof config> = {
  ...ModalStory,
  args: {
    ...ModalStory.args,
    onCancel: action("cancelled"),
  },
};
