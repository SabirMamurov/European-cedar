export const locales = ["en", "de", "it", "fr", "cs", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
  cs: "Čeština",
  ru: "Русский",
};

export const localeFlags: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  it: "IT",
  fr: "FR",
  cs: "CS",
  ru: "RU",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
