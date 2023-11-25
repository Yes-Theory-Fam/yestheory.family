import { Meta, StoryObj } from "@storybook/react";
import {
  GroupChatSearchBar,
  GroupChatSearchBarProps,
} from "./group-chat-search-bar";
import { action } from "@storybook/addon-actions";

const config = {
  title: "Groupchats/GroupChatSearchBar",
  component: GroupChatSearchBar,
  args: {
    onSearchChange: action("searchChange"),
  },
} satisfies Meta<GroupChatSearchBarProps>;

export default config;

export const GroupChatSearchBarStory: StoryObj<typeof config> = {
  name: "GroupChatSearchBar",
};
