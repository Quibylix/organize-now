import styles from "./tasks.module.css";
import { Task } from "./types/task.type";

export type TaskProps = Omit<Task, "id">;

export default function Task({
  name,
  category,
  priority,
  datetime,
  status,
}: TaskProps) {
  return (
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
  );
}
