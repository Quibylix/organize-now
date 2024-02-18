import { getTranslation } from "@/features/i18n/services/get-translation.service";
import Link from "next/link";
import Icon from "../icon/icon.component";
import NavbarCalendarLink from "./navbar-calendar-link.component";
import styles from "./navbar.module.css";
import { getNavbarLinks } from "./utils/get-navbar-links";

export default async function Navbar() {
  const dictionary = await getTranslation();

  const links = getNavbarLinks(dictionary.navbar);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        {links.map(({ label, path, icon }) =>
          path === "/calendar" ? (
            <NavbarCalendarLink key={path} label={label} />
          ) : (
            <li className={styles.navbarItem} key={label}>
              <Link className={styles.navbarLink} href={path}>
                <i>
                  <Icon name={icon} className={styles.icon} />
                </i>
                <span className={styles.linkLabel}>{label}</span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
