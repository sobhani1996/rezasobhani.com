// The site's languages. English lives at the root, the others under their own prefix.

export type Language = "en" | "fa" | "ckb";

export const languages: { code: Language; label: string; prefix: string; dir: "ltr" | "rtl"; ogLocale: string }[] = [
  { code: "en", label: "English", prefix: "", dir: "ltr", ogLocale: "en_US" },
  { code: "fa", label: "فارسی", prefix: "/fa", dir: "rtl", ogLocale: "fa_IR" },
  { code: "ckb", label: "کوردی", prefix: "/ckb", dir: "rtl", ogLocale: "ckb_IQ" },
];

export const languageInfo = (code: Language) => languages.find((l) => l.code === code)!;

export const languageFromPath = (path: string): Language =>
  languages.find((l) => l.prefix && (path === l.prefix || path.startsWith(`${l.prefix}/`)))?.code ?? "en";

// Persian uses Extended Arabic-Indic digits, Sorani the Arabic-Indic ones used in Iraq.
// Done by hand rather than with Intl so the server-rendered HTML and the browser always agree.
const digitSets: Partial<Record<Language, string>> = { fa: "۰۱۲۳۴۵۶۷۸۹", ckb: "٠١٢٣٤٥٦٧٨٩" };

export function formatNumber(n: number, language: Language, grouping = true): string {
  const latin = grouping ? n.toLocaleString("en-US") : String(n);
  const digits = digitSets[language];
  return digits ? latin.replace(/\d/g, (d) => digits[Number(d)]).replace(/,/g, "٬") : latin;
}
