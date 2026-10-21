import { createContext, useContext, useEffect, type ReactNode } from "react";
import { strings, type Strings } from "@/content/strings";
import { formatNumber, languageInfo, type Language } from "@/content/languages";

export { languageFromPath, type Language } from "@/content/languages";

interface LanguageContextType {
  language: Language;
  dir: "ltr" | "rtl";
  s: Strings;
  /** Formats a number with the digits of the current language. */
  num: (n: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ language, children }: { language: Language; children: ReactNode }) {
  const { dir } = languageInfo(language);
  const s = strings[language];
  const num = (n: number) => formatNumber(n, language);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    // Persian and Sorani share the Vazirmatn font, which covers every Sorani letter.
    document.body.classList.toggle("font-persian", dir === "rtl");
  }, [language, dir]);

  return <LanguageContext.Provider value={{ language, dir, s, num }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
