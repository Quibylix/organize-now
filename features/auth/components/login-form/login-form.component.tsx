"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import Input from "@/features/ui/components/input/input.component";
import PasswordInput from "@/features/ui/components/input/password-input.component";
import { useLoginForm } from "./hooks/use-login-form.hook";
import styles from "./login-form.module.css";

type LoginFormProps = {
  dictionary: {
    formTitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitButton: string;
    loading: string;
  };
};

export default function LoginForm({ dictionary }: LoginFormProps) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitError,
    isLoading,
  } = useLoginForm();

  const { username, password } = values;
  const { username: usernameError, password: passwordError } = errors;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={dictionary.formTitle}
      className={styles.loginForm}
    >
      {submitError && <Alert message={submitError} />}
      <Input
        name="username"
        value={username}
        onChange={handleChange("username")}
        onBlur={handleBlur("username")}
        placeholder={dictionary.usernamePlaceholder}
        type="text"
        label={dictionary.usernameLabel}
        error={usernameError}
      />
      <PasswordInput
        name="password"
        value={password}
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        placeholder={dictionary.passwordPlaceholder}
        label={dictionary.passwordLabel}
        error={passwordError}
      />
      <Button
        type="submit"
        className={styles.submitButton}
        width="full"
        disabled={isLoading}
      >
        {isLoading ? dictionary.loading : dictionary.submitButton}
      </Button>
    </form>
  );
}
