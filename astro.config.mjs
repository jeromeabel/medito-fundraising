import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    tailwind(),
    icon({
      iconDir: 'src/assets/icons',
    }),
  ],
  adapter: cloudflare(),
});
