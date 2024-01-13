"use client";

import { joinClassNames } from "@/utils";
import { useState } from "react";
import FormField, { FormFieldProps } from ".";
import Icon from "../icon";
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
