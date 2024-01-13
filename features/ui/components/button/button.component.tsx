import { joinClassNames } from "@/utils";
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
    {
      [styles.buttonDisabled]: disabled,
    },
    className,
  );

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
