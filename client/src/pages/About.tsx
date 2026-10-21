import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/content/profile";
import { LinkedinIcon, PageHeader, ResearchGateIcon, ScholarIcon, usePageTitle } from "@/components/site";

function Timeline({ items, icon: Icon }: { items: { date: string; role: string; org: string }[]; icon: typeof Briefcase }) {
  return (
    <ol className="relative space-y-8 border-s border-border ps-8">
      {items.map((item, i) => (
        <li key={`${item.role}-${i}`} className="relative">
          <span className="absolute -start-[2.85rem] top-0 grid size-7 place-items-center rounded-full border border-border bg-background text-primary">
            <Icon className="size-3.5" />
          </span>
          {item.date && <p className="text-sm font-semibold tabular-nums text-highlight">{item.date}</p>}
          <h3 className="mt-1 text-lg font-semibold leading-snug text-ink">{item.role}</h3>
          <p className="text-muted-foreground">{item.org}</p>
        </li>
      ))}
    </ol>
  );
}

export default function About() {
  const { s } = useLanguage();
  usePageTitle("about");
  const photo = `${import.meta.env.BASE_URL}images/profile-photo.jpg`;

  const profiles = [
    { href: profile.links.scholar, label: "Google Scholar", icon: ScholarIcon },
    { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
    { href: profile.links.researchgate, label: "ResearchGate", icon: ResearchGateIcon },
  ];

  return (
    <>
      <PageHeader eyebrow={s.title} title={s.about.title} lede={s.about.lede} />

      <div className="container grid gap-12 py-16 md:py-20 lg:grid-cols-[18rem_1fr] lg:gap-16">
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <img src={photo} alt={s.name} width={1536} height={2048} loading="lazy" className="aspect-[4/5] w-full max-w-xs rounded-2xl object-cover object-[50%_30%] shadow-md" />
          <div>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{s.about.profilesTitle}</h2>
            <ul className="space-y-2">
              {profiles.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-primary">
                    <Icon className="size-4 text-primary" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{s.about.expertiseTitle}</h2>
            <ul className="flex flex-wrap gap-2">
              {s.about.expertise.map((item) => (
                <li key={item} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-secondary-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 space-y-16">
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-ink md:text-3xl">{s.about.bioTitle}</h2>
            <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed text-foreground/85">
              {s.about.bio.map((p, i) => (
                <p key={i} className={i === 0 ? "text-xl text-foreground first-letter:font-serif" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-8 text-2xl font-semibold text-ink md:text-3xl">{s.about.positionsTitle}</h2>
            <Timeline items={s.about.positions} icon={Briefcase} />
          </section>

          <section>
            <h2 className="mb-8 text-2xl font-semibold text-ink md:text-3xl">{s.about.educationTitle}</h2>
            <Timeline items={s.about.education} icon={GraduationCap} />
          </section>
        </div>
      </div>
    </>
  );
}
