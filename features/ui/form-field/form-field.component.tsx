import { joinClassNames } from "@/utils";
import FormFieldLabel from "./form-field-label.component";
import styles from "./form-field.module.css";
import PasswordFormField from "./password-form-field.component";

export type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function FormField({ className, ...props }: FormFieldProps) {
  return (
    <input className={joinClassNames(styles.formField, className)} {...props} />
  );
}

FormField.Label = FormFieldLabel;
FormField.Password = PasswordFormField;
