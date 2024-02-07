import db from "@/db/db";
import type { DataResponse } from "@/types/data-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { Task } from "../components/tasks/types/task.type";

export async function getTaskDetails(
  id: number,
): Promise<DataResponse<Omit<Task, "id">>> {
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

  const QUERY = `
    SELECT *
    FROM tasks
    WHERE id = $1 AND user_id = $2
    `;

  let result;
  try {
    result = await db.query(QUERY, [id, userId]);
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

  const { name, description, datetime, priority, category, status } = result
    .rows[0] as Task;

  return {
    success: true,
    data: {
      name,
      description,
      datetime,
      priority,
      category,
      status,
    },
  };
}
