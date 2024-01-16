"use client";

import { joinClassNames } from "@/utils/join-class-names/join-class-names.util";
import { useState } from "react";
import Icon from "../icon/icon.component";
import FormField, { FormFieldProps } from "./form-field.component";
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
        aria-label="Toggle password visibility"
        type="button"
      >
        <Icon
          className={styles.showPasswordIcon}
          name={showPassword ? "eye-off" : "eye"}
        />
      </button>
    </span>
  );
}
