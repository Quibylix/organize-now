import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Icon from "@/features/ui/components/icon/icon.component";
import SectionedLinkList from "@/features/ui/components/sectioned-link-list/sectioned-link-list.component";
import styles from "./profile-links.module.css";
import { getProfileLinks } from "./utils/get-profile-links.util";

export default async function ProfileLinks() {
  const dictionary = await getTranslation();

  const profileLinks = getProfileLinks(dictionary.profile.links);

  return (
    <div>
      <SectionedLinkList sections={profileLinks} />
      <a href="/logout" className={styles.logout}>
        <span className={styles.icon}>
          <Icon name="logout" />
        </span>
        <span className={styles.linkLabel}>{dictionary.profile.logout}</span>
      </a>
    </div>
  );
}
