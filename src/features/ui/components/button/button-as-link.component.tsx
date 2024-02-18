import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import Link from "next/link";
import styles from "./button.module.css";
import { AdditionalButtonProps } from "./types/additional-button-props.type";

export type ButtonAsLinkProps = React.ComponentProps<typeof Link> &
  AdditionalButtonProps;

export default function ButtonAsLink({
  width = "auto",
  variant = "solid",
  size = "md",
  color = "primary",
  className,
  ...props
}: ButtonAsLinkProps) {
  const buttonClassName = joinClassNames(
    styles.button,
    styles.buttonAsLink,
    styles[`buttonWidth__${width}`],
    styles[`buttonVariant__${variant}`],
    styles[`buttonSize__${size}`],
    styles[`buttonColor__${color}`],
    className,
  );

  return <Link className={buttonClassName} {...props} />;
}
