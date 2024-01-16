import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import styles from "./form-field.module.css";

export type FormFieldLabelProps =
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    label: string;
  };

export default function FormFieldLabel({
  label,
  children,
  className,
  ...props
}: FormFieldLabelProps) {
  return (
    <label
      className={joinClassNames(styles.formFieldLabel, className)}
      {...props}
    >
      <span>{label}</span>
      {children}
    </label>
  );
}
