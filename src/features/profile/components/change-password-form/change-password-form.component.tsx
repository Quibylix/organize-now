"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import PasswordInput from "@/features/ui/components/input/password-input.component";
import styles from "./change-password-form.module.css";
import { useChangePasswordForm } from "./hooks/use-change-password-form.hook";

export type ChangePasswordFormProps = {
  dictionary: {
    submitButton: string;
    currentPasswordLabel: string;
    currentPasswordPlaceholder: string;
    newPasswordLabel: string;
    newPasswordPlaceholder: string;
    loading: string;
  };
};

export default function ChangePasswordForm({
  dictionary,
}: ChangePasswordFormProps) {
  const {
    currentPassword,
    newPassword,
    currentPasswordError,
    newPasswordError,
    submitError,
    isLoading,
    changeHandler,
    blurHandler,
    submitHandler,
  } = useChangePasswordForm();

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {submitError && <Alert message={submitError} />}
      <PasswordInput
        label={dictionary.currentPasswordLabel}
        placeholder={dictionary.currentPasswordPlaceholder}
        value={currentPassword}
        onChange={changeHandler("currentPassword")}
        onBlur={blurHandler("currentPassword")}
        error={currentPasswordError}
      />
      <PasswordInput
        label={dictionary.newPasswordLabel}
        placeholder={dictionary.newPasswordPlaceholder}
        value={newPassword}
        onChange={changeHandler("newPassword")}
        onBlur={blurHandler("newPassword")}
        error={newPasswordError}
      />
      <Button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? dictionary.loading : dictionary.submitButton}
      </Button>
    </form>
  );
}
