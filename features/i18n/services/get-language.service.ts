import { cookies } from "next/headers";
import { LANGUAGE_COOKIE_NAME } from "../constants/language.constant";
import { AvailableLanguage } from "../types/language.type";

export function getLanguage() {
  return cookies().get(LANGUAGE_COOKIE_NAME)!.value as AvailableLanguage;
}
