# Orchid Cuisines deployment

This source package includes all 49 uploaded photos, logos, posters and videos in public/media. No Lovable-only media links are needed.

Replace the old GitHub source files with the contents of this folder, including public/media. Keep the hosting configuration that currently serves your site. Run npm install, then npm run build (or use npm run build as your Cloudflare build command), and redeploy. Do not upload this source folder as a static HTML site.

The production origin is https://orchidcousine.pages.dev. If you change domains, update the social image origin in src/components/site.tsx and canonical/og:url values in the five content routes.

Private environment files and credentials are deliberately excluded. Keep existing hosting environment settings; configure the Google Maps browser key for your domain separately if needed.
