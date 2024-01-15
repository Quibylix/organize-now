import { db } from "@/db";
import bcrypt from "bcrypt";
import { DatabaseError } from "pg";
import { validatePassword, validateUsername } from "../utils";

export class AuthController {
  static DUPLICATE_KEY_ERROR = "23505";

  static async registerUser(req: Request) {
    console.log(req.url);

    let body;
    try {
      body = await req.json();
    } catch {
      return AuthController.createJsonResponse({
        body: {
          success: false,
          error: "Invalid request body",
        },
        status: 400,
      });
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return AuthController.createJsonResponse({
        body: {
          success: false,
          error: "Invalid request body",
        },
        status: 400,
      });
    }

    const { username, password } = body;

    const { success: usernameSuccess, error: usernameError } =
      validateUsername(username);
    if (!usernameSuccess) {
      return AuthController.createJsonResponse({
        body: {
          success: false,
          error: usernameError,
        },
        status: 400,
      });
    }

    const { success: passwordSuccess, error: passwordError } =
      validatePassword(password);
    if (!passwordSuccess) {
      return AuthController.createJsonResponse({
        body: {
          success: false,
          error: passwordError,
        },
        status: 400,
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await AuthController.hashPassword(password);
    } catch (err) {
      console.log(err);

      return AuthController.createJsonResponse({
        body: {
          success: false,
          error: "Something went wrong",
        },
        status: 500,
      });
    }

    const QUERY = `
    INSERT INTO users (username, hashed_password)
    VALUES ($1, $2)
    RETURNING id, username
    `;

    let result;
    try {
      result = await db.query(QUERY, [username, hashedPassword]);
    } catch (err) {
      if (
        err instanceof DatabaseError &&
        err.code === AuthController.DUPLICATE_KEY_ERROR
      ) {
        return AuthController.createJsonResponse({
          body: {
            success: false,
            error: "Username already taken",
          },
          status: 400,
        });
      }

      console.log(err);
      return AuthController.createJsonResponse({
        body: {
          success: false,
          error: "Something went wrong",
        },
        status: 500,
      });
    }

    console.log(result.rows[0]);

    return AuthController.createJsonResponse({
      body: { success: true },
      status: 200,
    });
  }

  private static async hashPassword(password: string) {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
  }

  private static async createJsonResponse({
    body,
    status,
  }: {
    body: Record<string, unknown>;
    status: number;
  }) {
    return new Response(JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
      status,
    });
  }
}
