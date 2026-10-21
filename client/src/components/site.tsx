// Small building blocks shared by every page.
import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Strings } from "@/content/strings";
import { languageInfo, type Language } from "@/content/languages";

/** Sets the browser tab title for the current page. */
export function usePageTitle(key: keyof Strings["meta"]) {
  const { s } = useLanguage();
  useEffect(() => {
    document.title = s.meta[key];
  }, [s, key]);
}

/** Absolute href of the current page in another language, in the trailing-slash form GitHub Pages serves without a redirect. */
export function useLanguageHref() {
  const [path] = useLocation();
  const rest = path.replace(/\/+$/, "");
  return (code: Language) => `~${languageInfo(code).prefix}${rest}/`;
}

export function PageHeader({ eyebrow, title, lede, children }: { eyebrow?: string; title: string; lede: string; children?: ReactNode }) {
  return (
    <section className="paper-grain border-b border-border/70">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] text-ink">{title}</h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{lede}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Call for collaboration aimed at one region; renders only for languages that define `regional`. */
export function RegionalCallout({ action }: { action: ReactNode }) {
  const { s } = useLanguage();
  if (!s.regional) return null;
  return (
    <section className="container pt-16 md:pt-24">
      <div className="grid gap-6 rounded-3xl border-2 border-primary/25 bg-secondary/70 p-6 md:grid-cols-[auto_1fr] md:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
          <Handshake className="size-6" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-ink md:text-3xl">{s.regional.title}</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-secondary-foreground md:text-lg">{s.regional.body}</p>
          <div className="mt-6">{action}</div>
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ title, link, className }: { title: string; link?: { href: string; label: string }; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4 mb-8", className)}>
      <h2 className="text-2xl md:text-3xl font-semibold text-ink">{title}</h2>
      {link && <ArrowLink href={link.href}>{link.label}</ArrowLink>}
    </div>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4", className)}>
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
    </Link>
  );
}

/** Puts the site owner's name in bold inside an author list. */
export function Authors({ text }: { text: string }) {
  const parts = text.split(/(S\. R\. Sobhani|S\. Sobhani)/);
  return (
    <>
      {parts.map((part, i) =>
        /Sobhani/.test(part) ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export const ScholarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M12 3 1 9.5l4 2.36V17c0 1.1 3.13 3 7 3s7-1.9 7-3v-5.14L23 9.5 12 3Zm0 2.3 7.1 4.2L12 13.7 4.9 9.5 12 5.3Z" />
  </svg>
);

export const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const ResearchGateIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <rect width="24" height="24" rx="5" fill="currentColor" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif" fill="white">RG</text>
  </svg>
);
