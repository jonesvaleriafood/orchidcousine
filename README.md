# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

## Portable source export

Run `node scripts/export-website.mjs /tmp/orchid-export/orchid-cuisines-website` while the preview media server is available. This stages a clean source copy outside the project, downloads all uploaded media into its `public/media` folder, and updates only that copy's asset URLs and production metadata. It excludes credentials, dependencies, and build output and fails on missing or incomplete media. Deploy the exported source rather than a ZIP containing only asset pointers.

- TanStack Start
- TypeScript
- React
- Tailwind CSS
