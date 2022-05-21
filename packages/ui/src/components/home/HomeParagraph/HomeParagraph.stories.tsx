import { Story, Meta } from "@storybook/react/types-6-0";
import { HomeParagraph } from "../..";
import { heading, paragraphs } from "../_stories.data";

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
