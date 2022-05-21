import { Meta, Story } from "@storybook/react/types-6-0";
import { Navigation, NavigationProps } from "../..";

export default {
  title: "Common/Navigation/Navigation",
  component: Navigation,
} as Meta;

const props: NavigationProps = {
  onLoginButtonClick: () => undefined,
  menuItems: [],
  links: [
    {
      text: "Blog",
      href: "/blog",
    },
    {
      text: "Photowall",
      href: "/photowall",
      active: true,
    },
  ],
};

export const NavigationStory: Story = () => <Navigation {...props} />;
NavigationStory.storyName = "Navigation";
NavigationStory.parameters = { layout: "fullscreen" };

export const NavigationAuthenticatedStory: Story = () => (
  <Navigation
    {...props}
    user={{
      username: "geisterfurz007#5952",
      avatarUrl:
        "https://cdn.discordapp.com/avatars/290193372407136256/833dd63e1e26f29473ca038b50c993e0.png?size=256",
    }}
  />
);
NavigationAuthenticatedStory.storyName = "Navigation logged in";
NavigationAuthenticatedStory.parameters = { layout: "fullscreen" };
