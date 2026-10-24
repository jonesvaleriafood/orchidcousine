import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Run from the project root. Only the exported copy gets portable media URLs.
const source = process.cwd();
const output = path.resolve(process.argv[2] ?? '/tmp/orchid-export/orchid-cuisines-website');
const origin = 'https://orchidcousine.pages.dev';
const assetOrigin = process.env.EXPORT_ASSET_ORIGIN ?? 'http://localhost:8080';
if (output === source || output.startsWith(`${source}${path.sep}`)) {
  throw new Error('Export destination must be outside the source project.');
}
const excluded = new Set(['.git', '.env', '.lovable', '.workspace', 'node_modules', 'dist', 'build', '.output', '.nitro', '.vite', '.cache', 'coverage']);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, {
  recursive: true,
  filter: (entry) => !path.relative(source, entry).split(path.sep).some(part => excluded.has(part) || part.endsWith('.tsbuildinfo')),
});
const assets = path.join(output, 'src/assets');
const pointers = (await readdir(assets)).filter(name => name.endsWith('.asset.json'));
let index = 0;
async function download() {
  while (index < pointers.length) {
    const name = pointers[index++];
    const pointerPath = path.join(assets, name);
    const pointer = JSON.parse(await readFile(pointerPath, 'utf8'));
    const response = await fetch(new URL(pointer.url, assetOrigin));
    if (!response.ok) throw new Error(`Cannot recover ${name}: HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length !== pointer.size) throw new Error(`Incomplete media file: ${name}`);
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('text/html')) throw new Error(`Media URL returned a page: ${name}`);
    const filename = path.basename(pointer.original_filename);
    const relative = `/media/${pointer.asset_id}/${filename}`;
    const destination = path.join(output, 'public', relative);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, bytes);
    await writeFile(pointerPath, `${JSON.stringify({ ...pointer, url: relative }, null, 2)}\n`);
  }
}
await Promise.all(Array.from({ length: 6 }, () => download()));
const siteFile = path.join(output, 'src/components/site.tsx');
const site = await readFile(siteFile, 'utf8');
await writeFile(siteFile, site.replace(/https:\/\/id-preview--[^`]+(?=\$\{socialPreview.url\})/, origin));
for (const route of ['index', 'menu', 'pricing', 'services', 'contact']) {
  const routePath = path.join(output, `src/routes/${route}.tsx`);
  const contents = await readFile(routePath, 'utf8');
  const url = `${origin}${route === 'index' ? '/' : `/${route}`}`;
  await writeFile(routePath, contents
    .replace(/(property: "og:url", content: )"[^"]*"/, `$1"${url}"`)
    .replace(/(rel: "canonical", href: )"[^"]*"/, `$1"${url}"`));
}
for (const name of pointers) {
  const pointer = JSON.parse(await readFile(path.join(assets, name), 'utf8'));
  if (!pointer.url.startsWith('/media/')) throw new Error(`Non-portable URL: ${name}`);
  const file = await stat(path.join(output, 'public', pointer.url));
  if (file.size !== pointer.size) throw new Error(`Export verification failed: ${name}`);
}
await writeFile(path.join(output, 'DEPLOYMENT.md'), `# Orchid Cuisines deployment\n\nThis source package includes all ${pointers.length} uploaded photos, logos, posters and videos in public/media. No Lovable-only media links are needed.\n\nReplace the old GitHub source files with the contents of this folder, including public/media. Keep the hosting configuration that currently serves your site. Run npm install, then npm run build (or use npm run build as your Cloudflare build command), and redeploy. Do not upload this source folder as a static HTML site.\n\nThe production origin is ${origin}. If you change domains, update the social image origin in src/components/site.tsx and canonical/og:url values in the five content routes.\n\nPrivate environment files and credentials are deliberately excluded. Keep existing hosting environment settings; configure the Google Maps browser key for your domain separately if needed.\n`);
console.log(`Export verified: ${pointers.length} complete media files. Source folder: ${output}`);