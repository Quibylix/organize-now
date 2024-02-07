import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import Task from "@/features/tasks/components/task/task.component";
import GoBackButton from "@/features/ui/components/go-back-button/go-back-button.component";
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
          <div className={styles.goBackButton}>
            <GoBackButton href="/" />
          </div>
          <Task id={Number(id)} />
        </div>
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
