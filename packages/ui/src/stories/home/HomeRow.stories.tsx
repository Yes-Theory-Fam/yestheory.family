import { h } from "preact";
import { Meta, Story } from "@storybook/preact/types-6-0";
import { HomeRow, HomeRowProps } from "../../components";
import { heading, paragraphs } from "./common";

interface Args {
  direction: HomeRowProps["direction"];
}

export default {
  title: "Home/Row",
  component: HomeRow,
  argTypes: {
    direction: {
      options: ["ltr", "rtl"],
      control: {
        type: "select",
      },
    },
  },
} as Meta<Args>;

export const HomeRowStory: Story<Args> = (args) => {
  return (
    <HomeRow
      image={{
        src:
          "https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg",
        alt: "Image of a cute kitten :)",
      }}
      paragraph={{ heading, paragraphs, buttonHref: "#" }}
      direction={args.direction}
    />
  );
};
HomeRowStory.storyName = "Row";
HomeRowStory.args = {
  direction: "ltr",
};
