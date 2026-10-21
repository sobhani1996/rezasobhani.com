import { useLanguage } from "@/contexts/LanguageContext";
import { publications, topicOrder } from "@/content/publications";
import PublicationItem from "@/components/PublicationItem";
import { ArrowLink, PageHeader, usePageTitle } from "@/components/site";
import { topicIcons } from "./Home";

export default function Research() {
  const { s, num } = useLanguage();
  usePageTitle("research");

  return (
    <>
      <PageHeader eyebrow={s.home.eyebrow} title={s.research.title} lede={s.research.lede} />

      <div className="container py-16 md:py-20">
        <div className="space-y-6">
          {topicOrder.map((topic, index) => {
            const Icon = topicIcons[topic];
            const papers = publications.filter((p) => p.topics.includes(topic));
            const key = [...papers].sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0)).slice(0, 3);
            return (
              <section key={topic} id={topic} className="scroll-mt-24 grid gap-8 rounded-3xl border border-border bg-card p-6 md:p-10 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-muted-foreground">{num(0)}{num(index + 1)}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold leading-tight text-ink md:text-3xl">{s.topics[topic].title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground md:text-lg">{s.topics[topic].body}</p>
                  <p className="mt-6 font-serif text-3xl font-semibold text-ink">
                    {num(papers.length)} <span className="text-base font-normal text-muted-foreground">{s.research.papers}</span>
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-semibold text-muted-foreground">{s.research.keyPapers}</h3>
                  <ul className="space-y-5 divide-y divide-border/70">
                    {key.map((pub) => (
                      <li key={pub.title} className="pt-5 first:pt-0">
                        <PublicationItem pub={pub} showYear={false} compact />
                      </li>
                    ))}
                  </ul>
                  <ArrowLink href={`/publications/?topic=${topic}`} className="mt-6">
                    {s.research.viewAll}
                  </ArrowLink>
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-20">
          <h2 className="mb-8 text-2xl font-semibold text-ink md:text-3xl">{s.research.methodsTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.research.methods.map((m) => (
              <div key={m.title} className="rounded-2xl border-t-2 border-primary bg-muted/70 p-6">
                <h3 className="text-lg font-semibold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
