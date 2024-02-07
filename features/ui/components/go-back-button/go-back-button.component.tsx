import Link from "next/link";
import Icon from "../icon/icon.component";
import styles from "./go-back-button.module.css";

export type GoBackButtonProps = {
  href: string;
};

export default function GoBackButton({ href }: GoBackButtonProps) {
  return (
    <Link className={styles.goBackButton} href={href}>
      <Icon name="go-back" />
    </Link>
  );
}
