import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Linkedin, Globe, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Header */}
      <section className="bg-primary/5 py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('contact.desc')}
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="max-w-3xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-border/50">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold">{t('contact.email.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('contact.email.desc')}
                  </p>
                  <a href="mailto:sobhani.r@mums.ac.ir" className="text-primary font-medium hover:underline block pt-2">
                    sobhani.r@mums.ac.ir
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold">{t('contact.office.title')}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {t('contact.office.desc')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-primary/5">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold">{t('contact.book.title')}</h3>
                    <p className="text-muted-foreground mt-1">
                      {t('contact.book.desc')}
                    </p>
                  </div>
                  <Button className="w-full sm:w-auto" asChild>
                    <a href="https://calendar.app.google/nToTptKaC41M8Yrg7" target="_blank" rel="noopener noreferrer">
                      {t('contact.book.btn')}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="pt-8">
              <h3 className="font-serif text-2xl font-bold mb-6">{t('contact.social.title')}</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="https://www.linkedin.com/in/seyyed-reza-sobhani-26719315b/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 text-[#0077b5]" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="https://scholar.google.com/citations?user=qNxmLSEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-5 h-5 text-[#4285F4]" />
                    {t('publications.googleScholar')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
