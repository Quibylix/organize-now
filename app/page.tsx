import { PageWithNavbar } from "@/features/layout/components";
import { Tasks } from "@/features/tasks";

export default function Home() {
  return (
    <PageWithNavbar>
      <Tasks />
    </PageWithNavbar>
  );
}
