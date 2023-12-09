import {type StoryFn, type Meta} from '@storybook/react';
import {type NavLinkDefinition} from '../navigation.types';
import {NavLink} from './nav-link';

export default {
  title: 'Common/Navigation/NavLink',
  component: NavLink,
} satisfies Meta<NavLinkDefinition>;

const Template: StoryFn<NavLinkDefinition> = (args) => (
  <NavLink {...args} href='/example' text='Example' />
);

export const LinkOnActiveSegment = Template.bind({});
LinkOnActiveSegment.storyName = 'Link on active segment';
LinkOnActiveSegment.parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      segments: ['example'],
    },
  },
};

export const LinkOnInactiveSegment = Template.bind({});
LinkOnInactiveSegment.storyName = 'Link on inactive segment';
LinkOnInactiveSegment.parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      segments: ['foo'],
    },
  },
};

export const LinkOnRootSegment = Template.bind({});
LinkOnRootSegment.storyName = 'Link on root segment';
LinkOnRootSegment.parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      segments: [],
    },
  },
};
