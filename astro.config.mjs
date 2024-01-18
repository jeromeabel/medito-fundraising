import { defineConfig, passthroughImageService } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },
  output: 'server',
  integrations: [
    tailwind(),
    icon({
      iconDir: 'src/assets/icons',
    }),
    react(),
  ],
  adapter: cloudflare(),
});
