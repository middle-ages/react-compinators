import type {StorybookConfig} from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    {
      from: '../src/storybook/css',
      to: 'css',
    },
    {
      from: '../docs',
      to: 'docs',
    },
  ],

  docs: {
    autodocs: 'tag',
  },
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: 'config/vite.storybook.config.ts',
      },
    },
  },
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      savePropValueAsString: true,
      tsconfigPath: 'tsconfig.json',
    },
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-interactions',
  ],
}

export default config
