"use server";

import { validatePassword } from "@/features/auth/utils/validate-password/validate-password.util";
import { validateUsername } from "@/features/auth/utils/validate-username/validate-username.util";
import { sql } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { DatabaseError } from "pg";

type UserData = {
  username: string;
  password: string;
};

const DUPLICATE_KEY_ERROR = "23505";

export async function registerUser(userData: UserData) {
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

  let hashedPassword;
  try {
    hashedPassword = await hashPassword(password);
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Something went wrong",
    };
  }

  let result;
  try {
    result = await sql`
    INSERT INTO users (username, hashed_password)
    VALUES (${username}, ${hashedPassword})
    RETURNING id`;
  } catch (err) {
    if (err instanceof DatabaseError && err.code === DUPLICATE_KEY_ERROR) {
      return {
        success: false,
        error: "Username already taken",
      };
    }

    console.log(err);
    return {
      success: false,
      error: "Something went wrong",
    };
  }

  let authToken;
  try {
    authToken = await generateTokenFromUserId(result.rows[0].id);
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

async function hashPassword(password: string) {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
}

async function generateTokenFromUserId(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
}
