import { Link } from "wouter";
import { ArrowRight, Globe2, Leaf, Scale, Activity, Stethoscope, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { metrics } from "@/content/profile";
import { publications, topicOrder, type Topic } from "@/content/publications";
import CitationChart from "@/components/CitationChart";
import PublicationItem from "@/components/PublicationItem";
import { ArrowLink, SectionTitle, usePageTitle } from "@/components/site";

export const topicIcons: Record<Topic, typeof Leaf> = {
  sustainable: Leaf,
  policy: Scale,
  epi: Activity,
  clinical: Stethoscope,
  behaviour: Users,
};

export default function Home() {
  const { s, num, language } = useLanguage();
  usePageTitle("home");
  const photo = `${import.meta.env.BASE_URL}images/profile-photo.jpg`;
  const recent = publications.filter((p) => p.selected).slice(0, 4);

  const stats = [
    { value: num(metrics.citations), label: s.home.stats.citations },
    { value: num(metrics.hIndex), label: s.home.stats.hIndex },
    { value: num(metrics.i10Index), label: s.home.stats.i10 },
    { value: `${num(80)}+`, label: s.home.stats.papers },
  ];

  return (
    <>
      {/* Hero */}
      <section className="paper-grain border-b border-border/70">
        <div className="container grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="eyebrow">{s.home.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-ink md:text-7xl">{s.name}</h1>
            <p className="mt-4 text-lg font-medium text-primary">
              {s.title} · {s.university}
            </p>
            <p className="mt-8 max-w-xl font-serif text-2xl leading-snug text-foreground/90 italic text-balance md:text-[1.75rem]">{s.home.headline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">{s.home.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/research" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}>
                {s.home.ctaResearch}
                <ArrowRight className="rtl:rotate-180" />
              </Link>
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full bg-background/60 px-7 text-base")}>
                {s.home.ctaContact}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm animate-in fade-in zoom-in-95 duration-700 lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] bg-secondary rotate-2" aria-hidden="true" />
            <img
              src={photo}
              alt={s.name}
              width={1536}
              height={2048}
              className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover object-[50%_30%] shadow-xl"
            />
          </div>
        </div>

        {/* Roles strip */}
        <div className="border-t border-border/70 bg-background/70">
          <ul className="container grid divide-y divide-border/70 sm:grid-cols-3 sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse">
            {s.roles.map((role) => (
              <li key={role.label} className="py-5 sm:px-6 first:sm:ps-0">
                <p className="font-serif text-base font-semibold text-ink">{role.label}</p>
                <p className="text-sm text-muted-foreground">{role.org}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Metrics + chart */}
      <section className="container py-16 md:py-24">
        <SectionTitle title={s.home.metricsTitle} />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <dl className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 md:p-6">
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="mt-2 font-serif text-4xl font-semibold tabular-nums text-ink md:text-5xl">{stat.value}</dd>
              </div>
            ))}
            <p className="col-span-2 text-xs text-muted-foreground">
              {s.home.metricsNote} · {metrics.asOf[language]}
            </p>
          </dl>
          <CitationChart />
        </div>
      </section>

      {/* WHO highlight */}
      <section className="container">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-primary-foreground md:px-12 md:py-14">
          <Globe2 className="absolute -end-10 -top-10 size-64 text-primary-foreground/[0.06]" aria-hidden="true" />
          <div className="relative grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <span className="grid size-12 place-items-center rounded-full bg-primary-foreground/10">
              <Globe2 className="size-6" />
            </span>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-primary-foreground md:text-3xl">{s.home.whoTitle}</h2>
              <p className="mt-3 text-base leading-relaxed text-primary-foreground/80 md:text-lg">{s.home.whoBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="container py-16 md:py-24">
        <SectionTitle title={s.home.themesTitle} link={{ href: "/research", label: s.home.themesLink }} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {topicOrder.map((topic) => {
            const Icon = topicIcons[topic];
            const count = publications.filter((p) => p.topics.includes(topic)).length;
            return (
              <Link
                key={topic}
                href={`/research#${topic}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">{s.topics[topic].title}</h3>
                <p className="mt-auto pt-4 text-sm text-muted-foreground">
                  {num(count)} {s.research.papers}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent publications */}
      <section className="border-y border-border/70 bg-muted/60">
        <div className="container py-16 md:py-20">
          <SectionTitle title={s.home.recentTitle} link={{ href: "/publications", label: s.home.recentLink }} />
          <div className="grid gap-8 md:grid-cols-2">
            {recent.map((pub) => (
              <div key={pub.title} className="rounded-2xl border border-border bg-card p-6">
                <PublicationItem pub={pub} showYear={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container pt-16 md:pt-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">{s.home.contactTitle}</h2>
            <p className="mt-2 text-muted-foreground md:text-lg">{s.home.contactBody}</p>
          </div>
          <ArrowLink href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-12 shrink-0 rounded-full px-7 text-base text-primary-foreground hover:no-underline")}>
            {s.home.contactBtn}
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
