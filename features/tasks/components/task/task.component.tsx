import Alert from "@/features/ui/components/alert/alert.component";
import ButtonAsLink from "@/features/ui/components/button/button-as-link.component";
import Button from "@/features/ui/components/button/button.component";
import Icon from "@/features/ui/components/icon/icon.component";
import { getTaskDetails } from "./actions/get-task-details.action";
import styles from "./task.module.css";

type TaskProps = {
  id: number;
};

export default async function Task({ id }: TaskProps) {
  const response = await getTaskDetails(id);

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
        <Button type="button" variant="text" size="sm" color="secondary">
          {task.status === "completed" ? "Reopen" : "Complete"}
        </Button>
      </header>
      <p className={styles.detail}>
        <span className={styles.detailIcon}>
          <Icon name="clock" />
        </span>
        <span>Task Time:</span>
        <span>{task.datetime.toLocaleString()}</span>
      </p>
      <p className={styles.detail}>
        <span className={styles.detailIcon}>
          <Icon name="tag" />
        </span>
        <span>Task Category:</span>
        <span>{task.category}</span>
      </p>
      <p className={styles.detail}>
        <span className={styles.detailIcon}>
          <Icon name="flag" />
        </span>
        <span>Task Priority:</span>
        <span>{task.priority}</span>
      </p>
      <Button
        className={styles.deleteTaskButton}
        type="button"
        color="danger"
        width="full"
        variant="text"
      >
        <span className={styles.trashIcon}>
          <Icon name="trash" />
        </span>
        Delete Task
      </Button>
      <ButtonAsLink width="full" href={`/task/edit/${id}`}>
        Edit Task
      </ButtonAsLink>
    </article>
  );
}
