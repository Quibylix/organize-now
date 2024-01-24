"use client";

import Alert from "@/features/ui/components/alert/alert.component";
import Button from "@/features/ui/components/button/button.component";
import Input from "@/features/ui/components/input/input.component";
import PasswordInput from "@/features/ui/components/input/password-input.component";
import useRegisterForm from "./hooks/use-register-form.hook";
import styles from "./register-form.module.css";

type RegisterFormProps = {
  dictionary: {
    formTitle: string;
    usernamePlaceholder: string;
    usernameLabel: string;
    passwordPlaceholder: string;
    passwordLabel: string;
    confirmPasswordPlaceholder: string;
    confirmPasswordLabel: string;
    submitButton: string;
    loading: string;
  };
};

export default function RegisterForm({ dictionary }: RegisterFormProps) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    submitError,
    isLoading,
  } = useRegisterForm();

  const { username, password, confirmPassword } = values;
  const {
    username: usernameError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = errors;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={dictionary.formTitle}
      className={styles.registerForm}
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
      <PasswordInput
        name="confirmPassword"
        value={confirmPassword}
        onChange={handleChange("confirmPassword")}
        onBlur={handleBlur("confirmPassword")}
        placeholder={dictionary.confirmPasswordPlaceholder}
        label={dictionary.confirmPasswordLabel}
        error={confirmPasswordError}
      />
      <Button
        className={styles.submitButton}
        type="submit"
        width="full"
        disabled={isLoading}
      >
        {isLoading ? dictionary.loading : dictionary.submitButton}
      </Button>
    </form>
  );
}
