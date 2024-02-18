"use client";

import type { AvailableLanguage } from "@/features/i18n/types/language.type";
import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import Icon from "../../../ui/components/icon/icon.component";
import { LANGUAGES_INFO } from "./constants/languages-info.constant";
import { useLanguagePicker } from "./hooks/use-language-picker.hook";
import LanguagePickerDropdownMenu from "./language-picker-dropdown-menu.component";
import styles from "./language-picker.module.css";

type LanguagePickerProps = {
  dictionary: {
    selectLanguage: string;
  };
  defaultLanguage: AvailableLanguage;
};

export default function LanguagePicker({
  dictionary,
  defaultLanguage,
}: LanguagePickerProps) {
  const {
    showPicker,
    selectedLanguage,
    handleLanguageSelection,
    togglePicker,
    dropdownRef,
  } = useLanguagePicker(defaultLanguage);

  const currentLanguageInfo = LANGUAGES_INFO.find(
    el => el.abbr === selectedLanguage,
  );

  const iconClassName = joinClassNames(styles.icon, {
    [styles.iconRotated]: !showPicker,
  });

  return (
    <div>
      <h2 className={styles.label}>{dictionary.selectLanguage}</h2>
      <div className={styles.picker}>
        <button className={styles.selectedOption} onClick={togglePicker}>
          <span role="img" aria-label={currentLanguageInfo?.name} aria-hidden>
            {currentLanguageInfo?.flag}
          </span>
          <span>{currentLanguageInfo?.name}</span>
          <span>
            <Icon className={iconClassName} name="arrow-up" />
          </span>
        </button>
        {showPicker && (
          <LanguagePickerDropdownMenu
            dropdownRef={dropdownRef}
            selectedLanguage={selectedLanguage}
            handleLanguageSelection={handleLanguageSelection}
          />
        )}
      </div>
    </div>
  );
}
