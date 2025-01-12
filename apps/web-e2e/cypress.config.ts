import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

const cypressFolder = '.';
export default defineConfig({
  chromeWebSecurity: false,
  videosFolder: `${cypressFolder}/cypress/videos`,
  screenshotsFolder: `${cypressFolder}/cypress/screenshots`,
  supportFolder: `${cypressFolder}/src/support`,
  e2e: {
    ...nxE2EPreset(__filename, {
      webServerCommands: {
        default: 'nx run web:serve',
        production: 'nx run web:serve:production',
      },
    }),
    baseUrl: 'http://localhost:4200',
  },
});
