import RegisterForm from "@/features/auth/components/register-form/register-form.component";
import { getTranslation } from "@/features/i18n/services/get-translation.service";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const dictionary = await getTranslation();

  return {
    title: dictionary.register.title,
    description: dictionary.register.description,
  };
};

export default async function RegisterPage() {
  const dictionary = await getTranslation();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{dictionary.register.heading}</h1>
      <RegisterForm dictionary={dictionary.register.form} />
      <p className={styles.or}>
        <span className={styles.orText}>{dictionary.register.or}</span>
      </p>
      <section>
        <p className={styles.login}>
          {dictionary.register.alreadyHaveAccount}{" "}
          <Link className={styles.loginLink} href="/login">
            {dictionary.register.login}
          </Link>
        </p>
      </section>
    </main>
  );
}
