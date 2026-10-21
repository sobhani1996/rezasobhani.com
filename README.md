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

## Updating content

All text and data live in `client/src/content/`:

- `profile.ts` — email, booking link, profile links, Google Scholar metrics and citations per year.
- `publications.ts` — the full publication list. Add a paper by appending an entry; mark `selected: true` to feature it.
- `strings.ts` — every sentence on the site, in English (`en`), Persian (`fa`) and Central Kurdish / Sorani (`ckb`), including each page's search-result description.
- `languages.ts` — the list of languages, their URL prefixes and digit styles.

The site uses real paths: English at `/about/`, Persian at `/fa/about/`, Sorani at `/ckb/about/`. At build time `scripts/postbuild.mjs` pre-renders every page in every language into its own `index.html` (full text, `lang`/`dir`, title, description, canonical and `hreflang` links), and writes `404.html`, `sitemap.xml` (with language alternates) and `robots.txt`. Pushing to `main` redeploys automatically.
