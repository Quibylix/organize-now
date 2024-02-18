import type { AvailableLanguage } from "@/features/i18n/types/language.type";

export const LANGUAGES_INFO: {
  abbr: AvailableLanguage;
  name: string;
  flag: string;
}[] = [
  {
    abbr: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    abbr: "es",
    name: "Español",
    flag: "🇪🇸",
  },
];
