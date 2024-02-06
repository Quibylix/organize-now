import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Alert from "@/features/ui/components/alert/alert.component";
import ButtonAsLink from "@/features/ui/components/button/button-as-link.component";
import Icon from "@/features/ui/components/icon/icon.component";
import { getTaskDetails } from "./actions/get-task-details.action";
import DeleteTaskButton from "./delete-task-button.component";
import styles from "./task.module.css";
import ToggleStatusButton from "./toggle-status-button.component";

type TaskProps = {
  id: number;
};

export default async function Task({ id }: TaskProps) {
  const response = await getTaskDetails(id);
  const dictionary = await getTranslation();

  if (!response.success) {
    return <Alert message={response.error} />;
  }

  const { data: task } = response;

  return (
    <article>
      <header className={styles.header}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={task.status === "completed"}
          name="status"
          readOnly
        />
        <h1 className={styles.name}>{task.name}</h1>
        <p className={styles.description}>{task.description}</p>
        <ToggleStatusButton
          taskId={id}
          taskStatus={task.status}
          dictionary={dictionary.task.toggleStatus}
        />
      </header>
      <p className={styles.detail}>
        <span className={styles.detailIcon}>
          <Icon name="clock" />
        </span>
        <span>{dictionary.task.taskTime}:</span>
        <span>{task.datetime.toLocaleString()}</span>
      </p>
      <p className={styles.detail}>
        <span className={styles.detailIcon}>
          <Icon name="tag" />
        </span>
        <span>{dictionary.task.taskCategory}:</span>
        <span>{task.category}</span>
      </p>
      <p className={styles.detail}>
        <span className={styles.detailIcon}>
          <Icon name="flag" />
        </span>
        <span>{dictionary.task.taskPriority}</span>
        <span>{task.priority}</span>
      </p>
      <DeleteTaskButton
        dictionary={dictionary.task.delete}
        taskId={id}
        taskName={task.name}
      />
      <ButtonAsLink width="full" href={`/task/edit/${id}`}>
        {dictionary.task.editTask}
      </ButtonAsLink>
    </article>
  );
}
