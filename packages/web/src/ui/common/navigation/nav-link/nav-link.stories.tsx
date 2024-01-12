import {type Meta, type StoryObj} from '@storybook/react';
import {type NavLinkDefinition} from '../navigation.types';
import {NavLink} from './nav-link';

const config = {
  title: 'Common/Navigation/NavLink',
  component: NavLink,
  args: {
    href: '/example',
    text: 'Example',
  },
  decorators: [
    (Story) => (
      <div className='inline-flex'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<NavLinkDefinition>;

export default config;

export const LinkOnActiveSegment: StoryObj<typeof config> = {
  name: 'Link on active segment',
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['example'],
      },
    },
  },
};

export const LinkOnInactiveSegment: StoryObj<typeof config> = {
  name: 'Link on inactive segment',
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['foo'],
      },
    },
  },
};

export const LinkOnRootSegment: StoryObj<typeof config> = {
  name: 'Link on root segment',
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [],
      },
    },
  },
};
