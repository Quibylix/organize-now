import Link from "next/link";
import styles from "./tasks.module.css";
import { Task as TaskType } from "./types/task.type";

export type TaskProps = TaskType;

export default function Task({
  id,
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
      <h3 className={styles.name}>
        <Link className={styles.link} href={`/task/${id}`}>
          {name}
        </Link>
      </h3>
      <p className={styles.date}>{new Date(datetime).toLocaleString()}</p>
      <p className={styles.category}>{category}</p>
      <p className={styles.priority}>{priority}</p>
    </article>
  );
}
