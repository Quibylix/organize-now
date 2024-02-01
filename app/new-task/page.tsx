import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import AddTaskForm from "@/features/tasks/components/add-task-form/add-task-form.component";
import { Metadata } from "next";
import styles from "./page.module.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const dictionary = await getTranslation();

  return {
    title: dictionary.addTask.title,
    description: dictionary.addTask.description,
  };
};

export default async function NewTask() {
  const dictionary = await getTranslation();

  return (
    <ProtectedRoute>
      <PageWithNavbar>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{dictionary.addTask.heading}</h1>
          <AddTaskForm dictionary={dictionary.addTask.form} />
        </div>
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
