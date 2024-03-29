"use server";

import { sql } from "@/lib/db";
import type { ValidationResponse } from "@/types/validation-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function deleteTask(id: number): Promise<ValidationResponse> {
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

  let result;
  try {
    result = await sql`
    DELETE FROM tasks
    WHERE id = ${id} AND user_id = ${userId}
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
