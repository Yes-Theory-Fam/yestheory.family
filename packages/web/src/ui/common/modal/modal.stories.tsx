import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import { Modal, ModalProps } from "./modal";

export default {
  title: "Common/Modal",
  component: Modal,
} satisfies Meta<ModalProps>;

export const ModalStory = {
  name: "Modal",
  args: {
    title: "I am a modal",
    onCancel: undefined,
    children: (
      <p>Lorem ipsum or something, I don&apos;t know how this all works</p>
    ),
  },
};

export const CancellableModalStory = {
  ...ModalStory,
  args: {
    ...ModalStory.args,
    onCancel: action("cancelled"),
  },
};
