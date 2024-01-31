import { describe, expect, it } from "vitest";
import { datetimeLocalValueToDate } from "./datetime-local-value-to-date.util";

describe("datetimeLocalValueToDate", () => {
  it("should convert valid datetime-local value to Date object", () => {
    const value = "2022-12-31T23:59";
    const expectedDate = new Date(2022, 11, 31, 23, 59);

    const result = datetimeLocalValueToDate(value);

    expect(result).toEqual(expectedDate);
  });

  it("should throw an error for invalid datetime-local value", () => {
    const value = "2022-12-31T23:59:00"; // Invalid format

    expect(() => datetimeLocalValueToDate(value)).toThrowError(
      "Invalid datetime-local value",
    );

    const value2 = "2022-12-31T23:59:00.000Z"; // Invalid format
    expect(() => datetimeLocalValueToDate(value2)).toThrowError(
      "Invalid datetime-local value",
    );
  });
});
