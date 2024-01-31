import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import AddTaskForm from "@/features/tasks/components/add-task-form/add-task-form.component";
import { Metadata } from "next";
import styles from "./page.module.css";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Hi",
    description: "Bye",
  };
};

export default function NewTask() {
  return (
    <ProtectedRoute>
      <PageWithNavbar>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Add Task</h1>
          <AddTaskForm />
        </div>
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
