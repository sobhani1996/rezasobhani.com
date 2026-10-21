import { useMemo, useState } from "react";
import { useSearch } from "wouter";
import { ExternalLink, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/content/profile";
import { publications, topicOrder, type Topic } from "@/content/publications";
import PublicationItem from "@/components/PublicationItem";
import { PageHeader, usePageTitle } from "@/components/site";

type Filter = "all" | "selected" | Topic;
type Sort = "newest" | "cited";

export default function Publications() {
  const { s, num } = useLanguage();
  usePageTitle("publications");
  const params = new URLSearchParams(useSearch());
  const initialTopic = params.get("topic");
  const [filter, setFilter] = useState<Filter>(topicOrder.includes(initialTopic as Topic) ? (initialTopic as Topic) : "all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = publications.filter((p) => {
      if (filter === "selected" && !p.selected) return false;
      if (filter !== "all" && filter !== "selected" && !p.topics.includes(filter)) return false;
      if (!q) return true;
      return `${p.title} ${p.authors} ${p.venue} ${p.year}`.toLowerCase().includes(q);
    });
    return sort === "cited" ? [...list].sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0)) : list;
  }, [filter, query, sort]);

  const byYear = useMemo(() => {
    const groups: { year: number; items: typeof visible }[] = [];
    for (const p of visible) {
      const last = groups[groups.length - 1];
      if (last?.year === p.year) last.items.push(p);
      else groups.push({ year: p.year, items: [p] });
    }
    return groups;
  }, [visible]);

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: s.publications.all },
    { key: "selected", label: s.publications.selected },
    ...topicOrder.map((t) => ({ key: t as Filter, label: s.topics[t].title })),
  ];

  return (
    <>
      <PageHeader eyebrow={`${num(publications.length)} · Google Scholar`} title={s.publications.title} lede={s.publications.lede}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={profile.links.scholar} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "rounded-full")}>
            {s.publications.scholar} <ExternalLink />
          </a>
          <a href={profile.links.researchgate} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }), "rounded-full bg-background/60")}>
            {s.publications.researchgate} <ExternalLink />
          </a>
        </div>
      </PageHeader>

      <div className="container py-12 md:py-16">
        {/* Controls */}
        <div className="sticky top-16 z-30 -mx-4 mb-10 border-b border-border/70 bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative flex-1">
              <span className="sr-only">{s.publications.search}</span>
              <Search className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={s.publications.search}
                className="h-11 w-full rounded-full border border-input bg-card ps-10 pe-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-full border border-input bg-card px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              aria-label="Sort"
            >
              <option value="newest">{s.publications.sortNewest}</option>
              <option value="cited">{s.publications.sortCited}</option>
            </select>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => setFilter(chip.key)}
                aria-pressed={filter === chip.key}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  filter === chip.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-8 text-sm text-muted-foreground" aria-live="polite">
          {s.publications.showing(visible.length, publications.length)}
        </p>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground">{s.publications.none}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <X className="size-4" /> {s.publications.clear}
            </button>
          </div>
        ) : sort === "newest" ? (
          <div className="space-y-12">
            {byYear.map((group) => (
              <section key={group.year} className="grid gap-6 md:grid-cols-[6rem_1fr]" dir="ltr">
                <h2 className="font-serif text-3xl font-semibold text-ink md:sticky md:top-56 md:self-start">{group.year}</h2>
                <ul className="divide-y divide-border/70 border-t border-border/70 md:border-t-0">
                  {group.items.map((pub) => (
                    <li key={pub.title} className="py-5 first:pt-5 md:first:pt-0">
                      <PublicationItem pub={pub} showYear={false} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-border/70">
            {visible.map((pub) => (
              <li key={pub.title} className="py-5">
                <PublicationItem pub={pub} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
