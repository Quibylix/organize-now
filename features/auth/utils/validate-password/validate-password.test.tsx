import { describe, expect, it } from "vitest";
import { validatePassword } from ".";

describe("validatePassword", () => {
  it("should return an object with an error message if the password does not have the required length", () => {
    expect(validatePassword("")).toEqual({
      success: false,
      error: "Password must be between 8 and 50 characters",
    });
  });

  it("should return an object with an error message if the password does not have uppercase letters", () => {
    expect(validatePassword("testpassword")).toEqual({
      success: false,
      error: "Password must contain at least one uppercase letter",
    });
  });

  it("should return an object with an error message if the password does not have lowercase letters", () => {
    expect(validatePassword("TESTPASSWORD")).toEqual({
      success: false,
      error: "Password must contain at least one lowercase letter",
    });
  });

  it("should return an object with an error message if the password does not have numbers", () => {
    expect(validatePassword("TestPassword")).toEqual({
      success: false,
      error: "Password must contain at least one number",
    });
  });
});
