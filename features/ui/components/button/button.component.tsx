import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: "full" | "auto";
};

export default function Button({
  width = "auto",
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = joinClassNames(
    styles.button,
    styles[`buttonWidth__${width}`],
    className,
  );

  return (
    <button className={buttonClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
