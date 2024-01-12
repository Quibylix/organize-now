import { LoginForm } from "@/features/auth";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "To-do App | Login",
};

export default function Login() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Login</h1>
      <LoginForm />
      <p className={styles.or}>
        <span className={styles.orText}>or</span>
      </p>
      <section>
        <p className={styles.register}>
          Don&apos;t have an account?{" "}
          <Link className={styles.registerLink} href="/register">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
