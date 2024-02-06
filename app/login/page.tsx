import LoginForm from "@/features/auth/components/login-form/login-form.component";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const dictionary = await getTranslation();

  return {
    title: dictionary.login.title,
    description: dictionary.login.description,
  };
};

export default async function LoginPage() {
  const dictionary = await getTranslation();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{dictionary.login.heading}</h1>
      <LoginForm dictionary={dictionary.login.form} />
      <p className={styles.or}>
        <span className={styles.orText}>{dictionary.login.or}</span>
      </p>
      <section>
        <p className={styles.register}>
          {dictionary.login.dontHaveAccount}{" "}
          <Link className={styles.registerLink} href="/register">
            {dictionary.login.register}
          </Link>
        </p>
      </section>
    </main>
  );
}
