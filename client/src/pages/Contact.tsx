import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, CalendarDays, Check, Contact as ContactIcon, Copy, FlaskConical, GraduationCap, Landmark, Mail, MapPin, Mic, Navigation, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { profile } from "@/content/profile";
import { strings } from "@/content/strings";
import { LinkedinIcon, PageHeader, RegionalCallout, ResearchGateIcon, ScholarIcon, usePageTitle } from "@/components/site";

const reasonIcons = { collab: FlaskConical, students: GraduationCap, policy: Landmark, talks: Mic } as const;

function mailto(subject: string, body = "") {
  const params = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${profile.email}?${params}`;
}

function downloadVCard() {
  const en = strings.en;
  const card = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Sobhani;Seyyed Reza;;Dr;",
    "FN:Dr Seyyed Reza Sobhani",
    `TITLE:${en.title}`,
    `ORG:${en.university};${en.school}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
    "URL:https://rezasobhani.com",
    `ADR;TYPE=WORK:;;${en.school};Tehran;;;Iran`,
    "END:VCARD",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([card], { type: "text/vcard" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "seyyed-reza-sobhani.vcf" });
  a.click();
  URL.revokeObjectURL(url);
}

export default function Contact() {
  const { s, language } = useLanguage();
  const c = s.contact;
  usePageTitle("contact");
  const formRef = useRef<HTMLElement>(null);
  const [topic, setTopic] = useState(c.reasons[0].key);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success(c.copied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(c.emailLabel, profile.email);
    }
  };

  const chooseReason = (key: string) => {
    setTopic(key);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 400);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const affiliation = String(data.get("affiliation") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setError(c.required);
      return;
    }
    setError("");
    const reason = c.reasons.find((r) => r.key === topic) ?? c.reasons[0];
    const signature = [name, affiliation, email].filter(Boolean).join("\n");
    window.location.href = mailto(`${reason.subject} — ${name}`, `${message}\n\n—\n${signature}`);
    toast(c.opened);
  };

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(profile.mapQuery)}&z=15&hl=${language}&output=embed`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.mapQuery)}`;
  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition-shadow focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/30";

  return (
    <>
      <PageHeader eyebrow={s.nav.cta} title={c.title} lede={c.lede}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6 text-base")}>
            <Mail /> {profile.email}
          </a>
          <button type="button" onClick={copyEmail} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full bg-background/60 px-5")}>
            {copied ? <Check /> : <Copy />} {copied ? c.copied : c.copy}
          </button>
        </div>
      </PageHeader>

      <RegionalCallout
        action={
          <button type="button" onClick={() => chooseReason("collab")} className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}>
            {s.regional?.cta}
            <ArrowRight className="rtl:rotate-180" />
          </button>
        }
      />

      {/* Reasons */}
      <section className="container py-16 md:py-20">
        <h2 className="mb-8 text-2xl font-semibold text-ink md:text-3xl">{c.reasonsTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.reasons.map((reason) => {
            const Icon = reasonIcons[reason.key as keyof typeof reasonIcons];
            return (
              <button
                key={reason.key}
                type="button"
                onClick={() => chooseReason(reason.key)}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 text-start transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:ring-[3px] focus-visible:ring-ring/40 outline-none"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{reason.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {c.writeAbout}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Form + direct contact */}
      <section ref={formRef} className="container scroll-mt-20">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-card p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">{c.formTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.formNote}</p>

            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-medium">{c.topic}</legend>
              <div className="flex flex-wrap gap-2">
                {c.reasons.map((reason) => (
                  <label
                    key={reason.key}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40",
                      topic === reason.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    <input type="radio" name="topic" value={reason.key} checked={topic === reason.key} onChange={() => setTopic(reason.key)} className="sr-only" />
                    {reason.title}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{c.name}</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">{c.emailField}</span>
                <input name="email" type="email" required autoComplete="email" dir="ltr" className={cn(field, "text-start rtl:text-end")} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">{c.affiliation}</span>
                <input name="affiliation" autoComplete="organization" className={field} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium">{c.message}</span>
                <textarea name="message" required rows={6} placeholder={c.messagePlaceholder} className={cn(field, "resize-y")} />
              </label>
            </div>

            {error && (
              <p role="alert" className="mt-4 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <button type="submit" className={cn(buttonVariants({ size: "lg" }), "mt-6 h-12 w-full rounded-full text-base sm:w-auto sm:px-8")}>
              <Send className="rtl:-scale-x-100" /> {c.send}
            </button>
          </form>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl bg-ink p-6 text-primary-foreground md:p-8">
              <h2 className="text-xl font-semibold text-primary-foreground">{c.directTitle}</h2>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="flex items-center gap-2 text-sm text-primary-foreground/70">
                    <Mail className="size-4" /> {c.emailLabel}
                  </dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a href={`mailto:${profile.email}`} className="break-all text-lg font-medium hover:underline underline-offset-4" dir="ltr">
                      {profile.email}
                    </a>
                    <button type="button" onClick={copyEmail} className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/10 px-2.5 py-1 text-xs font-medium hover:bg-primary-foreground/20">
                      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} {copied ? c.copied : c.copy}
                    </button>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-sm text-primary-foreground/70">
                    <MapPin className="size-4" /> {c.officeLabel}
                  </dt>
                  <dd className="mt-1 leading-relaxed">
                    {c.office.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              <button type="button" onClick={downloadVCard} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/90 hover:text-primary-foreground hover:underline underline-offset-4">
                <ContactIcon className="size-4" /> {c.vcard}
              </button>
            </div>

            <div className="rounded-3xl border border-border bg-secondary/60 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <CalendarDays className="size-5" />
                </span>
                <h2 className="text-xl font-semibold text-ink">{c.meetTitle}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">{c.meetBody}</p>
              <a href={profile.calendarUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "mt-5 rounded-full")}>
                {c.meetBtn} <ArrowRight className="rtl:rotate-180" />
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-semibold text-ink">{c.profilesTitle}</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { href: profile.links.scholar, label: "Scholar", icon: ScholarIcon },
                  { href: profile.links.linkedin, label: "LinkedIn", icon: LinkedinIcon },
                  { href: profile.links.researchgate, label: "ResearchGate", icon: ResearchGateIcon },
                ].map(({ href, label, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 rounded-2xl border border-border p-4 text-center text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                    <Icon className="size-6 text-primary" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section className="container mt-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <iframe
            title={c.office.join(", ")}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-72 w-full border-0 md:h-96 grayscale-[30%]"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4 md:px-6">
            <p className="text-sm text-muted-foreground">{c.office.join(" · ")}</p>
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4">
              <Navigation className="size-4" /> {c.directions}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pt-16 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <h2 className="text-2xl font-semibold text-ink md:text-3xl">{c.faqTitle}</h2>
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-6">
            {c.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-base font-semibold text-start hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
