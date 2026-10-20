/* Organic Modernism / Biophilic design: preserve the sage, warm-beige academic reading experience while presenting source-linked scholarly records with calm hierarchy. */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Publications() {
  const { t } = useLanguage();
  const publications = [
    {
      title: t('pub.territorial.title'),
      journal: "Natural Resources Forum",
      year: 2026,
      authors: "K. Irankhah, S. F. Fatemi & S. R. Sobhani",
      link: "https://doi.org/10.1111/1477-8947.70074",
      isNew: true,
    },
    {
      title: t('pub.obesitySystems.title'),
      journal: "The Journal of Climate Change and Health",
      year: 2026,
      authors: "Z. Namkhah, M. Zareian, N. Abbaspour & S. R. Sobhani",
      link: "https://doi.org/10.1016/j.joclim.2026.100687",
      isNew: true,
    },
    {
      title: t('pub.hospitalMenus.title'),
      journal: "Scientific Reports",
      year: 2026,
      authors: "F. Ehsanitabar, S. Varasteh Yazdi, A. Arzehgar, M. Zareian, N. Seifi, Z. Khorasanchi & S. R. Sobhani",
      link: "https://doi.org/10.1038/s41598-026-49791-7",
      isNew: true,
    },
    {
      title: t('pub.behaviourQuestionnaire.title'),
      journal: "Journal of Hunger & Environmental Nutrition",
      year: 2026,
      authors: "S. F. Fatemi, H. Tehrani, J. Jamali, M. Khosravi, … & S. R. Sobhani",
      link: "https://doi.org/10.1080/19320248.2025.2611935",
      isNew: true,
    },
    {
      title: t('pub.sustainableDietReview.title'),
      journal: "Frontiers in Sustainable Food Systems",
      year: 2025,
      citations: 14,
      authors: "S. F. Fatemi, H. Tehrani, M. Khosravi, H. Doosti, N. Rasaei & S. R. Sobhani",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:hkOj_22Ku90C",
    },
    {
      title: t('pub.foodConsumptionIran.title'),
      journal: "BMC Public Health",
      year: 2025,
      citations: 14,
      authors: "P. Rahbarinejad, S. R. Sobhani, N. Sangsefidi, K. Irankhah, …",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:W5xh706n7nkC",
    },
    {
      title: t('pub.edibleMushrooms.title'),
      journal: "Journal of Health, Population and Nutrition",
      year: 2024,
      citations: 58,
      authors: "K. H. A. Pashaei, K. Irankhah, Z. Namkhah & S. R. Sobhani",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:ZuybSZzF8UAC",
    },
    {
      title: t('pub.nourishingMind.title'),
      journal: "BMC Psychiatry",
      year: 2024,
      citations: 32,
      authors: "F. Kamrani, A. A. Kachouei, S. R. Sobhani & M. Khosravi",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:5awf1xo2G04C",
    },
    {
      title: t('pub.planetaryMetabolic.title'),
      journal: "BMC Public Health",
      year: 2024,
      citations: 21,
      authors: "S. Shojaei, Z. Dehnavi, K. Irankhah, S. F. Fatemi & S. R. Sobhani",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:LjlpjdlvIbIC",
    },
    {
      title: t('pub.foodWaste.title'),
      journal: "Agriculture & Food Security",
      year: 2024,
      citations: 19,
      authors: "S. F. Fatemi, H. Eini-Zinab, F. M. Anari, M. Amirolad, Z. Babaei & S. R. Sobhani",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:eq2jaN3J8jMC",
    },
    {
      title: t('pub.aiSustainability.title'),
      journal: "Frontiers in Nutrition",
      year: 2023,
      citations: 53,
      authors: "Z. Namkhah, S. F. Fatemi, A. Mansoori, S. Nosratabadi, … & S. R. Sobhani",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:AXPGKjj_ei8C",
    },
    {
      title: t('pub.pomegranateTrial.title'),
      journal: "Nutrition Journal",
      year: 2023,
      citations: 51,
      authors: "H. Barghchi, N. Milkarizi, S. Belyani, A. Norouzian Ostad, V. R. Askari, … & S. R. Sobhani",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:t6usbXjVLHcC",
    },
    {
      title: t('pub.foodBasket.title'),
      journal: "Public Health Nutrition",
      year: 2021,
      citations: 67,
      authors: "H. Eini-Zinab, S. R. Sobhani & A. Rezazadeh",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:XiSMed-E-HIC",
    },
    {
      title: t('pub.sustainablePattern.title'),
      journal: "Frontiers in Nutrition",
      year: 2021,
      citations: 31,
      authors: "S. R. Sobhani, N. Omidvar, Z. Abdollahi & A. Al Jawaldeh",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:tS2w5q8j5-wC",
    },
    {
      title: t('pub.woundHealingMushrooms.title'),
      journal: "Frontiers in Pharmacology",
      year: 2020,
      citations: 68,
      authors: "J. Sharifi-Rad, M. Butnariu, S. M. Ezzat, C. O. Adetunji, M. Imran, S. R. Sobhani, …",
      link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=qNxmLSEAAAAJ&citation_for_view=qNxmLSEAAAAJ:OU6Ihb5iCvQC",
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Header */}
      <section className="bg-secondary/30 py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t('publications.title')}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('publications.desc')}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{t('publications.updated')}</p>
            <div className="flex gap-4 mt-8">
              <Button asChild>
                <a href="https://scholar.google.com/citations?user=qNxmLSEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
                  {t('publications.googleScholar')} <ExternalLink className="ml-2 w-4 h-4 rtl:mr-2 rtl:ml-0" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.researchgate.net/profile/Seyyed-Reza-Sobhani" target="_blank" rel="noopener noreferrer">
                  {t('publications.researchGate')} <ExternalLink className="ml-2 w-4 h-4 rtl:mr-2 rtl:ml-0" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="container max-w-4xl">
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <Card key={index} className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-bold text-primary">{pub.year}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="font-medium text-foreground">{pub.journal}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      <a href={pub.link} target="_blank" rel="noopener noreferrer">
                        {pub.title}
                      </a>
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                      {pub.authors}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <div className="text-xs font-medium px-2 py-1 rounded bg-secondary text-secondary-foreground whitespace-nowrap">
                      {pub.isNew ? t('publications.new') : `${pub.citations} ${t('publications.citations')}`}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                      <a href={pub.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
