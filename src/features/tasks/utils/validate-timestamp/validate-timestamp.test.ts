import { describe, expect, it } from "vitest";
import { validateTimestamp } from "./validate-timestamp.util";

describe("validateTimestamp", () => {
  it("should return success when timestamp is a valid number", () => {
    const result = validateTimestamp(1234567890);
    expect(result.success).toBe(true);
  });

  it("should return error when timestamp is not a number", () => {
    const result = validateTimestamp("1234567890");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Timestamp must be a number");
  });

  it("should return error when timestamp is NaN", () => {
    const result = validateTimestamp(NaN);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Timestamp must be a valid number");
  });

  it("should return error when timestamp is negative", () => {
    const result = validateTimestamp(-1234567890);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Timestamp must be a positive number");
  });

  it("should return error when timestamp is not an integer", () => {
    const result = validateTimestamp(123.45);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Timestamp must be an integer");
  });
});
