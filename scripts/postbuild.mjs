// GitHub Pages serves static files only. For every page in every language this writes an
// index.html that already contains the rendered text, the right <html lang/dir>, title,
// description, canonical URL and hreflang alternates — so search engines (and link previews)
// see real content in English, Persian and Sorani Kurdish. Also writes 404.html, sitemap.xml, robots.txt.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(projectRoot, "dist");
const ssrOut = join(projectRoot, "dist-ssr");
const origin = "https://rezasobhani.com";

// 1. Bundle the app for Node and load its renderer and texts.
await build({
  logLevel: "warn",
  build: { ssr: join(projectRoot, "client", "src", "entry-server.tsx"), outDir: ssrOut, emptyOutDir: true },
});
const { render, strings, languages } = await import(pathToFileURL(join(ssrOut, "entry-server.js")).href);

const template = readFileSync(join(dist, "index.html"), "utf8");
const routes = [
  { slug: "", key: "home" },
  { slug: "about", key: "about" },
  { slug: "research", key: "research" },
  { slug: "publications", key: "publications" },
  { slug: "contact", key: "contact" },
];

// Trailing-slash paths are what GitHub Pages serves without a redirect.
const pathFor = (lang, slug) => `${lang.prefix}/${slug ? `${slug}/` : ""}`;
const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const setMeta = (html, attr, name, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${name}" content=")[^"]*`), `$1${escape(value)}`);

function page(lang, route) {
  const s = strings[lang.code];
  const title = s.meta[route.key];
  const description = s.descriptions[route.key];
  const url = origin + pathFor(lang, route.slug);
  const alternates = [
    ...languages.map((l) => `<link rel="alternate" hreflang="${l.code}" href="${origin}${pathFor(l, route.slug)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${origin}${pathFor(languages[0], route.slug)}" />`,
  ].join("\n    ");
  const otherLocales = languages
    .filter((l) => l.code !== lang.code)
    .map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}" />`)
    .join("\n    ");

  let html = template
    .replace('<html lang="en" dir="ltr">', `<html lang="${lang.code}" dir="${lang.dir}">`)
    .replace("<body>", lang.dir === "rtl" ? '<body class="font-persian">' : "<body>")
    .replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/<!--hreflang:.*?-->/, alternates)
    .replace("<!--og:locale:alternate-->", otherLocales)
    .replace('<div id="root"></div>', `<div id="root">${render(pathFor(lang, route.slug))}</div>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:locale", lang.ogLocale);
  html = setMeta(html, "property", "og:site_name", s.meta.siteName);
  return html;
}

// 2. Write every page.
const sitemapEntries = [];
for (const route of routes) {
  for (const lang of languages) {
    const dir = join(dist, ...pathFor(lang, route.slug).split("/").filter(Boolean));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), page(lang, route));
    const links = languages
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${origin}${pathFor(l, route.slug)}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${pathFor(languages[0], route.slug)}"/>`)
      .join("\n");
    sitemapEntries.push(`  <url>\n    <loc>${origin}${pathFor(lang, route.slug)}</loc>\n${links}\n  </url>`);
  }
}

// 3. Unknown paths: GitHub Pages serves 404.html, which renders the app's own 404 page in the right language.
writeFileSync(
  join(dist, "404.html"),
  template.replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />').replace(/<!--hreflang:.*?-->/, ""),
);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries.join("\n")}\n</urlset>\n`,
);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
rmSync(ssrOut, { recursive: true, force: true });
console.log(`postbuild: pre-rendered ${sitemapEntries.length} pages (${languages.map((l) => l.code).join(", ")}), 404.html, sitemap.xml, robots.txt`);
