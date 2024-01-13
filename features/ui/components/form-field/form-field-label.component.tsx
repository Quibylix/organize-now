import { joinClassNames } from "@/utils";
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
