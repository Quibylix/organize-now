import Icon from "@/features/ui/components/icon/icon.component";
import { useRef } from "react";
import styles from "./add-task-form.module.css";

export type PriorityInputButtonProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

export default function PriorityInputButton({
  value,
  ...props
}: PriorityInputButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        className={styles.priorityInput}
        ref={inputRef}
        value={value}
        type="radio"
        {...props}
      />
      <button
        className={styles.priorityButton}
        type="button"
        onClick={handleClick}
      >
        <span className={styles.priorityIcon}>
          <Icon name="flag" />
        </span>
        {value}
      </button>
    </div>
  );
}
