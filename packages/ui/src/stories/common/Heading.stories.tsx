import { h } from "preact";
import { Story, Meta } from "@storybook/preact/types-6-0";
import { Heading, HeadingProps, HeadingSize } from "../../components";
import { VStack } from "@chakra-ui/react";

const sizes: HeadingSize[] = ["h1", "h2"];
export default {
  title: "Common/Heading",
  component: Heading,
  args: {
    frontText: "Photo",
    blueText: "wall",
    size: "h1",
  },
  argTypes: {
    frontText: {
      control: {
        type: "text",
      },
    },
    blueText: {
      control: {
        type: "text",
      },
    },
    backText: {
      control: {
        type: "text",
      },
    },
    size: {
      options: sizes,
      control: {
        type: "select",
      },
    },
  },
} as Meta<HeadingProps>;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const HeadingsStory: Story<HeadingProps> = (args) => {
  return (
    <VStack spacing={4}>
      {sizes.map((size) => (
        <Heading {...args} size={size} />
      ))}
    </VStack>
  );
};
HeadingsStory.storyName = "Heading";

export const HeadingStory = Template.bind({});
HeadingStory.storyName = "Interactive Heading";
