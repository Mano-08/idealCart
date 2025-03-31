import { blackA, green, mauve, violet } from '@radix-ui/colors';
import baseConfig from '@extension/tailwindcss-config';
import type { Config } from 'tailwindcss';

export default {
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
} as Config;
