import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Icon from "@/features/ui/components/icon/icon.component";
import styles from "./tasks.module.css";

export default async function EmptyTasks() {
  const dictionary = await getTranslation();

  return (
    <div className={styles.emptyTasks}>
      <img
        className={styles.emptyTasksImage}
        src="/images/empty-tasks.webp"
        alt="Empty tasks"
      />
      <h2 className={styles.emptyTasksTitle}>
        {dictionary.tasks.whatDoYouWantToDo}
      </h2>
      <p className={styles.emptyTasksDescription}>
        {dictionary.tasks.tap}{" "}
        <span className={styles.emptyTasksIcon}>
          <Icon name="plus" />
        </span>{" "}
        {dictionary.tasks.toAddYourTasks}
      </p>
    </div>
  );
}
