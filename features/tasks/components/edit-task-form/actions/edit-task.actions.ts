"use server";

import { datetimeLocalValueToDate } from "@/features/tasks/utils/datetime-local-value-to-date/datetime-local-value-to-date.util";
import { validatePriority } from "@/features/tasks/utils/validate-priority/validate-priority.util";
import { sql } from "@/lib/db";
import type { ValidationResponse } from "@/types/validation-response.type";
import { validateNonEmptyString } from "@/utils/validate-non-empty-string/validate-non-empty-string.util";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { validateDatetime } from "../../../utils/validate-datetime/validate-datetime.util";

export type TaskInfo = {
  name: string;
  description: string;
  datetime: string;
  priority: number;
  category: string;
};

export async function editTask(
  taskId: number,
  taskInfo: TaskInfo,
): Promise<ValidationResponse> {
  const cookieStore = cookies();

  const authTokenCookie = cookieStore.get("auth-token");

  if (!authTokenCookie) {
    return {
      success: false,
      error: "Not logged in",
    };
  }

  const authToken = authTokenCookie.value;

  let decodedToken;
  try {
    decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!) as {
      id: number;
    };
  } catch (err) {
    return {
      success: false,
      error: "Invalid token",
    };
  }

  const { id: userId } = decodedToken;

  const { name, datetime, priority, category } = taskInfo;
  let description: string | null = taskInfo.description;

  const { success: usernameSuccess, error: usernameError } =
    validateNonEmptyString(name, "Name");
  if (!usernameSuccess) {
    return {
      success: false,
      error: usernameError,
    };
  }

  const { success: descriptionSuccess } = validateNonEmptyString(
    description,
    "Description",
  );

  if (!descriptionSuccess) {
    description = null;
  }

  const { success: datetimeSuccess, error: datetimeError } =
    validateDatetime(datetime);

  if (!datetimeSuccess) {
    return {
      success: false,
      error: datetimeError,
    };
  }

  const { success: prioritySuccess, error: priorityError } =
    validatePriority(priority);

  if (!prioritySuccess) {
    return {
      success: false,
      error: priorityError,
    };
  }

  const { success: categorySuccess, error: categoryError } =
    validateNonEmptyString(category, "Category");

  if (!categorySuccess) {
    return { success: false, error: categoryError };
  }

  let result;
  try {
    result = await sql`
    UPDATE tasks
    SET
      name = ${name},
      description = ${description},
      datetime = ${datetimeLocalValueToDate(datetime)},
      priority = ${priority},
      category = ${category}
    WHERE id = ${taskId} AND user_id = ${userId}
    RETURNING id`;
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Something went wrong",
    };
  }

  if (result.rows.length === 0) {
    return {
      success: false,
      error: "Unauthorized or task not found",
    };
  }

  return {
    success: true,
  };
}
