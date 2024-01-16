import Link from "next/link";
import Icon from "../icon/icon.component";
import { LINKS } from "./constants/links.constant";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        {LINKS.map(({ label, path, icon }) => (
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
