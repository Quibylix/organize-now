"use server";

import { validatePassword } from "@/features/auth/utils/validate-password/validate-password.util";
import { sql } from "@/lib/db";
import type { ValidationResponse } from "@/types/validation-response.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function changePassword(
  currentPassword: string,
  newPassword: string,
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

  const { error: currentPasswordError } = validatePassword(currentPassword);

  if (currentPasswordError) {
    return {
      success: false,
      error: currentPasswordError,
    };
  }

  const { error: newPasswordError } = validatePassword(newPassword);

  if (newPasswordError) {
    return {
      success: false,
      error: newPasswordError,
    };
  }

  let currentHashedPassword;
  try {
    const result = await sql`
    SELECT hashed_password
    FROM users
    WHERE id = ${userId}`;
    currentHashedPassword = result.rows[0].hashed_password;
  } catch (err) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }

  const passwordsMatch = await bcrypt.compare(
    currentPassword,
    currentHashedPassword,
  );

  if (!passwordsMatch) {
    return {
      success: false,
      error: "Current password is incorrect",
    };
  }

  const saltRounds = 10;
  const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

  let result;
  try {
    result = await sql`
    UPDATE users
    SET hashed_password = ${newHashedPassword}
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
