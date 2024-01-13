import styles from "./form-field.module.css";

type FormFieldWithErrorProps = {
  error?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FormFieldWithError({
  children,
  error,
  ...props
}: FormFieldWithErrorProps) {
  return (
    <div {...props}>
      {children}
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
