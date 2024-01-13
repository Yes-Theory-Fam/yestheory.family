import type {Preview} from '@storybook/react';
import '../styles/globals.css';
import './storybook.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/900.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
