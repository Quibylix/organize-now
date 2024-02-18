import { describe, expect, it } from "vitest";
import { validatePriority } from "./validate-priority.util";

describe("validatePriority", () => {
  it("should return success when priority is a valid number", () => {
    const priority = 5;
    const result = validatePriority(priority);
    expect(result.success).toBe(true);
  });

  it("should return error when priority is not a number", () => {
    const priority = "invalid";
    const result = validatePriority(priority);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Priority must be a number");
  });

  it("should return error when priority is less than 1", () => {
    const priority = 0;
    const result = validatePriority(priority);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Priority must be between 1 and 10");
  });

  it("should return error when priority is greater than 10", () => {
    const priority = 11;
    const result = validatePriority(priority);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Priority must be between 1 and 10");
  });
});
