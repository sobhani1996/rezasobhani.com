import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.research': 'Research',
    'nav.publications': 'Publications',
    'nav.contact': 'Contact',
    'nav.cta': 'Get in Touch',

    // Home
    'home.hero.role': 'Associate Professor at TUMS',
    'home.hero.title.prefix': 'Advancing',
    'home.hero.title.highlight': 'Sustainable',
    'home.hero.title.suffix': 'Nutrition & Public Health',
    'home.hero.desc': 'Exploring the intersection of food policy, environmental sustainability, and human health to create a better future for our food systems.',
    'home.hero.explore': 'Explore Research',
    'home.hero.publications': 'View Publications',
    'home.stats.publications': 'Publications',
    'home.stats.citations': 'Citations',
    'home.stats.experience': 'Years Exp.',
    'home.research.title': 'Research Focus',
    'home.research.desc': 'Key areas where I am dedicating my academic efforts to make a global impact.',
    'home.research.viewAll': 'View all research areas',
    'home.research.sustainable.title': 'Sustainable Diets',
    'home.research.sustainable.desc': 'Investigating dietary patterns that promote health while minimizing environmental impact.',
    'home.research.policy.title': 'Food Policy',
    'home.research.policy.desc': 'Analyzing and developing policies to improve food security and public health nutrition.',
    'home.research.public.title': 'Public Health',
    'home.research.public.desc': 'Community-based interventions to address malnutrition and diet-related diseases.',
    'home.featured.label': 'Featured Publication',
    'home.featured.title': 'The Necessity of Territorial Approaches for Designing and Implementing Sustainable Food Baskets: A Case Study in Iran',
    'home.featured.desc': 'Published in Natural Resources Forum (2026). A case study proposing territorial, context-sensitive approaches to sustainable food baskets in Iran.',
    'home.featured.read': 'Read Paper',
    'home.featured.seeAll': 'See All Publications',

    // About
    'about.title': 'About Me',
    'about.desc': 'I am an Associate Professor at Tehran University of Medical Sciences (TUMS), specializing in Food & Nutrition Policy. My work bridges the gap between nutritional science and public policy to foster sustainable health solutions.',
    'about.bio.title': 'Biography',
    'about.bio.p1': 'My academic journey has been driven by a passion for understanding how food systems impact both human health and the environment. With a Ph.D. in Food & Nutrition Policy, I have dedicated my research to exploring sustainable diets, food security, and the socio-economic determinants of nutritional health.',
    'about.bio.p2': 'Currently, I serve as an Associate Professor at the Department of Nutrition, Tehran University of Medical Sciences (TUMS). Prior to this, I have collaborated with prestigious institutions including Mashhad University of Medical Sciences and Shahid Beheshti University of Medical Sciences.',
    'about.bio.p3': 'My research portfolio includes 86 publications, focusing on critical topics such as the environmental footprint of dietary patterns, the optimisation of food baskets for sustainability and cost, and the role of nutrition in public health interventions.',
    'about.edu.title': 'Education & Experience',
    'about.edu.current.role': 'Associate Professor',
    'about.edu.current.place': 'Tehran University of Medical Sciences (TUMS)',
    'about.edu.current.loc': 'Tehran, Iran',
    'about.edu.current.date': '2020 - Present',
    'about.edu.prev.role': 'Ph.D. in Food & Nutrition Policy',
    'about.edu.prev.place': 'Tehran University of Medical Sciences',
    'about.edu.prev.label': 'Previous',
    'about.expertise.title': 'Expertise',
    'about.affiliations.title': 'Affiliations',

    // Research
    'research.title': 'Research Interests',
    'research.desc': 'My research is dedicated to solving complex challenges at the nexus of nutrition, environment, and policy. Here are the core pillars of my academic work.',
    'research.area1.title': 'Sustainable Diets & Environmental Impact',
    'research.area1.content': 'Investigating the environmental footprint of dietary patterns in Iran and globally. My research focuses on optimizing food baskets to be both nutritionally adequate and environmentally sustainable, reducing water footprints and greenhouse gas emissions while maintaining cultural acceptability.',
    'research.area2.title': 'Food Policy & Security',
    'research.area2.content': 'Analyzing national food policies and their impact on household food security. This includes studying the socio-economic determinants of food baskets, the effectiveness of taxation on sugar-sweetened beverages, and strategies to improve food access for vulnerable populations.',
    'research.area3.title': 'Nutritional Epidemiology',
    'research.area3.content': 'Conducting large-scale epidemiological studies to understand the trends and determinants of undernourishment and obesity. Utilizing national household budget surveys to track changes in food consumption over decades.',
    'research.area4.title': 'Clinical Nutrition Interventions',
    'research.area4.content': 'Exploring the medicinal attributes of functional foods, such as mushrooms and pomegranate peel, on metabolic syndrome risk factors, wound healing, and chronic disease management.',
    'research.contributions.title': 'Recent Contributions',
    'research.contrib1.title': 'Edible mushrooms as an alternative to animal proteins',
    'research.contrib1.desc': 'A review published in the Journal of Health, Population and Nutrition, advocating for sustainable protein sources.',
    'research.contrib2.title': 'AI in Food Systems',
    'research.contrib2.desc': 'Reviewing artificial intelligence applications for advancing sustainability in food and nutrition systems (Frontiers in Nutrition).',

    // Publications
    'publications.title': 'Selected Publications',
    'publications.desc': 'A curated selection of recent and influential research outputs. For the complete record, please visit my Google Scholar or ResearchGate profile.',
    'publications.updated': 'Publication list updated 13 August 2026. Citation counts are a Google Scholar snapshot from the same date.',
    'publications.googleScholar': 'Google Scholar',
    'publications.researchGate': 'ResearchGate',
    'publications.citations': 'Citations',
    'publications.new': 'New',

    // Publication titles
    'pub.territorial.title': 'The Necessity of Territorial Approaches for Designing and Implementing Sustainable Food Baskets: A Case Study in Iran',
    'pub.obesitySystems.title': 'Obesity prevention and sustainable food systems: rethinking the nexus through a health in all policies approach',
    'pub.hospitalMenus.title': 'A two-phase optimization approach in designing sustainable hospital menus by integrating nutrition, cost, and environmental factors',
    'pub.behaviourQuestionnaire.title': 'Development and psychometric validation of a questionnaire on health-oriented dietary behaviors with indirect sustainability implications among Iranian adults: a Theory of Planned Behavior approach',
    'pub.sustainableDietReview.title': 'Influencing factors of adherence to sustainable diets: a systematic review of behavioral theories',
    'pub.foodConsumptionIran.title': 'Exploring the association between socio-economic and environmental factors and food consumption in Iran: insights from time series data',
    'pub.edibleMushrooms.title': 'Edible mushrooms as an alternative to animal proteins for having a more sustainable diet: a review',
    'pub.nourishingMind.title': 'Nourishing the mind: how the EAT-Lancet reference diet and MIND diet impact stress, anxiety, and depression',
    'pub.planetaryMetabolic.title': 'Adherence to the planetary health diet index and metabolic syndrome: cross-sectional results from the PERSIAN cohort study',
    'pub.foodWaste.title': 'Food waste reduction and its environmental consequences: a quasi-experimental study in a campus canteen',
    'pub.aiSustainability.title': 'Advancing sustainability in the food and nutrition system: a review of artificial intelligence applications',
    'pub.pomegranateTrial.title': 'Pomegranate (Punica granatum L.) peel extract ameliorates metabolic syndrome risk factors in patients with non-alcoholic fatty liver disease: a randomized double-blind clinical trial',
    'pub.foodBasket.title': 'Designing a healthy, low-cost and environmentally sustainable food basket: an optimisation study',
    'pub.sustainablePattern.title': 'Shifting to a sustainable dietary pattern in Iranian population: current evidence and future directions',
    'pub.woundHealingMushrooms.title': 'Mushrooms-rich preparations on wound healing: from nutritional to medicinal attributes',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.desc': 'I am always open to collaboration, academic inquiries, and discussions about sustainable nutrition.',
    'contact.email.title': 'Email',
    'contact.email.desc': 'For academic and professional inquiries, please reach out via email.',
    'contact.office.title': 'Office Location',
    'contact.office.desc': 'Department of Nutrition\nTehran University of Medical Sciences\nTehran, Iran',
    'contact.social.title': 'Connect on Social Media',
    'contact.visit.title': 'Visit TUMS',
    'contact.visit.desc': 'Tehran University of Medical Sciences Campus',
    'contact.book.title': 'Book an Appointment',
    'contact.book.desc': 'Schedule a meeting directly via Google Calendar.',
    'contact.book.btn': 'Schedule Meeting',
  },
  fa: {
    // Navigation
    'nav.home': 'خانه',
    'nav.about': 'درباره من',
    'nav.research': 'پژوهش‌ها',
    'nav.publications': 'انتشارات',
    'nav.contact': 'تماس',
    'nav.cta': 'ارتباط با من',

    // Home
    'home.hero.role': 'دکتر سید رضا سبحانی، دانشیار دانشگاه علوم پزشکی تهران',
    'home.hero.title.prefix': 'پیشبرد',
    'home.hero.title.highlight': 'تغذیه پایدار',
    'home.hero.title.suffix': 'و سلامت عمومی',
    'home.hero.desc': 'دکتر سید رضا سبحانی به کاوش در تقاطع سیاست‌گذاری غذا، پایداری محیط‌زیست و سلامت انسان می‌پردازد تا آینده‌ای بهتر برای سیستم‌های غذایی ما ایجاد کند.',
    'home.hero.explore': 'مشاهده پژوهش‌ها',
    'home.hero.publications': 'مشاهده مقالات',
    'home.stats.publications': 'مقاله',
    'home.stats.citations': 'استناد',
    'home.stats.experience': 'سال تجربه',
    'home.research.title': 'تمرکز پژوهشی',
    'home.research.desc': 'حوزه‌های کلیدی که دکتر سید رضا سبحانی تلاش‌های آکادمیک خود را برای ایجاد تأثیر جهانی به آن‌ها اختصاص داده است.',
    'home.research.viewAll': 'مشاهده همه حوزه‌ها',
    'home.research.sustainable.title': 'رژیم‌های غذایی پایدار',
    'home.research.sustainable.desc': 'بررسی الگوهای غذایی که ضمن ارتقای سلامت، اثرات زیست‌محیطی را به حداقل می‌رسانند.',
    'home.research.policy.title': 'سیاست‌گذاری غذا',
    'home.research.policy.desc': 'تحلیل و توسعه سیاست‌هایی برای بهبود امنیت غذایی و تغذیه سلامت عمومی.',
    'home.research.public.title': 'سلامت عمومی',
    'home.research.public.desc': 'مداخلات جامعه‌محور برای مقابله با سوءتغذیه و بیماری‌های مرتبط با رژیم غذایی.',
    'home.featured.label': 'مقاله برگزیده',
    'home.featured.title': 'ضرورت رویکردهای منطقه‌محور برای طراحی و اجرای سبدهای غذایی پایدار: مطالعه موردی ایران',
    'home.featured.desc': 'منتشر شده در Natural Resources Forum (۲۰۲۶). مطالعه‌ای موردی درباره رویکردهای منطقه‌محور و متناسب با زمینه برای طراحی سبدهای غذایی پایدار در ایران.',
    'home.featured.read': 'خواندن مقاله',
    'home.featured.seeAll': 'مشاهده همه مقالات',

    // About
    'about.title': 'درباره دکتر سید رضا سبحانی',
    'about.desc': 'دکتر سید رضا سبحانی دانشیار دانشگاه علوم پزشکی تهران است و در زمینه سیاست‌گذاری غذا و تغذیه تخصص دارد. کار ایشان پل ارتباطی میان علوم تغذیه و سیاست‌گذاری عمومی برای ایجاد راهکارهای سلامت پایدار است.',
    'about.bio.title': 'بیوگرافی',
    'about.bio.p1': 'سفر آکادمیک دکتر سید رضا سبحانی با اشتیاق به درک چگونگی تأثیر سیستم‌های غذایی بر سلامت انسان و محیط‌زیست هدایت شده است. با مدرک دکتری در سیاست‌گذاری غذا و تغذیه، ایشان پژوهش‌های خود را به بررسی رژیم‌های غذایی پایدار، امنیت غذایی و عوامل اجتماعی-اقتصادی تعیین‌کننده سلامت تغذیه‌ای اختصاص داده‌اند.',
    'about.bio.p2': 'در حال حاضر، به عنوان دانشیار در گروه تغذیه دانشگاه علوم پزشکی تهران (TUMS) مشغول به خدمت هستم. پیش از این، با موسسات معتبری از جمله دانشگاه علوم پزشکی مشهد و دانشگاه علوم پزشکی شهید بهشتی همکاری داشته‌ام.',
    'about.bio.p3': 'کارنامه پژوهشی من شامل ۸۶ مقاله است که بر موضوعات حیاتی مانند ردپای زیست‌محیطی الگوهای غذایی، بهینه‌سازی سبدهای غذایی برای پایداری و هزینه، و نقش تغذیه در مداخلات سلامت عمومی تمرکز دارد.',
    'about.edu.title': 'تحصیلات و تجربیات',
    'about.edu.current.role': 'دانشیار',
    'about.edu.current.place': 'دانشگاه علوم پزشکی تهران',
    'about.edu.current.loc': 'تهران، ایران',
    'about.edu.current.date': '۱۳۹۹ - تاکنون',
    'about.edu.prev.role': 'دکتری سیاست‌گذاری غذا و تغذیه',
    'about.edu.prev.place': 'دانشگاه علوم پزشکی تهران',
    'about.edu.prev.label': 'پیشین',
    'about.expertise.title': 'تخصص‌ها',
    'about.affiliations.title': 'وابستگی‌های سازمانی',

    // Research
    'research.title': 'علایق پژوهشی',
    'research.desc': 'پژوهش‌های من به حل چالش‌های پیچیده در تقاطع تغذیه، محیط‌زیست و سیاست‌گذاری اختصاص دارد. در اینجا ارکان اصلی کار آکادمیک من آمده است.',
    'research.area1.title': 'رژیم‌های غذایی پایدار و اثرات زیست‌محیطی',
    'research.area1.content': 'بررسی ردپای زیست‌محیطی الگوهای غذایی در ایران و جهان. تمرکز پژوهش من بر بهینه‌سازی سبدهای غذایی است تا هم از نظر تغذیه‌ای کافی باشند و هم از نظر زیست‌محیطی پایدار، با کاهش ردپای آب و انتشار گازهای گلخانه‌ای ضمن حفظ مقبولیت فرهنگی.',
    'research.area2.title': 'سیاست‌گذاری و امنیت غذایی',
    'research.area2.content': 'تحلیل سیاست‌های ملی غذا و تأثیر آن‌ها بر امنیت غذایی خانوار. این شامل مطالعه عوامل اجتماعی-اقتصادی تعیین‌کننده سبدهای غذایی، اثربخشی مالیات بر نوشیدنی‌های شیرین‌شده با شکر، و راهکارهای بهبود دسترسی به غذا برای جمعیت‌های آسیب‌پذیر است.',
    'research.area3.title': 'اپیدمیولوژی تغذیه',
    'research.area3.content': 'انجام مطالعات اپیدمیولوژیک بزرگ‌مقیاس برای درک روندها و عوامل تعیین‌کننده سوءتغذیه و چاقی. استفاده از پیمایش‌های ملی بودجه خانوار برای ردیابی تغییرات مصرف غذا در طول دهه‌ها.',
    'research.area4.title': 'مداخلات تغذیه بالینی',
    'research.area4.content': 'بررسی ویژگی‌های دارویی غذاهای فراسودمند، مانند قارچ و پوست انار، بر عوامل خطر سندرم متابولیک، بهبود زخم و مدیریت بیماری‌های مزمن.',
    'research.contributions.title': 'مشارکت‌های اخیر',
    'research.contrib1.title': 'قارچ‌های خوراکی به عنوان جایگزینی برای پروتئین‌های حیوانی',
    'research.contrib1.desc': 'مروری منتشر شده در مجله سلامت، جمعیت و تغذیه، که از منابع پروتئینی پایدار حمایت می‌کند.',
    'research.contrib2.title': 'هوش مصنوعی در سیستم‌های غذایی',
    'research.contrib2.desc': 'مروری بر کاربردهای هوش مصنوعی برای پیشبرد پایداری در سیستم‌های غذا و تغذیه (Frontiers in Nutrition).',

    // Publications
    'publications.title': 'مقالات منتخب',
    'publications.desc': 'منتخبی از پژوهش‌های اخیر و اثرگذار. برای مشاهده کارنامه کامل، لطفاً به پروفایل گوگل اسکولار یا ریسرچ‌گیت من مراجعه کنید.',
    'publications.updated': 'فهرست مقالات در ۱۳ اوت ۲۰۲۶ به‌روزرسانی شده است. تعداد استنادها بر اساس نمایه گوگل اسکولار در همین تاریخ است.',
    'publications.googleScholar': 'گوگل اسکولار',
    'publications.researchGate': 'ریسرچ‌گیت',
    'publications.citations': 'استناد',
    'publications.new': 'جدید',

    // Publication titles
    'pub.territorial.title': 'ضرورت رویکردهای منطقه‌محور برای طراحی و اجرای سبدهای غذایی پایدار: مطالعه موردی ایران',
    'pub.obesitySystems.title': 'پیشگیری از چاقی و نظام‌های غذایی پایدار: بازاندیشی پیوند میان آن‌ها از منظر رویکرد سلامت در همه سیاست‌ها',
    'pub.hospitalMenus.title': 'رویکرد بهینه‌سازی دو مرحله‌ای در طراحی منوهای پایدار بیمارستانی با تلفیق تغذیه، هزینه و عوامل زیست‌محیطی',
    'pub.behaviourQuestionnaire.title': 'توسعه و اعتبارسنجی روان‌سنجی پرسشنامه رفتارهای غذایی سلامت‌محور با پیامدهای غیرمستقیم پایداری در بزرگسالان ایرانی: رویکرد نظریه رفتار برنامه‌ریزی‌شده',
    'pub.sustainableDietReview.title': 'عوامل مؤثر بر پایبندی به رژیم‌های غذایی پایدار: مرور نظام‌مند نظریه‌های رفتاری',
    'pub.foodConsumptionIran.title': 'بررسی ارتباط عوامل اجتماعی‌ـ‌اقتصادی و زیست‌محیطی با مصرف غذا در ایران: یافته‌هایی از داده‌های سری زمانی',
    'pub.edibleMushrooms.title': 'قارچ‌های خوراکی به‌عنوان جایگزینی برای پروتئین‌های حیوانی در مسیر رژیم غذایی پایدارتر: یک مرور',
    'pub.nourishingMind.title': 'تغذیه ذهن: تأثیر رژیم مرجع ایت‌لنست و رژیم مایند بر استرس، اضطراب و افسردگی',
    'pub.planetaryMetabolic.title': 'پایبندی به شاخص رژیم سلامت سیاره‌ای و سندرم متابولیک: نتایج مقطعی از مطالعه کوهورت پرشین',
    'pub.foodWaste.title': 'کاهش دورریز غذا و پیامدهای زیست‌محیطی آن: مطالعه‌ای شبه‌آزمایشی در سلف دانشگاهی',
    'pub.aiSustainability.title': 'پیشبرد پایداری در نظام غذا و تغذیه: مروری بر کاربردهای هوش مصنوعی',
    'pub.pomegranateTrial.title': 'عصاره پوست انار (Punica granatum L.) عوامل خطر سندرم متابولیک را در مبتلایان به بیماری کبد چرب غیرالکلی بهبود می‌دهد: کارآزمایی بالینی دوسوکور تصادفی‌شده',
    'pub.foodBasket.title': 'طراحی سبد غذایی سالم، کم‌هزینه و پایدار از نظر زیست‌محیطی: مطالعه بهینه‌سازی',
    'pub.sustainablePattern.title': 'گذار به الگوی غذایی پایدار در جمعیت ایران: شواهد کنونی و مسیرهای آینده',
    'pub.woundHealingMushrooms.title': 'فرآورده‌های غنی از قارچ در بهبود زخم: از ویژگی‌های تغذیه‌ای تا دارویی',

    // Contact
    'contact.title': 'تماس با من',
    'contact.desc': 'من همیشه آماده همکاری، پاسخ به پرسش‌های آکادمیک و بحث درباره تغذیه پایدار هستم.',
    'contact.email.title': 'ایمیل',
    'contact.email.desc': 'برای پرسش‌های آکادمیک و حرفه‌ای، لطفاً از طریق ایمیل با من در ارتباط باشید.',
    'contact.office.title': 'محل دفتر',
    'contact.office.desc': 'گروه تغذیه\nدانشگاه علوم پزشکی تهران\nتهران، ایران',
    'contact.social.title': 'شبکه‌های اجتماعی',
    'contact.visit.title': 'بازدید از دانشگاه',
    'contact.visit.desc': 'پردیس دانشگاه علوم پزشکی تهران',
    'contact.book.title': 'رزرو وقت ملاقات',
    'contact.book.desc': 'زمان جلسه را مستقیماً از طریق گوگل کلندر هماهنگ کنید.',
    'contact.book.btn': 'هماهنگی جلسه',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    if (language === 'fa') {
      document.body.classList.add('font-persian');
    } else {
      document.body.classList.remove('font-persian');
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
