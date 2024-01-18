import ProtectedRoute from "@/features/auth/components/protected-route/protected-route";
import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import Tasks from "@/features/tasks/components/tasks/tasks.component";

export default function Home() {
  return (
    <ProtectedRoute>
      <PageWithNavbar>
        <Tasks />
      </PageWithNavbar>
    </ProtectedRoute>
  );
}
