import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import Task from "@/features/tasks/components/task/task.component";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default function TaskPage({
  params: { id },
}: {
  params: { id: string };
}) {
  if (isNaN(Number(id))) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <PageWithNavbar>
        <div className={styles.wrapper}>
          <Task id={Number(id)} />
        </div>
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
