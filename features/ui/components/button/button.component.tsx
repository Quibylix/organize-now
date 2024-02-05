import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import ButtonAsLink from "./button-as-link.component";
import styles from "./button.module.css";
import { AdditionalButtonProps } from "./types/additional-button-props.type";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AdditionalButtonProps;

export default function Button({
  width = "auto",
  disabled,
  variant = "solid",
  size = "md",
  color = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = joinClassNames(
    styles.button,
    styles[`buttonWidth__${width}`],
    styles[`buttonVariant__${variant}`],
    styles[`buttonSize__${size}`],
    styles[`buttonColor__${color}`],
    className,
  );

  return (
    <button className={buttonClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

Button.AsLink = ButtonAsLink;
