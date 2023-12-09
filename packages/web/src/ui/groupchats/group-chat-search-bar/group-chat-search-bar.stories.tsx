import {action} from '@storybook/addon-actions';
import {type Meta, type StoryObj} from '@storybook/react';
import {
  GroupChatSearchBar,
  type GroupChatSearchBarProps,
} from './group-chat-search-bar';

const config = {
  title: 'Groupchats/GroupChatSearchBar',
  component: GroupChatSearchBar,
  args: {
    onSearchChange: action('searchChange'),
    search: {query: '', platforms: []},
  },
} satisfies Meta<GroupChatSearchBarProps>;

export default config;

export const GroupChatSearchBarStory: StoryObj<typeof config> = {
  name: 'GroupChatSearchBar',
};
