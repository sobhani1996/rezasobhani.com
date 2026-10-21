import { createContext, useContext, useEffect, type ReactNode } from "react";
import { strings, type Strings } from "@/content/strings";

export type Language = "en" | "fa";

interface LanguageContextType {
  language: Language;
  dir: "ltr" | "rtl";
  s: Strings;
  /** Formats a number with the digits of the current language. */
  num: (n: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languageFromPath = (path: string): Language =>
  path === "/fa" || path.startsWith("/fa/") ? "fa" : "en";

export function LanguageProvider({ language, children }: { language: Language; children: ReactNode }) {
  const dir = language === "fa" ? "rtl" : "ltr";
  const s = strings[language];
  const num = (n: number) => n.toLocaleString(language === "fa" ? "fa-IR" : "en-US");

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    document.body.classList.toggle("font-persian", language === "fa");
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
