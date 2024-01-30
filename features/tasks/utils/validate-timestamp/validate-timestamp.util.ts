import { ValidationResponse } from "@/types/validation-response.type";

export function validateTimestamp(timestamp: unknown): ValidationResponse {
  if (typeof timestamp !== "number") {
    return {
      success: false,
      error: "Timestamp must be a number",
    };
  }

  if (isNaN(timestamp)) {
    return {
      success: false,
      error: "Timestamp must be a valid number",
    };
  }

  if (timestamp < 0) {
    return {
      success: false,
      error: "Timestamp must be a positive number",
    };
  }

  if (timestamp % 1 !== 0) {
    return {
      success: false,
      error: "Timestamp must be an integer",
    };
  }

  return {
    success: true,
  };
}
