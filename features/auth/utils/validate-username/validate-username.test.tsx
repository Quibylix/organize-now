import { describe, expect, it } from "vitest";
import { validateUsername } from "./validate-username.util";

describe("validateUsername", () => {
  it("should return an object with an error message if the username does not have the required length", () => {
    expect(validateUsername("")).toEqual({
      success: false,
      error: "Username must be between 3 and 20 characters",
    });
  });

  it("should return an object with an error message if the username contains invalid characters", () => {
    expect(validateUsername("ad!")).toEqual({
      success: false,
      error: "Username must only contain letters, numbers, and underscores",
    });

    expect(validateUsername("a b")).toEqual({
      success: false,
      error: "Username must only contain letters, numbers, and underscores",
    });
  });

  it("should return an object with success true if the username is valid", () => {
    expect(validateUsername("abc")).toEqual({
      success: true,
    });
  });
});
