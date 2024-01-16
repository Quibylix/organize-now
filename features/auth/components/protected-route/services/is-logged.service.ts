import { ValidationResponse } from "@/types/validation-response.type";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function isLogged(): Promise<ValidationResponse> {
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
    decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!);
  } catch (err) {
    return {
      success: false,
      error: "Invalid token",
    };
  }

  return {
    success: true,
  };
}
