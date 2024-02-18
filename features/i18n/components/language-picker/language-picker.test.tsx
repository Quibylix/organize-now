import { DEFAULT_LANGUAGE } from "@/features/i18n/constants/language.constant";
import en from "@/features/i18n/data/en.json";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import LanguagePicker from "./language-picker.component";

describe("LanguagePicker", () => {
  const dictionary = en.changeLanguage;
  const defaultLanguage = DEFAULT_LANGUAGE;

  beforeAll(() => {
    vi.mock("next-nprogress-bar", () => ({
      useRouter: () => ({
        refresh: () => {},
      }),
    }));
  });

  it("should render the component correctly", () => {
    render(
      <LanguagePicker
        dictionary={dictionary}
        defaultLanguage={defaultLanguage}
      />,
    );

    screen.getByText(dictionary.selectLanguage);
    screen.getByText("English");
  });

  it("should toggle the language picker dropdown when the button is clicked", () => {
    render(
      <LanguagePicker
        dictionary={dictionary}
        defaultLanguage={defaultLanguage}
      />,
    );

    const button = screen.getByRole("button");

    expect(() => screen.getByRole("listbox")).toThrow();

    act(() => fireEvent.click(button));

    screen.getByRole("listbox");

    act(() => fireEvent.click(button));

    expect(() => screen.getByRole("listbox")).toThrow();
  });

  it("should close the language picker dropdown by clicking outside of it", () => {
    render(
      <>
        <LanguagePicker
          dictionary={dictionary}
          defaultLanguage={defaultLanguage}
        />
        <div>Outside</div>
      </>,
    );

    const button = screen.getByRole("button");
    act(() => fireEvent.click(button));

    const listbox = screen.getByRole("listbox");

    act(() => fireEvent.click(screen.getByText("Outside")));
    expect(() => screen.getByRole("listbox")).toThrow();
  });
});
