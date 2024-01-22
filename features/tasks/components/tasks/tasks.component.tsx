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

  const completedTasks = tasks.filter(task => task.status === "completed");
  const uncompletedTasks = tasks.filter(task => task.status === "uncompleted");

  const hasCompletedTasks = Boolean(completedTasks.length);
  const hasUncompletedTasks = Boolean(uncompletedTasks.length);

  return (
    <div>
      {hasUncompletedTasks && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Uncompleted Tasks</h2>
          <ul className={styles.tasks} aria-label="Uncompleted tasks">
            {uncompletedTasks.map(({ id, ...taskDetails }) => (
              <li key={id}>
                <Task {...taskDetails} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {hasCompletedTasks && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Completed Tasks</h2>
          <ul className={styles.tasks} aria-label="Completed tasks">
            {completedTasks.map(({ id, ...taskDetails }) => (
              <li key={id}>
                <Task {...taskDetails} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
