import Navbar from "@/features/ui/components/navbar/navbar.component";
import styles from "./page-with-navbar.module.css";

export type PageWithNavbarProps = {
  children: React.ReactNode;
};

export default function PageWithNavbar({ children }: PageWithNavbarProps) {
  return (
    <div className={styles.pageWithNavbar}>
      <main className={styles.main}>{children}</main>
      <Navbar />
    </div>
  );
}
