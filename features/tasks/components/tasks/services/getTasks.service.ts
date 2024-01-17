import db from "@/db/db";
import { DataResponse } from "@/types/data-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Task } from "../types/task.type";

export async function getTasks(): Promise<DataResponse<Task[]>> {
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

  const { id } = decodedToken;

  const QUERY = `
  SELECT id, name, description, datetime, priority, category, status
  FROM tasks
  WHERE user_id = $1
    `;

  let result;
  try {
    result = await db.query(QUERY, [id]);
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Failed to get tasks",
    };
  }

  const tasks = result.rows.map(task => ({
    id: task.id,
    name: task.name,
    description: task.description,
    datetime: task.datetime,
    priority: task.priority,
    category: task.category,
    status: task.status,
  })) as Task[];

  return {
    success: true,
    data: tasks,
  };
}
