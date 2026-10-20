import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Building2, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const assetBase = `${import.meta.env.BASE_URL}images/`;

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Header */}
      <section className="relative bg-secondary/30 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${assetBase}about-texture.png)`, backgroundSize: "200px" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">{t('about.title')}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.desc')}
            </p>
          </div>
        </div>
      </section>

      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Bio */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={`${assetBase}profile-photo.jpg`} 
                    alt="Seyyed Reza Sobhani" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="font-serif text-3xl font-bold flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full block" />
                  {t('about.bio.title')}
                </h2>
                <div className="prose prose-lg text-muted-foreground max-w-none">
                  <p>{t('about.bio.p1')}</p>
                  <p>{t('about.bio.p2')}</p>
                  <p>{t('about.bio.p3')}</p>
                </div>
              </div>
        </div>
      </section>

          {/* Education & Experience */}
          <section className="space-y-8">
            <h2 className="font-serif text-3xl font-bold flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full block" />
              {t('about.edu.title')}
            </h2>
            
            <div className="relative border-l-2 border-primary/20 ml-3 space-y-12 py-4 rtl:border-l-0 rtl:border-r-2 rtl:ml-0 rtl:mr-3">
              {/* Item 1 */}
              <div className="relative pl-8 md:pl-12 rtl:pl-0 rtl:pr-8 md:rtl:pr-12">
                <div className="absolute -left-[9px] rtl:-right-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="space-y-2">
                  <span className="text-sm font-bold text-primary tracking-wider uppercase">{t('about.edu.current.date')}</span>
                  <h3 className="text-xl font-bold font-serif">{t('about.edu.current.role')}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>{t('about.edu.current.place')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{t('about.edu.current.loc')}</span>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative pl-8 md:pl-12 rtl:pl-0 rtl:pr-8 md:rtl:pr-12">
                <div className="absolute -left-[9px] rtl:-right-[9px] top-1 w-4 h-4 rounded-full bg-muted-foreground/40 border-4 border-background" />
                <div className="space-y-2">
                  <span className="text-sm font-bold text-muted-foreground tracking-wider uppercase">{t('about.edu.prev.label')}</span>
                  <h3 className="text-xl font-bold font-serif">{t('about.edu.prev.role')}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span>{t('about.edu.prev.place')}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-card border-border/50 shadow-lg sticky top-24">
            <CardContent className="p-8 space-y-8">
              <div>
                <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  {t('about.expertise.title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Public Health Nutrition",
                    "Food Policy",
                    "Sustainable Diets",
                    "Food Security",
                    "Environmental Sustainability",
                    "Nutritional Epidemiology"
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-secondary-foreground font-normal py-1.5 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-serif text-xl font-bold mb-2">{t('about.affiliations.title')}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    Mashhad University of Medical Sciences
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    Shahid Beheshti University of Medical Sciences
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    Tehran University of Medical Sciences
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
