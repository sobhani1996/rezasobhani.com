# Seyyed Reza Sobhani — Academic Website

This package is configured for GitHub Pages. It is a React, TypeScript, Vite, Tailwind CSS website with English and Persian (RTL) content.

## Publish on GitHub Pages

1. Create a new GitHub repository and upload the contents of this folder to its `main` branch. Do not upload the ZIP file itself.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and run, or re-run, the **Deploy website to GitHub Pages** workflow. Every later push to `main` redeploys the site automatically.
4. GitHub displays the final website address in the deployment summary. The links use hash routing, so pages work in both a project repository and a personal `username.github.io` repository.

## Local development

Install [Node.js 22](https://nodejs.org/) and pnpm, then run the following commands from this folder:

```bash
corepack enable
pnpm install
pnpm dev
```

To create the same static site used by GitHub Pages, run:

```bash
pnpm build:pages
```

The deployable static files are created in the `dist` folder.

## Important notes

All required images are stored locally in `client/public/images` in this GitHub Pages package. The project is intentionally configured with relative asset paths and hash-based client-side routing, which prevents broken images or page-refresh errors on GitHub Pages.

The Manus-hosted version remains available with its managed asset storage. This ZIP is a separate, portable GitHub Pages edition.
