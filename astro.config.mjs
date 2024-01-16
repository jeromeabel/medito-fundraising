import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['images.unsplash.com'],
    remotePatterns: [{ protocol: 'https' }],
  },
  output: 'server',
  integrations: [
    tailwind(),
    icon({
      iconDir: 'src/assets/icons',
    }),
  ],
  adapter: cloudflare(),
});
