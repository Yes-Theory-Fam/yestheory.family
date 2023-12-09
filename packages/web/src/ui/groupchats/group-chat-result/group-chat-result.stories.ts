import {type Meta, type StoryObj} from '@storybook/react';
import {type GroupChatResultProps, GroupChatResult} from './group-chat-result';

export default {
  title: 'Groupchats/Search Result',
  component: GroupChatResult,
} satisfies Meta<GroupChatResultProps>;

export const GroupChatResultStory: StoryObj<GroupChatResultProps> = {
  name: 'Search Result',
  args: {
    name: 'Yes Fam Germany',
    platform: 'facebook',
    description: 'Your place for all events in the German YesFam',
    url: 'https://example.com',
    keywords: ['Germany', 'Europe', 'online', 'Workout'],
  },
};
