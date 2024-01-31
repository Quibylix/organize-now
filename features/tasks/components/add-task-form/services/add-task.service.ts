import { RequestCall } from "@/types/request-call.type";
import { ValidationResponse } from "@/types/validation-response.type";

export type TaskInfo = {
  name: string;
  description: string;
  datetime: Date;
  priority: number;
  category: string;
};

export function addTask(taskInfo: TaskInfo): RequestCall<ValidationResponse> {
  const controller = new AbortController();

  const call = async () => {
    const body = {
      ...taskInfo,
      timestamp: taskInfo.datetime.getTime(),
    };

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
