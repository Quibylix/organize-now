import { ValidationResponse } from "@/types/validation-response.type";
import { datetimeLocalValueToDate } from "../datetime-local-value-to-date/datetime-local-value-to-date.util";

export function validateDatetime(value: unknown): ValidationResponse {
  if (typeof value !== "string") {
    return {
      success: false,
      error: "Datetime must be a string",
    };
  }

  let date;
  try {
    date = datetimeLocalValueToDate(value);
  } catch {
    return {
      success: false,
      error: "Invalid datetime",
    };
  }

  if (isNaN(date.getTime())) {
    return {
      success: false,
      error: "Invalid datetime",
    };
  }

  if (date.getTime() < Date.now()) {
    return {
      success: false,
      error: "Datetime must be in the future",
    };
  }

  return {
    success: true,
  };
}
