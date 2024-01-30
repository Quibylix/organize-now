import { describe, expect, it } from "vitest";
import { validateNonEmptyString } from "./validate-non-empty-string.util";

describe("validateNonEmptyString", () => {
  it("should return success when value is a non-empty string", () => {
    const value = "Hello, World!";
    const result = validateNonEmptyString(value, "value");
    expect(result.success).toBe(true);
  });

  it("should return error when value is not a string", () => {
    const value = 123;
    const result = validateNonEmptyString(value, "value");
    expect(result.success).toBe(false);
    expect(result.error).toBe("value must be a string");
  });

  it("should return error when value is an empty string", () => {
    const value = "";
    const result = validateNonEmptyString(value, "value");
    expect(result.success).toBe(false);
    expect(result.error).toBe("value must not be empty");
  });

  it("should return error when value is a string with only whitespace", () => {
    const value = "   ";
    const result = validateNonEmptyString(value, "value");
    expect(result.success).toBe(false);
    expect(result.error).toBe("value must not be empty");
  });
});
