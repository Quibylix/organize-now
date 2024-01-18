import Icon from "@/features/ui/components/icon/icon.component";
import styles from "./tasks.module.css";

export default function EmptyTasks() {
  return (
    <div className={styles.emptyTasks}>
      <img
        className={styles.emptyTasksImage}
        src="/images/empty-tasks.webp"
        alt="Empty tasks"
      />
      <h2 className={styles.emptyTasksTitle}>What do you want to do today?</h2>
      <p className={styles.emptyTasksDescription}>
        Tap{" "}
        <span className={styles.emptyTasksIcon}>
          <Icon name="plus" />
        </span>{" "}
        to add your tasks
      </p>
    </div>
  );
}
