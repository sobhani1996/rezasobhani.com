/* Organic Modernism / Biophilic design: keep the living, editorial hero composition while using trusted academic metrics and a current research highlight. */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, Leaf, Users } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const assetBase = `${import.meta.env.BASE_URL}images/`;

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${assetBase}hero-bg.png`} 
            alt="Abstract organic background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700 fade-in">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              {t('home.hero.role')}
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
              {t('home.hero.title.prefix')} <span className="text-primary italic">{t('home.hero.title.highlight')}</span> {t('home.hero.title.suffix')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t('home.hero.desc')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full text-base px-8 h-12" asChild>
                <Link href="/research">{t('home.hero.explore')}</Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full text-base px-8 h-12 bg-background/50 backdrop-blur-sm hover:bg-background/80" asChild>
                <Link href="/publications">{t('home.hero.publications')}</Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Visual/Stats */}
          <div className="relative animate-in slide-in-from-right-10 duration-1000 fade-in delay-200 mt-12 lg:mt-0">
            <div className="relative z-10">
              <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[4/5] mx-auto">
                {/* Organic shape background blob */}
                <div className="absolute inset-0 bg-secondary/50 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] rotate-6 scale-110 blur-sm" />
                
                {/* Photo container */}
                <div className="relative w-full h-full overflow-hidden rounded-[60%_40%_30%_70%/60%_30%_70%_40%] shadow-2xl border-4 border-white/50">
                  <img 
                    src={`${assetBase}profile-photo.jpg`} 
                    alt={t('home.hero.role')} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Stats Cards - Hidden on small mobile to prevent overflow */}
                <Card className="hidden sm:block absolute -left-4 md:-left-12 top-10 md:top-20 w-40 md:w-48 bg-white/80 backdrop-blur-md border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-left-5 delay-500">
                  <CardContent className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-serif font-bold text-foreground">86</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase">{t('home.stats.publications')}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hidden sm:block absolute -right-4 md:-right-8 bottom-20 md:bottom-32 w-40 md:w-48 bg-white/80 backdrop-blur-md border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-right-5 delay-700">
                  <CardContent className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
                    <div className="p-2 bg-accent/20 rounded-full text-accent-foreground">
                      <Users className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-serif font-bold text-foreground">938</div>
                      <div className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase">{t('home.stats.citations')}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Preview */}
      <section className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">{t('home.research.title')}</h2>
            <p className="text-muted-foreground max-w-md">{t('home.research.desc')}</p>
          </div>
          <Button variant="ghost" className="group" asChild>
            <Link href="/research">
              {t('home.research.viewAll')} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t('home.research.sustainable.title'),
              desc: t('home.research.sustainable.desc'),
              icon: Leaf,
              color: "bg-green-100 text-green-700"
            },
            {
              title: t('home.research.policy.title'),
              desc: t('home.research.policy.desc'),
              icon: BookOpen,
              color: "bg-blue-100 text-blue-700"
            },
            {
              title: t('home.research.public.title'),
              desc: t('home.research.public.desc'),
              icon: Users,
              color: "bg-orange-100 text-orange-700"
            }
          ].map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 p-8 transition-all hover:shadow-lg hover:border-primary/20">
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {item.desc}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Publication */}
      <section className="container">
        <div className="relative rounded-[2rem] overflow-hidden bg-secondary/30 border border-border/50">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
            <div className="space-y-6">
              <div className="inline-block text-primary font-bold tracking-wider text-sm uppercase">{t('home.featured.label')}</div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                {t('home.featured.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('home.featured.desc')}
              </p>
              <div className="flex gap-4 pt-4">
                <Button asChild>
                  <a href="https://doi.org/10.1111/1477-8947.70074" target="_blank" rel="noopener noreferrer">
                    {t('home.featured.read')}
                  </a>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/publications">{t('home.featured.seeAll')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src={`${assetBase}research-banner.png`} 
                alt="Research visualization" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
