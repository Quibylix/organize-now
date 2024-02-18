"use client";

import Button from "@/features/ui/components/button/button.component";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { updateTaskStatus } from "./actions/update-task-status.action";

export type ToggleStatusButtonProps = {
  taskId: number;
  taskStatus: "completed" | "uncompleted";
  dictionary: {
    complete: string;
    reopen: string;
    loading: string;
  };
};

export default function ToggleStatusButton({
  taskId,
  taskStatus,
  dictionary,
}: ToggleStatusButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    const newStatus = taskStatus === "completed" ? "uncompleted" : "completed";
    const response = await updateTaskStatus(taskId, newStatus);
    setIsLoading(false);

    if (!response.success) {
      alert(response.error ?? "Something went wrong");
    }

    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="text"
      size="sm"
      color="secondary"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading && dictionary.loading}
      {!isLoading &&
        (taskStatus === "completed" ? dictionary.reopen : dictionary.complete)}
    </Button>
  );
}
