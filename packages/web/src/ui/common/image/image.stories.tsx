import {type Meta} from '@storybook/react';
import {Image, type ImageProps} from './image';

export default {
  title: 'Common/Image',
  component: Image,
  argTypes: {
    width: {
      control: {
        type: 'range',
        min: 20,
        max: 800,
        step: 10,
      },
    },
    height: {
      control: {
        type: 'range',
        min: 20,
        max: 800,
        step: 10,
      },
    },
    src: {
      control: {
        type: 'text',
      },
    },
    shadow: {
      options: ['none', 'left', 'right'],
      control: {
        type: 'select',
      },
    },
  },
} satisfies Meta<ImageProps>;

export const ImageStory = {
  name: 'Image',
  args: {
    height: 200,
    width: 200,
    src: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg',
    shadow: 'none',
  },
};
