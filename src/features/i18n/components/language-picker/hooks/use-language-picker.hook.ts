import type { AvailableLanguage } from "@/features/i18n/types/language.type";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useRef, useState } from "react";
import { changeLanguage } from "../actions/change-language.action";

export function useLanguagePicker(defaultLanguage: AvailableLanguage) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<AvailableLanguage>(defaultLanguage);

  const windowEventCbRef = useRef<(e: MouseEvent) => void>();
  const dropdownRef = useRef<HTMLUListElement>(null);

  const router = useRouter();

  useEffect(() => {
    return () => {
      windowEventCbRef.current &&
        window.removeEventListener("click", windowEventCbRef.current, true);
    };
  }, []);

  const togglePicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowPicker(!showPicker);

    const openerButton = e.currentTarget;

    windowEventCbRef.current = e => {
      const hasTarget = e.target !== null;
      const isOpenerButtonClick = openerButton.contains(e.target as Node);
      const isDropdownClick = dropdownRef.current?.contains(e.target as Node);

      const isClickOutside =
        hasTarget && !isOpenerButtonClick && !isDropdownClick;

      if (isClickOutside) {
        setShowPicker(false);

        windowEventCbRef.current &&
          window.removeEventListener("click", windowEventCbRef.current, true);
      }
    };

    window.addEventListener("click", windowEventCbRef.current, true);
  };

  const handleLanguageSelection = async (language: AvailableLanguage) => {
    setSelectedLanguage(language);
    setShowPicker(false);

    await changeLanguage(language);

    router.refresh();
  };

  return {
    showPicker,
    selectedLanguage,
    togglePicker,
    handleLanguageSelection,
    dropdownRef,
  };
}
