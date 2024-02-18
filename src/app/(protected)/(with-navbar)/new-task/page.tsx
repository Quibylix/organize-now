import { getTranslation } from "@/features/i18n/services/get-translation.service";
import AddTaskForm from "@/features/tasks/components/add-task-form/add-task-form.component";
import GoBackButton from "@/features/ui/components/go-back-button/go-back-button.component";
import { Metadata } from "next";
import styles from "./page.module.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const dictionary = await getTranslation();

  return {
    title: dictionary.addTask.title,
    description: dictionary.addTask.description,
  };
};

export default async function NewTaskPage() {
  const dictionary = await getTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.goBackButton}>
        <GoBackButton href="/" />
      </div>
      <h1 className={styles.title}>{dictionary.addTask.heading}</h1>
      <AddTaskForm dictionary={dictionary.addTask.form} />
    </div>
  );
}
