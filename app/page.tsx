import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import TaskSearchBar from "@/features/tasks/components/tasks-search-bar/tasks-search-bar.component";
import Tasks from "@/features/tasks/components/tasks/tasks.component";
import { searchParamsToTasksFilters } from "@/features/tasks/components/tasks/utils/search-params-to-tasks-filters/search-params-to-tasks-filters.util";
import styles from "./page.module.css";

export type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: HomeProps) {
  return (
    <ProtectedRoute>
      <PageWithNavbar>
        <div className={styles.wrapper}>
          <TaskSearchBar />
          <Tasks filters={searchParamsToTasksFilters(searchParams)} />
        </div>
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
