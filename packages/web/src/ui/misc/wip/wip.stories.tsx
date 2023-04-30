import { Meta } from "@storybook/react";
import { Wip } from "./wip";

export default {
  title: "Misc/404",
  component: Wip,
  decorators: [
    (Story) => (
      <div className="max-w-7xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export const Story = { name: "404" };
