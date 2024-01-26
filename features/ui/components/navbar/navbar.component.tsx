import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Link from "next/link";
import Icon from "../icon/icon.component";
import styles from "./navbar.module.css";
import { getNavbarLinks } from "./utils/get-navbar-links";

export default async function Navbar() {
  const dictionary = await getTranslation();

  const links = getNavbarLinks(dictionary.navbar);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        {links.map(({ label, path, icon }) => (
          <li key={label}>
            <Link className={styles.navbarLink} href={path}>
              <i>
                <Icon name={icon} className={styles.icon} />
              </i>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
