import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Globe, Scale, HeartPulse } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Research() {
  const { t } = useLanguage();

  const researchAreas = [
    {
      title: t('research.area1.title'),
      icon: Leaf,
      content: t('research.area1.content'),
      tags: ["Sustainability", "Water Footprint", "GHG Emissions", "Dietary Patterns"]
    },
    {
      title: t('research.area2.title'),
      icon: Scale,
      content: t('research.area2.content'),
      tags: ["Policy Analysis", "Food Security", "Socio-economics", "Public Health"]
    },
    {
      title: t('research.area3.title'),
      icon: Globe,
      content: t('research.area3.content'),
      tags: ["Epidemiology", "Data Analysis", "Population Health", "Trends"]
    },
    {
      title: t('research.area4.title'),
      icon: HeartPulse,
      content: t('research.area4.content'),
      tags: ["Clinical Trials", "Functional Foods", "Metabolic Health", "Wound Healing"]
    }
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Header */}
      <section className="bg-primary/5 py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t('research.title')}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('research.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas Grid */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {researchAreas.map((area, index) => (
            <Card key={index} className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-2xl">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {area.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Current Projects Preview (Placeholder) */}
      <section className="container">
        <div className="bg-secondary/30 rounded-3xl p-8 md:p-12 border border-border/50">
          <h2 className="font-serif text-3xl font-bold mb-8">{t('research.contributions.title')}</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-32 shrink-0 text-sm font-bold text-primary uppercase tracking-wider pt-1">2024</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('research.contrib1.title')}</h3>
                <p className="text-muted-foreground">
                  {t('research.contrib1.desc')}
                </p>
              </div>
            </div>
            <div className="w-full h-px bg-border" />
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-32 shrink-0 text-sm font-bold text-primary uppercase tracking-wider pt-1">2023</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{t('research.contrib2.title')}</h3>
                <p className="text-muted-foreground">
                  {t('research.contrib2.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
