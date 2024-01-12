import { RegisterForm } from "@/features/auth";
import Link from "next/link";
import styles from "./page.module.css";

export default function Login() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Register</h1>
      <RegisterForm />
      <p className={styles.or}>
        <span className={styles.orText}>or</span>
      </p>
      <section>
        <p className={styles.login}>
          Already have an account?{" "}
          <Link className={styles.loginLink} href="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}
