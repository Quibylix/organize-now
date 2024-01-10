import { MOCKED_TASKS } from "./__mocks__";
import styles from "./tasks.module.css";

export default function Tasks() {
  return (
    <ul className={styles.tasks}>
      {MOCKED_TASKS.map(({ id, name, category, priority, date, status }) => (
        <li key={id}>
          <article className={styles.task}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={status === "completed"}
              readOnly
            />
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.date}>{date.toLocaleString()}</p>
            <p className={styles.category}>{category}</p>
            <p className={styles.priority}>{priority}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
