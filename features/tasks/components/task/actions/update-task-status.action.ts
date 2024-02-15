"use server";

import db from "@/lib/db";
import type { ValidationResponse } from "@/types/validation-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function updateTaskStatus(
  id: number,
  newStatus: "completed" | "uncompleted",
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

  if (typeof id !== "number" || isNaN(id)) {
    return {
      success: false,
      error: "Invalid task id",
    };
  }

  if (newStatus !== "completed" && newStatus !== "uncompleted") {
    return {
      success: false,
      error: "Invalid status",
    };
  }

  const QUERY = `
    UPDATE tasks
    SET status = $1
    WHERE id = $2 AND user_id = $3
    RETURNING id
    `;

  let result;
  try {
    result = await db.query(QUERY, [newStatus, id, userId]);
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
      error: "Task not found",
    };
  }

  return {
    success: true,
  };
}
