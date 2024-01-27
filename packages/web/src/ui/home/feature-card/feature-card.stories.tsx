import {type Meta, type StoryObj} from '@storybook/react';
import UnderConstruction from '../../../../assets/underconstruction.webp';
import {FeatureCard, type FeatureCardProps} from './feature-card';

const config = {
  title: 'FeatureCard',
  component: FeatureCard,
  args: {
    title: 'Example',
    description:
      'This is an example description to show how such a feature-card would look like on an actual page.',
    image: UnderConstruction,
    imageAlt: '',
  },
} satisfies Meta<FeatureCardProps>;

export default config;

export const FeatureCardStory: StoryObj<typeof config> = {name: 'FeatureCard'};
