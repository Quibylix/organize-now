"use client";

import { joinClassNames } from "@/utils";
import { useState } from "react";
import FormField, { FormFieldProps } from ".";
import styles from "./form-field.module.css";

export type PasswordFormFieldProps = Omit<FormFieldProps, "type">;

export default function PasswordFormField({
  className,
  ...props
}: PasswordFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <span className={styles.passwordFormFieldContainer}>
      <FormField
        type={showPassword ? "text" : "password"}
        className={joinClassNames(styles.passwordFormField, className)}
        {...props}
      />
      <button
        className={styles.showPasswordButton}
        onClick={toggleShowPassword}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </span>
  );
}
