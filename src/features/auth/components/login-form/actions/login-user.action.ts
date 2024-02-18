"use server";

import { validatePassword } from "@/features/auth/utils/validate-password/validate-password.util";
import { validateUsername } from "@/features/auth/utils/validate-username/validate-username.util";
import { sql } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type UserData = {
  username: string;
  password: string;
};

export async function loginUser(userData: UserData) {
  const cookieStore = cookies();

  const { username, password } = userData;

  const { success: usernameSuccess, error: usernameError } =
    validateUsername(username);
  if (!usernameSuccess) {
    return {
      success: false,
      error: usernameError,
    };
  }

  const { success: passwordSuccess, error: passwordError } =
    validatePassword(password);
  if (!passwordSuccess) {
    return {
      success: false,
      error: passwordError,
    };
  }

  let result;
  try {
    result = await sql`
    SELECT id, hashed_password
    FROM users
    WHERE username = ${username}`;
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
      error: "Invalid username or password",
    };
  }

  const { id, hashed_password: hashedPassword } = result.rows[0] as {
    id: number;
    hashed_password: string;
  };

  let passwordsMatch;
  try {
    passwordsMatch = await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Something went wrong",
    };
  }

  if (!passwordsMatch) {
    return {
      success: false,
      error: "Invalid username or password",
    };
  }

  let authToken;
  try {
    authToken = await generateTokenFromUserId(id);
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Something went wrong",
    };
  }

  cookieStore.set("auth-token", authToken);

  return { success: true };
}

async function generateTokenFromUserId(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
}
