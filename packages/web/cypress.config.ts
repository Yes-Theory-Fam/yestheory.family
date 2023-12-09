import {defineConfig} from 'cypress';
import setup from './cypress/plugins';

export default defineConfig({
  chromeWebSecurity: false,
  experimentalStudio: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      setup(on, config);
    },
    baseUrl: 'http://web:3000',
  },
});
