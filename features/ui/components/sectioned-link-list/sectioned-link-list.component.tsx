import Link from "next/link";
import type { IconProps } from "../icon/icon.component";
import Icon from "../icon/icon.component";
import styles from "./sectioned-link-list.module.css";

export type SectionedLinkListProps = {
  sections: readonly {
    title: string;
    links: readonly {
      href: string;
      title: string;
      icon: IconProps["name"];
      blank?: boolean;
    }[];
  }[];
};

export default function SectionedLinkList({
  sections,
}: SectionedLinkListProps) {
  return (
    <div>
      {sections.map(section => (
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
    </div>
  );
}
