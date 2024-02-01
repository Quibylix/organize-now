import { describe, expect, it } from "vitest";
import { validateDatetime } from "./validate-datetime.util";

describe("validateDatetime", () => {
  it("should return success for valid datetime", () => {
    const value = `${new Date().getFullYear() + 1}-12-31T23:59`;
    const expectedResponse = {
      success: true,
    };

    const result = validateDatetime(value);

    expect(result).toEqual(expectedResponse);
  });

  it("should return error for non-string datetime", () => {
    const value = 123; // Non-string value
    const expectedResponse = {
      success: false,
      error: "Datetime must be a string",
    };

    const result = validateDatetime(value);

    expect(result).toEqual(expectedResponse);
  });

  it("should return error for invalid datetime format", () => {
    const value = "2022-12-31T23:59:00"; // Invalid format
    const expectedResponse = {
      success: false,
      error: "Invalid datetime",
    };

    const result = validateDatetime(value);

    expect(result).toEqual(expectedResponse);
  });

  it("should return error for past datetime", () => {
    const value = "2020-01-01T00:00"; // Past datetime
    const expectedResponse = {
      success: false,
      error: "Datetime must be in the future",
    };

    const result = validateDatetime(value);

    expect(result).toEqual(expectedResponse);
  });
});
