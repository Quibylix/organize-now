import PageWithNavbar from "@/features/layout/components/page-with-navbar/page-with-navbar.component";
import Tasks from "@/features/tasks/components/tasks/tasks.component";

export default function Home() {
  return (
    <PageWithNavbar>
      <Tasks />
    </PageWithNavbar>
  );
}
