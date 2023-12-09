import {action} from '@storybook/addon-actions';
import {type Meta} from '@storybook/react';
import {Profile, type ProfileProps} from './profile';

export default {
  title: 'Common/Navigation/Profile',
  component: Profile,
} satisfies Meta<ProfileProps>;

export const ProfileStory = {
  name: 'Profile',
  args: {
    variant: 'desktop',
    menuItems: [
      {
        onClick: action('menu-item-clicked'),
        label: 'Click',
      },
    ],
    user: {
      avatarUrl: 'https://i.pravatar.cc/150?img=57',
      username: 'geisterfurz007#5952',
    },
  },
};
