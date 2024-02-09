import en from "@/features/i18n/data/en.json";
import { act, render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { GAP, MIN_DAY_WIDTH } from "./constants/picker-sizes.constant";
import HorizontalDatePicker from "./horizontal-date-picker.component";

const dictionary = en.calendar;

const MOCKED_WIDTH = 700;
const expectedDaysCount = Math.floor(
  (MOCKED_WIDTH + GAP) / (MIN_DAY_WIDTH + GAP),
);
const centerIndex = Math.floor(expectedDaysCount / 2);

describe.only("HorizontalDatePicker", () => {
  beforeAll(() => {
    // Mock the div clientWidth size
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      value: MOCKED_WIDTH,
    });

    vi.stubGlobal("ResizeObserver", function (this: ResizeObserver) {
      this.observe = () => {};
      this.disconnect = () => {};
    });
  });

  it("should render a list of days", () => {
    render(
      <HorizontalDatePicker
        selectedDate={new Date()}
        dictionary={dictionary}
      />,
    );

    screen.getByRole("list", { name: dictionary.daysListAriaLabel });
  });

  it("should render as many days as the container can fit", () => {
    render(
      <HorizontalDatePicker
        selectedDate={new Date()}
        dictionary={dictionary}
      />,
    );

    const days = within(
      screen.getByRole("list", { name: dictionary.daysListAriaLabel }),
    ).getAllByRole("listitem");

    expect(days).to.have.length(expectedDaysCount);
  });

  it("should render the selected day in the center", () => {
    const today = new Date();
    render(
      <HorizontalDatePicker selectedDate={today} dictionary={dictionary} />,
    );

    const daysList = screen.getByRole("list", {
      name: dictionary.daysListAriaLabel,
    });

    expect(Array.from(daysList.children)[centerIndex].textContent).toEqual(
      dictionary.weekdays[today.getDay()] + today.getDate().toString(),
    );
  });

  it("should render the next and previous days", () => {
    const today = new Date();
    render(
      <HorizontalDatePicker selectedDate={today} dictionary={dictionary} />,
    );

    const daysList = screen.getByRole("list", {
      name: dictionary.daysListAriaLabel,
    });

    const expectedFirstDay = new Date();
    expectedFirstDay.setDate(today.getDate() - centerIndex);

    Array.from(daysList.children).forEach((day, index) => {
      const expectedDate = new Date(expectedFirstDay);
      expectedDate.setDate(expectedFirstDay.getDate() + index);

      expect(day.textContent).toEqual(
        dictionary.weekdays[expectedDate.getDay()] +
          expectedDate.getDate().toString(),
      );
    });
  });

  it("should render buttons to navigate to the next and previous days", () => {
    render(
      <HorizontalDatePicker
        selectedDate={new Date()}
        dictionary={dictionary}
      />,
    );

    screen.getByRole("button", { name: ">" });
    screen.getByRole("button", { name: "<" });
  });

  it("should render the next days when clicking the next button", () => {
    const today = new Date();
    render(
      <HorizontalDatePicker selectedDate={today} dictionary={dictionary} />,
    );

    const nextButton = screen.getByRole("button", { name: ">" });
    act(() => nextButton.click());

    const daysList = screen.getByRole("list", {
      name: dictionary.daysListAriaLabel,
    });

    const expectedFirstDay = new Date();
    expectedFirstDay.setDate(today.getDate() - centerIndex + expectedDaysCount);

    const expectedDaysText = Array.from({ length: expectedDaysCount }).map(
      (_, index) => {
        const expectedDate = new Date(expectedFirstDay);
        expectedDate.setDate(expectedFirstDay.getDate() + index);

        return (
          dictionary.weekdays[expectedDate.getDay()] +
          expectedDate.getDate().toString()
        );
      },
    );

    expect(Array.from(daysList.children).map(el => el.textContent)).toEqual(
      expectedDaysText,
    );
  });

  it("should render the previous days when clicking the previous button", () => {
    const today = new Date();
    render(
      <HorizontalDatePicker selectedDate={today} dictionary={dictionary} />,
    );

    const previousButton = screen.getByRole("button", { name: "<" });
    act(() => previousButton.click());

    const daysList = screen.getByRole("list", {
      name: dictionary.daysListAriaLabel,
    });

    const expectedFirstDay = new Date();
    expectedFirstDay.setDate(today.getDate() - centerIndex - expectedDaysCount);

    const expectedDaysText = Array.from({ length: expectedDaysCount }).map(
      (_, index) => {
        const expectedDate = new Date(expectedFirstDay);
        expectedDate.setDate(expectedFirstDay.getDate() + index);

        return (
          dictionary.weekdays[expectedDate.getDay()] +
          expectedDate.getDate().toString()
        );
      },
    );

    expect(Array.from(daysList.children).map(el => el.textContent)).toEqual(
      expectedDaysText,
    );
  });
});
