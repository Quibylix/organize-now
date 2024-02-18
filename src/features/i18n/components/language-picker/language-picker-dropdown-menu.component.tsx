import type { AvailableLanguage } from "@/features/i18n/types/language.type";
import { LANGUAGES_INFO } from "./constants/languages-info.constant";
import styles from "./language-picker.module.css";

export type LanguagePickerDropdownMenuProps = {
  selectedLanguage: string;
  handleLanguageSelection: (language: AvailableLanguage) => void;
  dropdownRef: React.RefObject<HTMLUListElement>;
};

export default function LanguagePickerDropdownMenu({
  selectedLanguage,
  handleLanguageSelection,
  dropdownRef,
}: LanguagePickerDropdownMenuProps) {
  return (
    <ul ref={dropdownRef} className={styles.dropdownMenu} role="listbox">
      {LANGUAGES_INFO.map(({ abbr, name, flag }) => (
        <li key={abbr} role="option" aria-selected={abbr === selectedLanguage}>
          <button
            className={styles.option}
            onClick={() => handleLanguageSelection(abbr)}
          >
            <span role="img" aria-label={name}>
              {flag}
            </span>
            <span>{name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
