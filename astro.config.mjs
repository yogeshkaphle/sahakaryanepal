import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Component preview (`/preview`, fake sample data) is injected on every deploy
// EXCEPT production, so it stays reviewable on branch/preview deploys but never
// ships to the live site. Vercel sets VERCEL_ENV='production' for prod builds.
const isProductionDeploy = process.env.VERCEL_ENV === 'production';
const previewRoute = isProductionDeploy
  ? []
  : [
      {
        name: 'inject-preview-route',
        hooks: {
          'astro:config:setup': ({ injectRoute }) => {
            injectRoute({ pattern: '/preview', entrypoint: './src/pages/_preview.astro' });
          },
        },
      },
    ];

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
  integrations: [sitemap(), ...previewRoute],
});
