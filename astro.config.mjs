import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://perwahl.github.io',
  base: '/SOVLRules',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  markdown: {
    smartypants: true,
  },
});
