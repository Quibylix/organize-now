"use server";

import { sql } from "@/lib/db";
import type { ValidationResponse } from "@/types/validation-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const API_URL = "https://api.imgbb.com/1/upload";

export async function changeAccountImage(
  base64String: string,
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

  const formData = new FormData();
  formData.append("image", base64String);

  let response;
  try {
    response = await fetch(`${API_URL}?key=${process.env.IMAGEBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Failed to upload image",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      error: "Failed to upload image",
    };
  }

  let data;
  try {
    data = await response.json();
  } catch {
    return {
      success: false,
      error: "Failed to upload image",
    };
  }

  const adapted = adapt(data);

  if (!adapted) {
    return {
      success: false,
      error: "Failed to upload image",
    };
  }

  try {
    sql`
    UPDATE users
    SET profile_image_url = ${adapted.url}
    WHERE id = ${userId}
  `;
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error: "Something went wrong",
    };
  }

  return {
    success: true,
  };
}

function adapt(json: unknown) {
  if (typeof json !== "object" || json === null) {
    return null;
  }

  if (
    !("data" in json) ||
    typeof json.data !== "object" ||
    json.data === null
  ) {
    return null;
  }

  if ("url" in json.data && typeof json.data.url === "string") {
    return { url: json.data.url };
  }

  return null;
}
