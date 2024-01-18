import Alert from "@/features/ui/components/alert/alert.component";
import EmptyTasks from "./empty-tasks.component";
import { getTasks } from "./services/getTasks.service";
import styles from "./tasks.module.css";

export default async function Tasks() {
  const response = await getTasks();

  if (!response.success) {
    return <Alert message={response.error} />;
  }

  const { data: tasks } = response;

  if (tasks.length === 0) {
    return <EmptyTasks />;
  }

  return (
    <ul className={styles.tasks} aria-label="Tasks list">
      {tasks.map(({ id, name, category, priority, datetime, status }) => (
        <li key={id}>
          <article className={styles.task}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={status === "completed"}
              readOnly
            />
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.date}>{new Date(datetime).toLocaleString()}</p>
            <p className={styles.category}>{category}</p>
            <p className={styles.priority}>{priority}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
