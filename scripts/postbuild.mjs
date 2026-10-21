// GitHub Pages serves static files only. Give every route (English and /fa) its own index.html,
// with the right language, title and canonical link, so direct visits and link previews work.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");
const origin = "https://rezasobhani.com";

const pages = {
  "": {
    en: ["Seyyed Reza Sobhani — Food & Nutrition Policy, TUMS", "Associate Professor of Food & Nutrition Policy at Tehran University of Medical Sciences and WHO Technical Advisor, researching healthy, affordable and sustainable diets."],
    fa: ["دکتر سید رضا سبحانی — سیاست‌گذاری غذا و تغذیه، دانشگاه علوم پزشکی تهران", "دانشیار سیاست‌گذاری غذا و تغذیه دانشگاه علوم پزشکی تهران و مشاور فنی سازمان جهانی بهداشت، پژوهشگر رژیم غذایی سالم، مقرون‌به‌صرفه و پایدار."],
  },
  about: {
    en: ["About — Seyyed Reza Sobhani", "Biography, appointments and education of Seyyed Reza Sobhani, Associate Professor at Tehran University of Medical Sciences."],
    fa: ["درباره — دکتر سید رضا سبحانی", "زندگی‌نامه، سوابق و تحصیلات دکتر سید رضا سبحانی، دانشیار دانشگاه علوم پزشکی تهران."],
  },
  research: {
    en: ["Research — Seyyed Reza Sobhani", "Research on sustainable diets, food policy and food security, nutritional epidemiology, clinical nutrition and food choice."],
    fa: ["پژوهش — دکتر سید رضا سبحانی", "پژوهش در زمینه رژیم غذایی پایدار، سیاست‌گذاری غذا و امنیت غذایی، اپیدمیولوژی تغذیه، تغذیه بالینی و انتخاب غذا."],
  },
  publications: {
    en: ["Publications — Seyyed Reza Sobhani", "Searchable list of 80+ peer-reviewed publications by Seyyed Reza Sobhani, with citation counts."],
    fa: ["مقالات — دکتر سید رضا سبحانی", "فهرست قابل جست‌وجوی بیش از ۸۰ مقاله داوری‌شده دکتر سید رضا سبحانی."],
  },
  contact: {
    en: ["Contact — Seyyed Reza Sobhani", "Contact Seyyed Reza Sobhani about research collaboration, student supervision, policy advice or speaking invitations."],
    fa: ["تماس — دکتر سید رضا سبحانی", "ارتباط با دکتر سید رضا سبحانی برای همکاری پژوهشی، راهنمایی دانشجو، مشاوره سیاستی یا دعوت به سخنرانی."],
  },
};

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function render(route, lang) {
  const [title, description] = pages[route][lang];
  const enPath = route ? `/${route}` : "/";
  const faPath = route ? `/fa/${route}` : "/fa";
  const url = origin + (lang === "fa" ? faPath : enPath);
  return template
    .replace('<html lang="en" dir="ltr">', `<html lang="${lang}" dir="${lang === "fa" ? "rtl" : "ltr"}">`)
    .replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<link rel="alternate" hreflang="en" href=")[^"]*/, `$1${origin}${enPath}`)
    .replace(/(<link rel="alternate" hreflang="fa" href=")[^"]*/, `$1${origin}${faPath}`);
}

const urls = [];
for (const route of Object.keys(pages)) {
  for (const lang of ["en", "fa"]) {
    const dir = join(dist, ...(lang === "fa" ? ["fa"] : []), ...(route ? [route] : []));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), render(route, lang));
    urls.push(`${origin}${lang === "fa" ? "/fa" : ""}${route ? `/${route}` : lang === "fa" ? "" : "/"}`);
  }
}

// Unknown paths: GitHub Pages serves 404.html, which boots the app and shows its own 404 page.
writeFileSync(join(dist, "404.html"), template);
writeFileSync(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`postbuild: wrote ${urls.length} pages, 404.html, sitemap.xml, robots.txt`);
