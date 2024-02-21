"use server";

import { sql } from "@/lib/db";
import type { ValidationResponse } from "@/types/validation-response.type";
import { validateNonEmptyString } from "@/utils/validate-non-empty-string/validate-non-empty-string.util";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function changeAccountName(
  newName: string,
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

  const { error } = validateNonEmptyString(newName, "Account name");

  if (error) {
    return {
      success: false,
      error,
    };
  }

  try {
    await sql`
    UPDATE users
    SET account_name = ${newName.trim()}
    WHERE id = ${userId}`;
  } catch (err) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }

  return {
    success: true,
  };
}
