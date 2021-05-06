import { h } from "preact";
import { Story, Meta } from "@storybook/preact/types-6-0";
import { Footer, FooterProps, FooterLinkDefinition } from "../../components";

export default {
  title: "Common/Footer",
  component: Footer,
} as Meta;

const links: FooterLinkDefinition[] = [
  {
    text: "Yes Theory",
    href: "https://yestheory.com",
    isExternal: true,
  },
  {
    text: "Seek Discomfort",
    href: "https://seekdiscomfort.com",
    isExternal: true,
  },
  {
    text: "Example",
    href: "https://example.com",
    isExternal: true,
  },
];

export const FooterStory: Story<FooterProps> = (args) => (
  <Footer {...args} links={links} />
);
FooterStory.storyName = "Footer";
