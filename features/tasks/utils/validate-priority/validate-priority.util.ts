import { ValidationResponse } from "@/types/validation-response.type";

export function validatePriority(priority: unknown): ValidationResponse {
  if (typeof priority !== "number") {
    return {
      success: false,
      error: "Priority must be a number",
    };
  }

  if (priority < 1 || priority > 10) {
    return {
      success: false,
      error: "Priority must be between 1 and 10",
    };
  }

  return {
    success: true,
  };
}
