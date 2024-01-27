import {type Meta, type StoryObj} from '@storybook/react';
import {FeatureCard, type FeatureCardProps} from './feature-card';

const config = {
  title: 'Home/FeatureCard',
  component: FeatureCard,
  args: {
    inverted: false,
    feature: {
      name: 'Example',
      description:
        'This is an example description to show how such a feature-card would look like on an actual page.',
      navPath: '/example',
      teaserImage: {
        width: 120,
        height: 120,
        url: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg',
        id: 1,
      },
    },
  },
} satisfies Meta<FeatureCardProps>;

export default config;

export const FeatureCardStory: StoryObj<typeof config> = {name: 'FeatureCard'};
