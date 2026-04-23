import "server-only";
import type { Locale } from "@/config/i18n";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  it: () => import("./dictionaries/it.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  cs: () => import("./dictionaries/cs.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export type Dictionary = typeof import("./dictionaries/en.json");

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
