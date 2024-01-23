import { cookies } from "next/headers";
import { LANGUAGE_COOKIE_NAME } from "../constants/language.constant";
import { AvailableLanguage } from "../types/language.type";

export function getTranslation() {
  const lang = cookies().get(LANGUAGE_COOKIE_NAME)?.value as AvailableLanguage;

  switch (lang) {
    case "en":
      return import("../data/en.json").then(mod => mod.default);
    case "es":
      return import("../data/es.json").then(mod => mod.default);
  }
}
