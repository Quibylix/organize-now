export type Task = {
  id: number;
  name: string;
  description: string;
  datetime: Date;
  priority: number;
  category: string;
  status: "uncompleted" | "completed";
};
