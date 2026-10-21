import { Link, useLocation } from "wouter";
import { Menu, X, Languages, Mail } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/content/profile";
import { LinkedinIcon, ResearchGateIcon, ScholarIcon, useOtherLanguageHref } from "@/components/site";

export default function Layout({ children }: { children: ReactNode }) {
  const [rawLocation] = useLocation();
  // GitHub Pages serves /about as /about/; compare without the trailing slash.
  const location = rawLocation.replace(/\/+$/, "") || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { s, language } = useLanguage();
  const otherHref = useOtherLanguageHref();

  useEffect(() => setMenuOpen(false), [location]);

  const navItems = [
    { label: s.nav.about, path: "/about" },
    { label: s.nav.research, path: "/research" },
    { label: s.nav.publications, path: "/publications" },
    { label: s.nav.contact, path: "/contact" },
  ];

  const languageSwitch = (
    <Link
      href={otherHref}
      hrefLang={language === "fa" ? "en" : "fa"}
      aria-label={s.nav.switchLabel}
      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full gap-1.5 font-medium", language === "en" ? "font-persian" : "font-sans")}
    >
      <Languages className="size-4" />
      {s.nav.switchTo}
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        {language === "fa" ? "رفتن به محتوا" : "Skip to content"}
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-sm font-semibold tracking-wide">
              {language === "fa" ? "س‌س" : "SRS"}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-base font-semibold text-ink">{s.name}</span>
              <span className="hidden sm:block truncate text-xs text-muted-foreground">{s.university}</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                aria-current={location === item.path ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-primary",
                  location === item.path ? "bg-secondary text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <span className="mx-2 h-5 w-px bg-border" />
            {languageSwitch}
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            {languageSwitch}
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-foreground hover:bg-muted"
              aria-label={s.nav.menu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background animate-in fade-in slide-in-from-top-2" aria-label="Main">
            <div className="container flex flex-col py-3">
              {[{ label: s.nav.home, path: "/" }, ...navItems].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium",
                    location === item.path ? "bg-secondary text-primary" : "text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main" className="flex-1 w-full">
        {children}
      </main>

      <footer className="mt-24 bg-ink text-primary-foreground">
        <div className="container grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-3 max-w-sm">
            <p className="font-serif text-xl font-semibold">{s.name}</p>
            <p className="text-sm leading-relaxed text-primary-foreground/75">{s.footer.blurb}</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-primary-foreground">{s.footer.pages}</p>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="hover:text-primary-foreground hover:underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-primary-foreground">{s.footer.connect}</p>
            <ul className="space-y-2 text-sm text-primary-foreground/75">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-primary-foreground">
                  <Mail className="size-4" /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary-foreground">
                  <ScholarIcon className="size-4" /> Google Scholar
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary-foreground">
                  <LinkedinIcon className="size-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={profile.links.researchgate} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary-foreground">
                  <ResearchGateIcon className="size-4" /> ResearchGate
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="container py-5 text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} {s.name}. {s.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}
