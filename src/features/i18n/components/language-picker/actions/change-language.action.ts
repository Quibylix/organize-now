"use server";

import { LANGUAGE_COOKIE_NAME } from "@/features/i18n/constants/language.constant";
import type { AvailableLanguage } from "@/features/i18n/types/language.type";
import { cookies } from "next/headers";

export async function changeLanguage(newLanguage: AvailableLanguage) {
  const cookieStore = cookies();

  cookieStore.set(LANGUAGE_COOKIE_NAME, newLanguage);
}
