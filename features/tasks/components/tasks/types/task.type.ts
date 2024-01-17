export type Task = {
  id: number;
  name: string;
  description: string;
  datetime: string;
  priority: number;
  category: string;
  status: "uncompleted" | "completed";
};
