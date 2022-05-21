import { Image, ImageProps } from "@chakra-ui/react";
import { Meta, Story } from "@storybook/react/types-6-0";

interface ArgProps {
  height: number;
  width: number;
  src: string;
  shadow: "imageLeft" | "imageRight" | "none";
}

export default {
  title: "Common/Image",
  component: Image,
  argTypes: {
    width: {
      control: {
        type: "range",
        min: 20,
        max: 800,
        step: 10,
      },
    },
    height: {
      control: {
        type: "range",
        min: 20,
        max: 800,
        step: 10,
      },
    },
    src: {
      control: {
        type: "text",
      },
    },
    shadow: {
      options: ["none", "imageLeft", "imageRight"],
      control: {
        type: "select",
      },
    },
  },
} as Meta<ArgProps>;

const Template: Story<ImageProps & ArgProps> = (args) => {
  const { height, width, src, ...rest } = args;
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={"Example image"}
      {...rest}
    />
  );
};

export const ImageStory = Template.bind({});
ImageStory.args = {
  height: 200,
  width: 200,
  src: "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg",
  shadow: "none",
};
ImageStory.storyName = "Image";
