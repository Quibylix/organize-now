import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Icon from "@/features/ui/components/icon/icon.component";
import styles from "./page.module.css";

export async function generateMetadata() {
  const dictionary = await getTranslation();

  return {
    title: dictionary.faq.title,
    description: dictionary.faq.description,
  };
}

export default async function FAQPage() {
  const dictionary = await getTranslation();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{dictionary.faq.heading}</h1>
      <p className={styles.lead}>{dictionary.faq.lead}</p>
      <ul className={styles.questions}>
        {dictionary.faq.questions.map((question, index) => (
          <li key={index}>
            <details className={styles.details}>
              <summary className={styles.summary}>
                {question.question}
                <span className={styles.icon}>
                  <Icon name="arrow-up" />
                </span>
              </summary>
              <p className={styles.answer}>{question.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
