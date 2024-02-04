"use server";

import db from "@/db/db";
import { validatePriority } from "@/features/tasks/utils/validate-priority/validate-priority.util";
import type { DataResponse } from "@/types/data-response.type";
import type { ValidationResponse } from "@/types/validation-response.type";
import { validateNonEmptyString } from "@/utils/validate-non-empty-string/validate-non-empty-string.util";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { datetimeLocalValueToDate } from "../utils/datetime-local-value-to-date/datetime-local-value-to-date.util";
import { validateDatetime } from "../utils/validate-datetime/validate-datetime.util";

export type TaskInfo = {
  name: string;
  description: string;
  datetime: string;
  priority: number;
  category: string;
};

export async function addTask(taskInfo: TaskInfo): Promise<ValidationResponse> {
  const cookieStore = cookies();

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

  const authToken = cookieStore.get("auth-token")?.value;

  if (authToken === undefined) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const userIdResponse = getUserIdFromToken(authToken);

  if (!userIdResponse.success) {
    return {
      success: false,
      error: userIdResponse.error,
    };
  }

  const userId = userIdResponse.data.id;

  const QUERY = `
    INSERT INTO tasks (user_id, name, description, datetime, priority, category, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

  try {
    await db.query(QUERY, [
      userId,
      name,
      description,
      datetimeLocalValueToDate(datetime),
      priority,
      category,
      "uncompleted",
    ]);
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Something went wrong",
    };
  }

  return { success: true };
}

function getUserIdFromToken(token: string): DataResponse<{ id: number }> {
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
  } catch (err) {
    return {
      success: false,
      error: "Invalid token",
    };
  }

  return {
    success: true,
    data: {
      id: decodedToken.id,
    },
  };
}
