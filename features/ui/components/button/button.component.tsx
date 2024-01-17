import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import ButtonAsLink from "./button-as-link.component";
import styles from "./button.module.css";
import { AdditionalButtonProps } from "./types/additional-button-props.type";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AdditionalButtonProps;

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

Button.AsLink = ButtonAsLink;
