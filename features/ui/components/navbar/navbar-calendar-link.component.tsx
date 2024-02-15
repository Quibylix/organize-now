"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "../icon/icon.component";
import styles from "./navbar.module.css";

type NavbarCalendarLinkProps = {
  label: string;
};

export default function NavbarCalendarLink({ label }: NavbarCalendarLinkProps) {
  const [date, setDate] = useState<null | Date>(null);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const path = date
    ? `/calendar?min_ts=${new Date(date).setHours(
        0,
        0,
        0,
        0,
      )}&max_ts=${new Date(date).setHours(23, 59, 59, 999)}`
    : "/calendar";

  return (
    <Link className={styles.navbarLink} href={path}>
      <i>
        <Icon name="calendar" className={styles.icon} />
      </i>
      <span className={styles.linkLabel}>{label}</span>
    </Link>
  );
}
