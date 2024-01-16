import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import FormFieldLabel from "./form-field-label.component";
import FormFieldWithError from "./form-field-with-error.component";
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
FormField.WithError = FormFieldWithError;
