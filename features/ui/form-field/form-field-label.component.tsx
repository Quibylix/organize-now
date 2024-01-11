import styles from "./form-field.module.css";

export type FormFieldLabelProps = {
  label: string;
  children: React.ReactElement;
};

export default function FormFieldLabel({
  label,
  children,
}: FormFieldLabelProps) {
  return (
    <label className={styles.formFieldLabel}>
      <span>{label}</span>
      {children}
    </label>
  );
}
