"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import Icon from "@/features/ui/components/icon/icon.component";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useRef, useState } from "react";
import { deleteTask } from "./actions/delete-task.action";
import styles from "./task.module.css";

export type DeleteTaskButtonProps = {
  dictionary: {
    deleteTask: string;
    deleteTaskTitle: string;
    areYouSure: string;
    taskName: string;
    cancel: string;
    delete: string;
    loading: string;
  };
  taskId: number;
  taskName: string;
};

export default function DeleteTaskButton({
  dictionary,
  taskName,
  taskId,
}: DeleteTaskButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dialog = useRef<HTMLDialogElement>(null);

  const router = useRouter();

  const openModal = () => {
    dialog.current?.showModal();
  };

  const closeModal = () => {
    dialog.current?.close();
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteTask(taskId);
    setIsLoading(false);

    if (!response.success) {
      setError(response.error ?? "Something went wrong");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <>
      <Button
        className={styles.deleteTaskButton}
        type="button"
        color="danger"
        width="full"
        variant="text"
        onClick={openModal}
      >
        <span className={styles.trashIcon}>
          <Icon name="trash" />
        </span>
        {dictionary.deleteTask}
      </Button>
      <dialog ref={dialog} className={styles.modal}>
        <h2 className={styles.modalTitle}>{dictionary.deleteTaskTitle}</h2>
        <hr className={styles.modalDivider} />
        {error && <Alert message={error} />}
        <p className={styles.modalContent}>{dictionary.areYouSure}</p>
        <p className={styles.modalContent}>
          {dictionary.taskName}: {taskName}
        </p>
        <div className={styles.modalButtons}>
          <Button
            type="button"
            color="primary"
            variant="text"
            onClick={closeModal}
          >
            {dictionary.cancel}
          </Button>
          <Button type="button" color="danger" onClick={handleDelete}>
            {isLoading ? dictionary.loading : dictionary.delete}
          </Button>
        </div>
      </dialog>
    </>
  );
}
