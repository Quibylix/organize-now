import { RequestCall } from "@/types/request-call.type";
import { ValidationResponse } from "@/types/validation-response.type";

export type UserInfo = {
  username: string;
  password: string;
};

export function loginUser({
  username,
  password,
}: UserInfo): RequestCall<ValidationResponse> {
  const controller = new AbortController();

  const call = async () => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    });

    let data;
    try {
      data = (await response.json()) as { success: true; error?: string };
    } catch {
      throw new Error("Something went wrong");
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  };

  call.controller = controller;

  return call;
}
