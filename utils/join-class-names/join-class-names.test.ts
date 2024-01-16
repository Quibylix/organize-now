import { describe, expect, it } from "vitest";
import { joinClassNames } from "./join-class-names.util";

describe("joinClassNames", () => {
  it("should join class names", () => {
    expect(joinClassNames("foo", "bar")).toBe("foo bar");
  });

  it("should join class names with object", () => {
    expect(joinClassNames("foo", { bar: true })).toBe("foo bar");
  });

  it("should not join class names with object with false value", () => {
    expect(joinClassNames("foo", { bar: false })).toBe("foo");
  });

  it("should not join class names with an undefined value", () => {
    expect(joinClassNames("foo", undefined)).toBe("foo");
  });

  it("should not join class names with object with undefined value", () => {
    expect(joinClassNames("foo", { bar: undefined })).toBe("foo");
  });

  it("should join class names with multiple objects", () => {
    expect(joinClassNames("foo", { bar: true }, { baz: true })).toBe(
      "foo bar baz",
    );
  });

  it("should join class names with multiple objects with false value", () => {
    expect(joinClassNames("foo", { bar: true }, { baz: false })).toBe(
      "foo bar",
    );
  });

  it("should join class names with an object with multiple keys", () => {
    expect(joinClassNames("foo", { bar: true, baz: true })).toBe("foo bar baz");
  });

  it("should join class names with an object with multiple keys with false value", () => {
    expect(joinClassNames("foo", { bar: true, baz: false })).toBe("foo bar");
  });

  it("should join class name with only object", () => {
    expect(joinClassNames({ foo: true, bar: true, baz: false })).toBe(
      "foo bar",
    );
  });
});
