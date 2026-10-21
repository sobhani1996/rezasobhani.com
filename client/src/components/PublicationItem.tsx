import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicationUrl, type Publication } from "@/content/publications";
import { useLanguage } from "@/contexts/LanguageContext";
import { Authors } from "@/components/site";

// Paper titles stay in English (the language they were published in), so the item is always LTR.
export default function PublicationItem({ pub, showYear = true, compact = false }: { pub: Publication; showYear?: boolean; compact?: boolean }) {
  const { s } = useLanguage();
  return (
    <article dir="ltr" lang="en" className={cn("group grid gap-x-6 font-sans", showYear && "sm:grid-cols-[4rem_1fr]")}>
      {showYear && <div className="pt-0.5 text-sm font-semibold tabular-nums text-highlight">{pub.year}</div>}
      <div className="min-w-0">
        <h3 className={cn("font-sans font-semibold leading-snug tracking-normal text-foreground", compact ? "text-base" : "text-[1.05rem]")}>
          <a href={publicationUrl(pub)} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline underline-offset-4 decoration-primary/40">
            {pub.title}
            <ArrowUpRight className="ms-1 inline size-3.5 align-baseline text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
          </a>
        </h3>
        {!compact && (
          <p className="mt-1 text-sm text-muted-foreground">
            <Authors text={pub.authors} />
          </p>
        )}
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="italic text-foreground/80">{pub.venue}</span>
          {!showYear && <span className="text-muted-foreground tabular-nums">{pub.year}</span>}
          {pub.citations ? (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground tabular-nums" dir="auto">
              {s.publications.cited(pub.citations)}
            </span>
          ) : null}
        </p>
      </div>
    </article>
  );
}
