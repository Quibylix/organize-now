import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Icon from "@/features/ui/components/icon/icon.component";
import Link from "next/link";
import styles from "./profile-links.module.css";
import { getProfileLinks } from "./utils/get-profile-links.util";

export default async function ProfileLinks() {
  const dictionary = await getTranslation();

  const profileLinks = getProfileLinks(dictionary.profile.links);

  return (
    <div>
      {profileLinks.map(section => (
        <section key={section.title}>
          <h2 className={styles.title}>{section.title}</h2>
          <ul className={styles.list}>
            {section.links.map(link => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  target={link.blank ? "_blank" : undefined}
                  rel={link.blank ? "noopener noreferrer" : undefined}
                  className={styles.link}
                >
                  <span className={styles.icon}>
                    <Icon name={link.icon} />
                  </span>
                  <span className={styles.linkLabel}>{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <a href="/logout" className={styles.logout}>
        <span className={styles.icon}>
          <Icon name="logout" />
        </span>
        <span className={styles.linkLabel}>{dictionary.profile.logout}</span>
      </a>
    </div>
  );
}
