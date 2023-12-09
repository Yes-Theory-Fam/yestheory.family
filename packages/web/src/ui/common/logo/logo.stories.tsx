import {type StoryFn, type Meta} from '@storybook/react';
import {twMerge} from 'tailwind-merge';
import {Logo, type LogoProps} from './logo';

export default {
  title: 'Common/Logo',
  component: Logo,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio',
      },
    },
    variant: {
      options: ['color', 'white'],
      control: {
        type: 'radio',
      },
    },
  },
} satisfies Meta<LogoProps>;

const Template: StoryFn<LogoProps> = (args) => {
  const background =
    args.variant === 'white' ? 'bg-brand-800' : 'bg-transparent';

  return (
    <div className={twMerge(background, 'p-4')}>
      <Logo {...args} />
    </div>
  );
};

export const LogoStory = Template.bind({});
LogoStory.storyName = 'Logo';
