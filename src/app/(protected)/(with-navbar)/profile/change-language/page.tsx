import LanguagePicker from "@/features/i18n/components/language-picker/language-picker.component";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE_NAME,
} from "@/features/i18n/constants/language.constant";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import type { AvailableLanguage } from "@/features/i18n/types/language.type";
import { cookies } from "next/headers";

export default async function ChangeLanguagePage() {
  const dictionary = await getTranslation();
  const cookieStore = cookies();

  const currentLanguage = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value;

  return (
    <LanguagePicker
      dictionary={dictionary.changeLanguage}
      defaultLanguage={
        (currentLanguage ?? DEFAULT_LANGUAGE) as AvailableLanguage
      }
    />
  );
}
