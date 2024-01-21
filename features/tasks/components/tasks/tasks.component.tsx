import Alert from "@/features/ui/components/alert/alert.component";
import EmptyTasks from "./empty-tasks.component";
import { getTasks } from "./services/getTasks.service";
import Task from "./task.component";
import styles from "./tasks.module.css";
import { TasksFilters } from "./types/tasks-filters.type";

type TasksProps = {
  filters?: TasksFilters;
};

export default async function Tasks({ filters }: TasksProps) {
  const response = await getTasks(filters);

  if (!response.success) {
    return <Alert message={response.error} />;
  }

  const { data: tasks } = response;

  if (tasks.length === 0) {
    return <EmptyTasks />;
  }

  return (
    <ul className={styles.tasks} aria-label="Tasks list">
      {tasks.map(({ id, ...taskDetails }) => (
        <li key={id}>
          <Task {...taskDetails} />
        </li>
      ))}
    </ul>
  );
}
