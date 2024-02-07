import db from "@/db/db";
import { DataResponse } from "@/types/data-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Task } from "../types/task.type";
import { TasksFilters } from "../types/tasks-filters.type";

export async function getTasks(
  filters?: TasksFilters,
): Promise<DataResponse<Task[]>> {
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

  let query = `
  SELECT id, name, description, datetime, priority, category, status
  FROM tasks
  WHERE user_id = $1
    `;

  let parameterIndex = 2;
  const parameters: (number | TasksFilters[keyof TasksFilters])[] = [id];

  if (filters?.category) {
    query += `AND LOWER(category) = LOWER($${parameterIndex++}) `;
    parameters.push(filters.category);
  }

  if (filters?.priority) {
    query += `AND priority = $${parameterIndex++} `;
    parameters.push(filters.priority);
  }

  if (filters?.status) {
    query += `AND LOWER(status) = LOWER($${parameterIndex++}) `;
    parameters.push(filters.status);
  }

  if (filters?.timestamp) {
    const { max, min } = filters.timestamp;

    query += `AND datetime >= TO_TIMESTAMP($${parameterIndex++}) AND datetime <= TO_TIMESTAMP($${parameterIndex++}) `;
    parameters.push(min / 1000);
    parameters.push(max / 1000);
  }

  if (filters?.search) {
    query += `AND LOWER(name) LIKE LOWER($${parameterIndex++}) `;
    parameters.push(`%${filters.search}%`);
  }

  let result;
  try {
    result = await db.query(query, parameters);
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
