import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.sahakaryasindhuli.org.np',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    locales: ['en', 'ne'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false, // English at root (/), Nepali under /ne/
      redirectToDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
