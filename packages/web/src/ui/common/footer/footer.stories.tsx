import {type Meta} from '@storybook/react';
import {Footer, type FooterProps} from './footer';

export default {
  title: 'Common/Footer',
  component: Footer,
} satisfies Meta<FooterProps>;

export const FooterStory = {
  name: 'Footer',
  args: {
    links: [
      {text: 'Yes Theory', href: 'https://yestheory.com'},
      {text: 'Seek Discomfort', href: 'https://seekdiscomfort.com'},
      {text: 'Example', href: 'https://example.com'},
    ],
  },
};
