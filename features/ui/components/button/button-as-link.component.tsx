import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import Link from "next/link";
import styles from "./button.module.css";

export type ButtonAsLinkProps = React.ComponentProps<typeof Link> & {
  width?: "full" | "auto";
};

export default function ButtonAsLink({
  width = "auto",
  className,
  ...props
}: ButtonAsLinkProps) {
  const buttonClassName = joinClassNames(
    styles.button,
    styles.buttonAsLink,
    styles[`buttonWidth__${width}`],
    className,
  );

  return <Link className={buttonClassName} {...props} />;
}
