import Icon from "../icon/icon.component";
import styles from "./alert.module.css";

export type AlertProps = {
  message: string;
};

export default function Alert({ message }: AlertProps) {
  return (
    <div className={styles.alert}>
      <Icon name="info" className={styles.icon} />
      <span>{message}</span>
    </div>
  );
}
