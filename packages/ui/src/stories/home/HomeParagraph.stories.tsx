import { h } from "preact";
import { Story, Meta } from "@storybook/preact/types-6-0";
import { HomeParagraph } from "../../components";
import { heading, paragraphs } from "./common";

export default {
  title: "Home/Paragraph",
  component: HomeParagraph,
} as Meta;

export const HomeParagraphStory: Story = () => {
  return (
    <HomeParagraph heading={heading} paragraphs={paragraphs} buttonHref={"#"} />
  );
};
HomeParagraphStory.storyName = "Paragraph";
