import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Alert from "@/features/ui/components/alert/alert.component";
import EmptyTasks from "./empty-tasks.component";
import { getTasks } from "./services/getTasks.service";
import TaskPreview from "./task-preview.component";
import styles from "./tasks.module.css";
import { TasksFilters } from "./types/tasks-filters.type";

type TasksProps = {
  filters?: TasksFilters;
};

export default async function Tasks({ filters }: TasksProps) {
  const response = await getTasks(filters);
  const dictionary = await getTranslation();

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
          <h2 className={styles.sectionTitle}>
            {dictionary.tasks.uncompletedTasks}
          </h2>
          <ul
            className={styles.tasks}
            aria-label={dictionary.tasks.uncompletedTasks}
          >
            {uncompletedTasks.map(taskDetails => (
              <li key={taskDetails.id}>
                <TaskPreview {...taskDetails} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {hasCompletedTasks && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {dictionary.tasks.completedTasks}
          </h2>
          <ul
            className={styles.tasks}
            aria-label={dictionary.tasks.completedTasks}
          >
            {completedTasks.map(taskDetails => (
              <li key={taskDetails.id}>
                <TaskPreview {...taskDetails} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
