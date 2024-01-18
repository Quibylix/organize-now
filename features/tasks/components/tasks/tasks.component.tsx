import { getTasks } from "./services/getTasks.service";
import styles from "./tasks.module.css";

export default async function Tasks() {
  const response = await getTasks();

  if (!response.success) {
    return <p>{response.error}</p>;
  }

  const { data: tasks } = response;

  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <ul className={styles.tasks}>
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