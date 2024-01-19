import { Task } from "./task.type";

export type TasksFilters = Partial<
  Pick<Task, "status" | "category" | "priority">
> & {
  search?: string;
};
