import { Task } from "./task.type";

export type TasksFilters = Partial<
  Pick<Task, "status" | "category" | "priority">
> & {
  timestamp?: {
    min: number;
    max: number;
  };
  search?: string;
};
