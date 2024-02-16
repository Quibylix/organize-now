import { sql } from "@/lib/db";
import type { DataResponse } from "@/types/data-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserDetails(): Promise<
  DataResponse<{
    id: number;
    accountName: string;
    profileImageUrl: string | null;
    tasksLeft: number;
    tasksCompleted: number;
  }>
> {
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

  let result;
  try {
    result = await sql`
      SELECT account_name, profile_image_url, (
        SELECT COUNT(*)
        FROM tasks
        WHERE user_id = ${id} AND status = 'uncompleted'
      ) AS tasks_left, (
        SELECT COUNT(*)
        FROM tasks
        WHERE user_id = ${id} AND status = 'completed'
      ) AS tasks_completed
      FROM users
      WHERE id = ${id}
    `;
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
      error: "User not found",
    };
  }

  const { account_name, profile_image_url, tasks_left, tasks_completed } =
    result.rows[0] as {
      account_name: string;
      profile_image_url: string | null;
      tasks_left: number;
      tasks_completed: number;
    };

  return {
    success: true,
    data: {
      id,
      accountName: account_name,
      profileImageUrl: profile_image_url,
      tasksLeft: tasks_left,
      tasksCompleted: tasks_completed,
    },
  };
}
