import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Image from "next/image";
import styles from "./page.module.css";

export default async function AboutPage() {
  const dictionary = await getTranslation();

  return (
    <div className={styles.wrapper}>
      <h1>{dictionary.about.heading}</h1>
      <p>{dictionary.about.lead}</p>
      <h2>{dictionary.about.meetDeveloper}</h2>
      <section className={styles.bio}>
        <h3>{dictionary.about.developer}</h3>
        <Image
          src="/images/fredi-barraza.jpeg"
          alt="Fredi Barraza"
          width={130}
          height={130}
        />
        <div>
          {dictionary.about.developerDescription.map((description, index) => (
            <p key={index}>{description}</p>
          ))}
        </div>
      </section>
      <section>
        <h2>{dictionary.about.mission}</h2>
        {dictionary.about.missionDescription.map((description, index) => (
          <p key={index}>{description}</p>
        ))}
      </section>
      <section>
        <h2>{dictionary.about.vision}</h2>
        {dictionary.about.visionDescription.map((description, index) => (
          <p key={index}>{description}</p>
        ))}
      </section>
      <footer>
        <p>{dictionary.about.end}</p>
      </footer>
    </div>
  );
}
