import { PageWithNavbar } from "@/features/layout";
import { Tasks } from "@/features/tasks";

export default function Home() {
  return (
    <PageWithNavbar>
      <Tasks />
    </PageWithNavbar>
  );
}
