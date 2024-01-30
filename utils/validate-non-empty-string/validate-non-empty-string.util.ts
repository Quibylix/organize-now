import { ValidationResponse } from "@/types/validation-response.type";

export function validateNonEmptyString(
  value: unknown,
  valueName: string,
): ValidationResponse {
  if (typeof value !== "string") {
    return {
      success: false,
      error: `${valueName} must be a string`,
    };
  }

  if (value.trim() === "") {
    return {
      success: false,
      error: `${valueName} must not be empty`,
    };
  }

  return {
    success: true,
  };
}
