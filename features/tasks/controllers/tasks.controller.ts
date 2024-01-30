import db from "@/db/db";
import { DataResponse } from "@/types/data-response.type";
import { validateNonEmptyString } from "@/utils/validate-non-empty-string/validate-non-empty-string.util";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { validatePriority } from "../utils/validate-priority/validate-priority.util";
import { validateTimestamp } from "../utils/validate-timestamp/validate-timestamp.util";

export class TasksController {
  static async createTasks(req: Request) {
    const cookieStore = cookies();

    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.log(err);

      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: "Invalid request body",
        },
        status: 400,
      });
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: "Invalid request body",
        },
        status: 400,
      });
    }

    const { name, timestamp, priority, category } = body;
    let { description } = body;

    const { success: usernameSuccess, error: usernameError } =
      validateNonEmptyString(name, "Name");
    if (!usernameSuccess) {
      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: usernameError,
        },
        status: 400,
      });
    }

    const { success: descriptionSuccess } = validateNonEmptyString(
      description,
      "Description",
    );

    if (!descriptionSuccess) {
      description = null;
    }

    const { success: timestampSuccess, error: timestampError } =
      validateTimestamp(timestamp);

    if (!timestampSuccess) {
      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: timestampError,
        },
        status: 400,
      });
    }

    const { success: prioritySuccess, error: priorityError } =
      validatePriority(priority);

    if (!prioritySuccess) {
      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: priorityError,
        },
        status: 400,
      });
    }

    const { success: categorySuccess, error: categoryError } =
      validateNonEmptyString(category, "Category");

    if (!categorySuccess) {
      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: categoryError,
        },
        status: 400,
      });
    }

    const authToken = cookieStore.get("auth-token")?.value;

    if (authToken === undefined) {
      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: "Unauthorized",
        },
        status: 401,
      });
    }

    const userIdResponse = TasksController.getUserIdFromToken(authToken);

    if (!userIdResponse.success) {
      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: userIdResponse.error,
        },
        status: 401,
      });
    }

    const userId = userIdResponse.data.id;

    const QUERY = `
    INSERT INTO tasks (user_id, name, description, datetime, priority, category, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    try {
      await db.query(QUERY, [
        userId,
        name,
        description,
        new Date(timestamp),
        priority,
        category,
        "uncompleted",
      ]);
    } catch (err) {
      console.log(err);

      return TasksController.createJsonResponse({
        body: {
          success: false,
          error: "Something went wrong",
        },
        status: 500,
      });
    }

    return TasksController.createJsonResponse({
      body: { success: true },
      status: 200,
    });
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

  private static getUserIdFromToken(
    token: string,
  ): DataResponse<{ id: number }> {
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
      };
    } catch (err) {
      return {
        success: false,
        error: "Invalid token",
      };
    }

    return {
      success: true,
      data: {
        id: decodedToken.id,
      },
    };
  }
}
